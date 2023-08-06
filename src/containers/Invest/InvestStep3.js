import React, {useEffect, useRef, useState} from "react";
import {Button, Spin} from "antd";
import SignatureCanvas from "react-signature-canvas";
import {toast} from "react-toastify";
import axios from "axios";


import InvestWrapper from "./InvestWrapper";
import "./InvestStep3.scss";
import {useDispatch, useTrackedState, useWallet} from "../../contexts/store";
import {ERROR_OPTION, PHASEABLE_SALE_CONTRACT_ADDRESS, SUCCESS_OPTION} from "../../config/constants";
import {LookForTokenInfo} from "../../config/utilitiy";
import {useTranslation} from "react-i18next";
import {userService} from "../../service/user.service";
import MyDocument from "./PDFViewer";
import {useHistory} from "react-router-dom";
import {Contract, ethers} from "ethers";
import saleAbi from "../../config/PhaseableSaleABI.json";
import erc20Abi from "../../config/erc20.json";
import {baseUrl} from "../../service/axios.service";
import KYCStep from "./KYCStep/KYCStep";

const InvestStep3 = ({onNext, onPrev, user, setFileUrl, paymentOption}) => {
    const {t} = useTranslation();
    const state = useTrackedState();
    const dispatch = useDispatch();
    const history = useHistory();

    const wallet = useWallet();
    const canvasRef = useRef({});

    const [_, setSignature] = useState("");
    const [width, setWidth] = useState(0);
    const [page, setPage] = useState(1);
    const [blob, setBlob] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [popup, setPopup] = useState(null);
    const [tokenJwt, setToken] = useState('');

    useEffect(() => {
        function getSnapshot() {
            setWidth(window.innerWidth > 576 ? 576 : window.innerWidth * 0.7);
        }

        getSnapshot();
        window.addEventListener('resize', getSnapshot);
        return () => window.removeEventListener('resize', getSnapshot);
    }, [])

    function openUpload() {
        if (typeof document !== "undefined") {
            const fileSelector = document.getElementById("fileSelector");
            fileSelector?.click();
        }
    }

    function onChangeSignature(e) {
        if (typeof document !== "undefined") {
            const fileName = e.target.value;
            setSignature(
                fileName.substr(fileName.lastIndexOf("\\") + 1, fileName.length - 1)
            );

            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function () {
                canvasRef.current.fromDataURL(reader.result);
            };
        }
    }

    const handleClear = () => {
        if (canvasRef.current) canvasRef.current.clear();
    }

    function checkValication() {
        const investChain = state.investChain;
        const investAmount = state.investAmount;

        if (state.walletType === undefined || wallet == null) {
            toast("Please connect to wallet", SUCCESS_OPTION);
            return false;
        }

        let proper = false;
        if (investChain.toLowerCase() === "juno" && state.walletType == "keplr") {
            proper = true;
        }

        if (
            (investChain.toLowerCase() === "bsc" ||
                investChain.toLowerCase() === "polygon" ||
                investChain.toLowerCase() === "oneledger" ||
                investChain.toLowerCase() === "fantom" ||
                investChain.toLowerCase() === "avalanche") &&
            (state.walletType === "metamask" || state.walletType === "trust")
        ) {
            proper = true;
        }
        if (investChain.toLowerCase() === "tron" && state.walletType === "tron") {
            proper = true;
        }

        if (!proper) {
            toast("Please use the proper wallet", ERROR_OPTION);
            return false;
        }

        if (parseFloat(investAmount) <= 0) {
            toast("Please input amount", ERROR_OPTION);
            return false;
        }

        return true;
    }

    async function createSAFTPdf() {
        setDisabled(true);
        const formData = new FormData();
        formData.append("firstName", user.firstName);
        formData.append("surName", user.surName);
        formData.append("address", user.address);
        formData.append("city", user.city);
        formData.append("zipcode", user.zipcode);
        formData.append("numberOfShares", state.investAmount);
        formData.append("totalAmount", state.investTrcyAmount);

        const canvasDataURL = canvasRef.current.toDataURL(); // Convert canvas to data URL
        localStorage.setItem('canvasDataURL', canvasDataURL)
        const fileBlob = await fetch(canvasDataURL).then((res) => res.blob()); // Convert data URL to Blob

        formData.append("file", fileBlob, "signature.png"); // Append the file Blob to the form data

        try {
            const response = await axios.post(`${baseUrl}documents/${user.id}`,
                formData
                , {
                    responseType: 'blob', // Specify the response type as 'blob' to receive a Blob object
                });

            if (response.status === 201) {
                const blob = new Blob([response.data], {
                    type: "application/octet-stream",
                });
                const formDataAgreement = new FormData();
                const newFile = new File([blob], "agreement.pdf");
                formDataAgreement.append('file', newFile);
                try {
                    // await userService.createAgreement(user.id, formDataAgreement); // Pass the file data object to the saveAgreement method
                    const {data} = await userService.saveAgreement(user.id, formDataAgreement); // Pass the file data object to the saveAgreement method
                    localStorage.setItem('fileUrl', data?.file)
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
                setFileUrl(fileUrl);
                setBlob(response.data);
                setDisabled(false)
            } else {
                throw new Error('Error downloading PDF file');
            }
        } catch (error) {
            setDisabled(false)
            console.error('Error downloading PDF => ', error);
            toast('Error downloading PDF => ', error)
        }
    }


    const handleNext = async () => {

        try {
            if (checkValication() === false)
                return;
            toast("Please wait, generating document", {...SUCCESS_OPTION, autoClose: false});
            const tokenInfo = LookForTokenInfo(state.investChain, state.investToken);

            // await wallet.buyTokens(
            //     state.investAmount,
            //     tokenInfo
            // );

            await createSAFTPdf();

            toast.dismiss();
            toast("Success", SUCCESS_OPTION);
            setPage(3);
        } catch (e) {
            toast.dismiss();
            console.log(e)
            toast(e.message ?? "Error", ERROR_OPTION);
        }
    }

    const BuyToken = async () => {
        try {
            if (wallet && wallet.initialized && paymentOption.paymentOption != null) {
                const saleContract = new Contract(PHASEABLE_SALE_CONTRACT_ADDRESS, saleAbi.abi, wallet.signer.provider);
                const paymentContract = new Contract(paymentOption.paymentOption.address, erc20Abi.abi, wallet.signer.provider);

                // step 1 - allowance
                const txAllowance = await paymentContract.connect(wallet.signer).approve(saleContract.address, ethers.utils.parseUnits(paymentOption.investAmount.toString(), paymentOption.decimals));
                toast("Once the approval transaction has been performed, you will be asked to confirm the purchase in an additional transaction.");
                await txAllowance.wait();

                // step 2 - actual purchase
                let txPurchase;
                if (paymentOption.paymentOption.name === "USDC") {
                    txPurchase = await saleContract.connect(wallet.signer).purchaseUsdc(ethers.utils.parseUnits(paymentOption.investAmount.toString(), paymentOption.paymentOption.decimals));
                }
                if (paymentOption.paymentOption.name === "USDT") {
                    txPurchase = await saleContract.connect(wallet.signer).purchaseUsdt(ethers.utils.parseUnits(paymentOption.investAmount.toString(), paymentOption.paymentOption.decimals));
                }
                toast("Thank you for your purchase, you will be notified once your tokens are available in your wallet.");
                await txPurchase.wait();
                onNext()
                toast("Your new tokens are now available in your wallet.");
            }
        } catch (e) {
            console.log(e);
        }

    }

    const handleDecline = () => {
        history.push("/");
    };

    const openPopup = () => {
        const popupWindow = window.open("https://in.sumsub.com/idensic/l/#/uni_QUqyWtzT5Evcg0eC", "popupWindow", "width=500,height=600");
        setPopup(popupWindow);

        // Listen for changes in the URL of the popup window
        const checkPopupUrl = setInterval(() => {
            try {
                if (popupWindow.location.href.includes("jwt")) {
                    console.log(popupWindow.location.href);
                    // Extract the token from the URL
                    const url = new URL(popupWindow.location.href);
                    const token = url.searchParams.get("jwt");

                    // Close the popup window
                    localStorage.setItem('jwt', token)
                    setToken(token)
                    popupWindow.close();
                    clearInterval(checkPopupUrl);
                }
            } catch (error) {
                console.error(error);
            }
        }, 1000); // Adjust the interval as needed
    };

    useEffect(() => {
        if (tokenJwt) {
            setPage(2);
        }
    }, [tokenJwt])

    return (
        <>
            {!blob && page === 1 && <InvestWrapper>
                <div className="invest-step1-body0">
                    <span style={{fontSize: '25px'}}>Why You Need to Perform KYC ( Know Your Customer ) Before Making a Purchase</span>
                    <KYCStep/>
                    <div className="steps-action">
                        <Button style={{margin: 0}} type='primary' onClick={onPrev}
                                className={'button_accept_decline'}>
                            Back
                        </Button>
                        <Button style={{margin: 0}} type='primary' onClick={openPopup}
                                className={'button_accept_decline'}>
                            Continue with KYC
                        </Button>
                    </div>
                </div>
            </InvestWrapper>
            }

            {!blob && page === 2 && <InvestWrapper>
                <div className="invest-step3-body0">
                    <div className="input-parts">
                        <div className="input-contents" style={{display: 'flex', columnGap: '5%'}}>
                            <div>
                                <div className="input-name">
                                    <span>{t("buy:title")} </span>
                                    <input disabled={true} placeholder={user.title}/>
                                </div>
                                <div className="input-name">
                                    <span>First name</span>
                                    <input disabled={true} placeholder={user.firstName}/>
                                </div>
                                <div className="input-name">
                                    <span>Surname</span>
                                    <input disabled={true} placeholder={user.surName}/>
                                </div>
                                <div className="input-name">
                                    <span>Email</span>
                                    <input disabled={true} placeholder={user.email}/>
                                </div>
                            </div>
                            <div>
                                <div className="input-name">
                                    <span>Address</span>
                                    <input disabled={true} placeholder={user.address}/>
                                </div>
                                <div className="input-name">
                                    <span>ZIP-Code</span>
                                    <input disabled={true} placeholder={user.zipcode}/>
                                </div>
                                <div className="input-name">
                                    <span>City</span>
                                    <input disabled={true} placeholder={user.city}/>
                                </div>
                            </div>

                        </div>
                        <div className="splitter"/>
                        <div className="input-signature">
                            <span>{t("buy:signature")}
                                <div className="signature">*</div></span>
                            <div className="signature-wrapper">
                                <SignatureCanvas
                                    ref={canvasRef}
                                    penColor="black"
                                    canvasProps={{width: width, height: 150}}
                                />
                            </div>
                            <input
                                type="file"
                                id="fileSelector"
                                name="userFile"
                                style={{display: "none"}}
                                onChange={(e) => onChangeSignature(e)}
                            />
                            <div className="button-wrapper">
                                <Button type='primary' disabled={disabled} className={'button'}
                                        onClick={handleClear}><span
                                    className={'button'}>{t("buy:clear")}</span></Button>
                            </div>
                            <div className="button-wrapper submit">
                                <Button type='primary' disabled={disabled} onClick={() => onPrev()}
                                        className={'button'}>
                                    <span className={'button'}>Back</span>
                                </Button>

                                {disabled ?
                                    <Button type='primary' disabled={disabled}>
                                        <Spin size="small" style={spinnerStyle}/>
                                    </Button> :
                                    <Button type='primary' disabled={disabled} className={'button'}
                                            onClick={() => handleNext()}>
                                        <span className={'button'}>Continue</span>
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </InvestWrapper>
            }

            {blob && page === 3 && <InvestWrapper>
                <div className="invest-step1-body0">
                    <span>PARTICIPATION PURCHASE AGREEMENT</span>
                    <span>{t("buy:terms")}</span>
                    <div className="invest-document">
                        <MyDocument blob={blob}/>
                    </div>

                    <div className="steps-action">
                        <Button type='primary' onClick={BuyToken} className={'button_accept_decline'}>
                            Accept & participate
                        </Button>
                        <Button type='primary' onClick={() => handleDecline()} className={'button_accept_decline'}>
                            Decline
                        </Button>
                    </div>
                </div>
            </InvestWrapper>
            }
        </>
    )
}

const spinnerStyle = {
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '25px',
};

export default InvestStep3;
