import React, {useEffect, useState} from "react";
import {useKeplrWallet} from "../../../contexts/keplrWallet";
import {useMetamaskWallet} from "../../../contexts/metamask";
import {useTrustWallet} from "../../../contexts/trustWallet";
import {useTronLink} from "../../../contexts/tronLink";
import {useTrackedState, useDispatch} from "../../../contexts/store";

import {Button, Drawer, Spin} from "antd";
import {WalletOutlined, CheckOutlined} from "@ant-design/icons";
import "./ConnectWallet.scss"
import {WALLET_LIST} from "../../../config/constants";
import {useTranslation} from "react-i18next";
import LoginModal from "../../LoginModal/LoginModal";
import {Modal} from "../../Modal/Modal";
import {authService} from "../../../service/auth.service";
import {useHistory} from "react-router-dom";
import RegistrationModal from "../../RegistrationModal/RegistrationModal";

export default function ConnectWallet() {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const state = useTrackedState();
    const keplr = useKeplrWallet();
    const metamask = useMetamaskWallet();
    const trust = useTrustWallet();
    const tronLink = useTronLink();
    const [openModal, setOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const [token, setToken] = useState(null)
    const history = useHistory();
    const getWallet = (type) => {
        let wallet;
        if (type === "metamask") wallet = metamask;
        else if (type === "keplr") wallet = keplr;
        else if (type === "trust") wallet = trust;
        else if (type === "tron") wallet = tronLink;
        else wallet = metamask;
        return wallet;
    };
    const onConnect = () => {
        setOpen(true)
    }

    const logoutButton = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            await authService.logout(accessToken);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
            history.push('/become-part')
            setToken(null)
        } catch (error) {
            console.error('An error occurred during logout:', error.message);
            // Handle the error or display an error message to the user
        }
    };


    const onClose = () => {
        setOpen(false)
    }

    async function connectTo(to) {
        let wallet = getWallet(to);
        onClose();
        await wallet.connect();
        dispatch({type: "setWalletType", payload: to});
    }

    const wallet = getWallet(state.walletType);

    useEffect(() => {
        let accessToken = localStorage.getItem('accessToken');
        setToken(accessToken)
        if (accessToken || token) {
            setModal(false)
        }
    }, [token, modal])


    useEffect(() => {
        dispatch({type: "setWallet", payload: wallet});
    }, [dispatch, wallet, wallet.initialized]);

    const connected = wallet ? wallet.connected : false;
    const initialized = wallet ? wallet.initialized : false;
    const address = wallet.account ? wallet.account.slice(0, 5) + "..." + wallet.account.slice(-5) : undefined;

    useEffect(() => {
        function handleClick(e) {
            const sidebar = document.getElementById("wallet-sidebar");
            const footer = document.getElementById("footer-wallet");
            if (!sidebar?.contains(e.target) && !footer?.contains(e.target))
                onClose();

        }

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    });

    return (
        <div id="wallet-sidebar">
            <div className="connect-wallet-mobile" onClick={onConnect}>
                <img src="/wallet/wallet.svg" alt="wallet"/>
                <div className="connect-status">
                    {(connected && !initialized) && <Spin spinning={true} color="#be1e73"/>}
                    {(connected && initialized) && <CheckOutlined color="red"/>}
                </div>
            </div>
            {
                token ?
                    <Button type="ghost" className="connect-wallet" onClick={logoutButton}>
                        <span>{t("general:logout")}</span>
                    </Button>
                    :
                    <Button type="ghost" className="connect-wallet" onClick={() => setModal(true)}>
                        <span>{t("general:login")}</span>
                    </Button>
            }

            {modal && <Modal token={token} activeModal={modal} setActive={setModal}> <LoginModal setModal={setModal} /></Modal>}
            <Button type="ghost" className="connect-wallet" onClick={onConnect}>
                {!connected && <span>{t("general:connectwallet")}</span>}
                {(connected && !initialized) && <span>Loading</span>}
                {(connected && initialized) && <><WalletOutlined/><CheckOutlined/><span>{address}</span></>}
            </Button>
            <Drawer
                title={false}
                placement='right'
                width={"100%"}
                onClose={onClose}
                closeIcon={false}
                open={openModal}
                rootClassName='wallet-sidebar'
            >
                <div className="wallet-content">
                    {WALLET_LIST.map((wallet, index, all) => (
                        <React.Fragment key={index}>
                            <div className={`wallet-item`} onClick={() => connectTo(wallet.link)}>
                                <img src={wallet.icon} alt="wallet" className="item-image"/>
                                <img src={wallet.icon_hover} alt="wallet" className="item-image"/>
                                <span className="item-text">
                  {wallet.name}
                </span>
                            </div>
                            {/* {index < all.length - 1 && */}
                            <div className="wallet-item-splitter"/>
                            {/* } */}
                        </React.Fragment>
                    ))}
                </div>
            </Drawer>
        </div>
    );
}
