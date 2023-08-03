import InvestWrapper from "./InvestWrapper";
import "./InvestStep4.scss";
import {useTrackedState} from "../../contexts/store";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";

const InvestStep4 = ({onNext, onPrev, fileUrl}) => {
    const {t} = useTranslation();
    const state = useTrackedState();

    const downloadPdf = () => {
        const url = localStorage.getItem('fileUrl');
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Agreement.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
    }

    useEffect(() => {
        downloadPdf();
    }, [fileUrl]);

    const getCurrentDay = () => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return month + '/' + day;
    }


    return (
        <InvestWrapper>
            <div className="invest-step4-body0">
                <div className="congrat-wrapper">
                    <img src="/invest-form/congrat.png" alt="congrat"/>
                    <span>{t("buy:congrat")}</span>
                    <img src="/invest-form/congrat1.png" alt="congrat"/>
                </div>
                <span>You are now holding TRCYN token</span>
                <div className={'congrat_review'}>
                    <div>
                        To review your tokens in your Metamask wallet, you need to add the TRCYN token manually. Press
                        ,,Import Tokens,, in your wallet and add the token contract address below.
                    </div>
                    <div>Token contract address: <span>0x500d241f16c62Bf84B80E0631Bf38882D2942cFB</span></div>
                </div>
                <span>For more updates, please get in touch with us at info@traccy.ch</span>
                <span>{t("buy:history")}</span>
                <div className="grid-wrapper">
                    <div className="grid-header">{t("buy:date")}</div>
                    <div className="grid-header">{t("buy:youinvest")}</div>
                    <div className="grid-header">{t("buy:get")}</div>
                    <div className="grid-header">{t("buy:saftready")}</div>
                    <div className="grid-data">{getCurrentDay()}</div>
                    <div className="grid-data">{state.investAmount}</div>
                    <div className="grid-data">{state.investTrcyAmount}</div>
                    <div className="grid-data">
                        <span className='button_invest_step4' onClick={() => downloadPdf()}>
                             Download Agreement
                        </span>
                    </div>
                </div>
                <span className="span-auto">{t("buy:yourdownload")}</span>
                <span className="span-download">{t("buy:again")}
                    <span className="download"
                          onClick={() => downloadPdf()}>{t("buy:download")}
                    </span>
                </span>
            </div>
        </InvestWrapper>
    )
}

export default InvestStep4;
