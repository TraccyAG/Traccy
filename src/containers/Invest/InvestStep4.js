import { useEffect } from "react";
import { Button } from "antd";
import { Link, Router, useHistory } from "react-router-dom"

import InvestWrapper from "./InvestWrapper";
import "./InvestStep4.scss";
import {useTrackedState, useWallet} from "../../contexts/store";
import { toast } from "react-toastify";
import {PHASEABLE_SALE_CONTRACT_ADDRESS, REQUEST_ENDPOINT, SUCCESS_OPTION} from "../../config/constants";
import { useTranslation } from "react-i18next";
import {Contract, ethers} from "ethers";
import saleAbi from "../../config/PhaseableSaleABI.json";
import erc20Abi from "../../config/erc20.json";
import {userService} from "../../service/user.service";

const InvestStep4 = ({ onNext, onPrev ,investAmount,paymentOption}) => {
  const {t} = useTranslation();
  const history = useHistory();
  const state = useTrackedState();
  const wallet = useWallet()
  const id = localStorage.getItem('userId')

  const download_pdf = () => {
    toast("Downloading", SUCCESS_OPTION);

    const xhr = new XMLHttpRequest();
    const a = document.createElement("a");

    xhr.open(
        "GET",
        REQUEST_ENDPOINT + "/download_pdf?filename=" + 'New_pdf.pdf',
        true
    );

    xhr.responseType = "blob";
    xhr.onload = async function () {
      const file = new Blob([xhr.response], {
        type: "application/octet-stream",
      });
      const formData = new FormData();

      formData.append('file', file);
      window.URL = window.URL || window.webkitURL;
      a.href = window.URL.createObjectURL(file);
      a.download = "confirm.pdf";
      a.click();
      try {
        await userService.saveAgreement(id, formData); // Pass the file data object to the saveAgreement method
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    xhr.send();
    toast.dismiss();
  };

  useEffect(() => {
    // download_pdf();
  }, []);
  const handleNext = async () => {
    if (wallet && wallet.initialized && props.paymentOption != null) {
      const saleContract = new Contract(PHASEABLE_SALE_CONTRACT_ADDRESS, saleAbi.abi, wallet.signer.provider);
      const paymentContract = new Contract(props.paymentOption.address, erc20Abi.abi, wallet.signer.provider);

      // step 1 - allowance
      const txAllowance = await paymentContract.connect(wallet.signer).approve(saleContract.address, ethers.utils.parseUnits(investAmount.toString(), paymentOption.decimals));
      toast("Once the approval transaction has been performed, you will be asked to confirm the purchase in an additional transaction.");
      await txAllowance.wait();

      // step 2 - actual purchase
      let txPurchase;
      if (paymentOption.name === "USDC") {
        txPurchase = await saleContract.connect(wallet.signer).purchaseUsdc(ethers.utils.parseUnits(investAmount.toString(), paymentOption.decimals));
      }
      if (paymentOption.name === "USDT") {
        txPurchase = await saleContract.connect(wallet.signer).purchaseUsdt(ethers.utils.parseUnits(investAmount.toString(), paymentOption.decimals));
      }
      toast("Thank you for your purchase, you will be notified once your tokens are available in your wallet.");
      await txPurchase.wait();
      toast("Your new tokens are now available in your wallet.");
    }
    history.push("/home");
  }
  return (
    <InvestWrapper>
      <div className="invest-step4-body0">
        <div className="congrat-wrapper">
          <img src="/invest-form/congrat.png" alt="congrat" />
          <span>{t("buy:congrat")}</span>
          <img src="/invest-form/congrat1.png" alt="congrat" />
        </div>
        <span>{t("buy:invested")}</span>
        <span>{t("buy:more")}</span>
        <span>{t("buy:history")}</span>
        <div className="grid-wrapper">
          <div className="grid-header">{t("buy:date")}</div>
          <div className="grid-header">{t("buy:youinvest")}</div>
          <div className="grid-header">{t("buy:get")}</div>
          <div className="grid-header">{t("buy:saftready")}</div>
          <div className="grid-data">{state.investDate}</div>
          <div className="grid-data">{state.investAmount}</div>
          <div className="grid-data">{state.investTrcyAmount}</div>
          <div className="grid-data download" onClick={download_pdf}>Download</div>
        </div>
        <span className="span-auto">{t("buy:yourdownload")}</span>
        <span className="span-download">{t("buy:again")} <span className="download">{t("buy:download")}</span></span>
        <div className="steps-action">
          <div>
            <Button type="primary" onClick={() => handleNext()}>
              Back Home
            </Button>
          </div>
        </div>
      </div>
    </InvestWrapper>
  )
}

export default InvestStep4;
