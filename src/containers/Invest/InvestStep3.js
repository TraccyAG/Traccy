import {useRef, useState, useEffect} from "react";
import {Button} from "antd";
import SignatureCanvas from "react-signature-canvas";
import {toast} from "react-toastify";
import axios from "axios";


import InvestWrapper from "./InvestWrapper";
import "./InvestStep3.scss";
import {useTrackedState, useDispatch, useWallet} from "../../contexts/store";
import {ERROR_OPTION, REQUEST_ENDPOINT, SUCCESS_OPTION} from "../../config/constants";
import {LookForTokenInfo} from "../../config/utilitiy";
import {useTranslation} from "react-i18next";
import {userService} from "../../service/user.service";

const InvestStep3 = ({onNext, onPrev, user}) => {
    const {t} = useTranslation();
    const state = useTrackedState();
    const dispatch = useDispatch();
    const wallet = useWallet();
    const canvasRef = useRef({});
    const [_, setSignature] = useState("");
    const [width, setWidth] = useState(0);

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

        // if (parseFloat(investAmount) <= 0) {
        //   toast("Please input amount", ERROR_OPTION);
        //   return false;
        // }

        return true;
    }

    async function createSAFTPdf() {
        const formData = new FormData();
        formData.append("firstName", user.firstName);
        formData.append("surName", user.surName);
        formData.append("address", user.address);
        formData.append("zipcode", user.zipcode);
        formData.append("numberOfShares", state.investAmount);
        formData.append("totalAmount", state.investTrcyAmount);

        const canvasDataURL = canvasRef.current.toDataURL(); // Convert canvas to data URL
        localStorage.setItem('canvasDataURL', canvasDataURL)
        const fileBlob = await fetch(canvasDataURL).then((res) => res.blob()); // Convert data URL to Blob

        formData.append("file", fileBlob, "signature.png"); // Append the file Blob to the form data

        try {
            const response = await axios.post(`https://octopus-app-z7hd5.ondigitalocean.app/documents/${user.id}`,
                formData
                , {
                    responseType: 'blob', // Specify the response type as 'blob' to receive a Blob object
                });

            if (response.status === 201) {
                const blob = new Blob([response.data], {
                    type: "application/octet-stream",
                });
                console.log(blob);
                const formDataAgreement = new FormData();
                const newFile = new File([blob], "agreement.pdf");
                formDataAgreement.append('file', newFile);
                try {
                    // await userService.createAgreement(user.id, formDataAgreement); // Pass the file data object to the saveAgreement method
                    await userService.saveAgreement(user.id, formDataAgreement); // Pass the file data object to the saveAgreement method
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
                // Create a link element
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = 'Agreement.pdf';
                // Simulate a click on the link to trigger the download
                link.click();
                // Clean up the temporary URL
                window.URL.revokeObjectURL(fileUrl);

            } else {
                throw new Error('Error downloading PDF file');
            }
        } catch (error) {
            console.error('Error downloading PDF:', error);
            // Handle the error, such as displaying an error message to the user
        }
    }


    const handleNext = async () => {

        try {
            if (checkValication() === false)
                return;

            await createSAFTPdf();
            toast("Please wait", {...SUCCESS_OPTION, autoClose: false});

            const tokenInfo = LookForTokenInfo(state.investChain, state.investToken);
            await wallet.buyTokens(
                state.investAmount,
                tokenInfo
            );

            toast.dismiss();
            toast("Success", SUCCESS_OPTION);

            onNext();
        } catch (e) {
            toast.dismiss();
            console.log(e)
            toast(e.message ?? "Error", ERROR_OPTION);
        }
    }

    return (
        <InvestWrapper>
            <div className="invest-step3-body0">
                <div className="input-parts">
                    <div className="input-contents" style={{display:'flex',columnGap:'5%'}}>
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
                        <span>{t("buy:signature")}</span>
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
                            <Button type="primary" onClick={handleClear}>{t("buy:clear")}</Button>
                            <Button type="primary" onClick={openUpload}>{t("buy:open")}</Button>
                        </div>
                    </div>
                </div>
                <div className="steps-action">
                    <div>
                        <Button type="primary" onClick={() => handleNext()}>
                            {t("buy:invest")}
                        </Button>
                    </div>
                </div>
            </div>
        </InvestWrapper>
    )
}

export default InvestStep3;
