import { Button } from "antd";
import { Link } from "react-router-dom"

import InvestWrapper from "./InvestWrapper";
import "./InvestStep2.scss";
import ChainSelector from "../../components/InvestForm/InvestStep2/ChainSelector"
import AmountInput from "../../components/InvestForm/InvestStep2/AmountInput";
import { useTrackedState } from "../../contexts/store";
import { toast } from "react-toastify";
import { ERROR_OPTION } from "../../config/constants";
import { useState } from "react";
import { useWallet } from "../../contexts/store";
import { Contract, ethers } from "ethers";
import saleAbi from "../../config/PhaseableSaleABI.json";
import erc20Abi from "../../config/erc20.json";
import { PHASEABLE_SALE_CONTRACT_ADDRESS } from "../../config/constants";

const InvestStep2 = ({onPrev, onNext}) => {
  const state = useTrackedState();
  const wallet = useWallet();

  const [investAmount, setInvestAmount] = useState(0);
  const [paymentOption, setPaymentOption] = useState("USDC");

  const handleNext = async () => {
    console.log(`payment option: ${paymentOption}`);
    console.log(`amount: ${investAmount}`);

    if(wallet && wallet.initialized) {
      console.log(wallet)
      const saleContract = new Contract(PHASEABLE_SALE_CONTRACT_ADDRESS, saleAbi.abi, wallet.signer.provider);
      if (paymentOption === "USDC"){
        const usdc = new Contract("0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", erc20Abi.abi, wallet.signer.provider);
        const txAllowance = await usdc.connect(wallet.signer).approve(saleContract.address, ethers.utils.parseUnits(investAmount.toString(), 6));
        toast("Once the approval transaction has been performed, you will be asked to confirm the purchase in an additional transaction.");
        await txAllowance.wait();
        const txPurchase = await saleContract.connect(wallet.signer).purchaseUsdc(ethers.utils.parseUnits(investAmount.toString(), 6));
        toast("Thank you for your purchase, you will be notified once your tokens are available in your wallet.");
        await txPurchase.wait();
        toast("Your new tokens are now available in your wallet.");
      }
      if (paymentOption === "USDT"){
        const usdt = new Contract("0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", erc20Abi.abi, wallet.signer.provider);
        const txAllowance = await usdt.connect(wallet.signer).approve(saleContract.address, ethers.utils.parseUnits(investAmount.toString(), 6));
        toast("Once the approval transaction has been performed, you will be asked to confirm the purchase in an additional transaction.");
        await txAllowance.wait();
        const txPurchase = await saleContract.connect(wallet.signer).purchaseUsdt(ethers.utils.parseUnits(investAmount.toString(), 6));
        toast("Thank you for your purchase, you will be notified once your tokens are available in your wallet.");
        await txPurchase.wait();
        toast("Your new tokens are now available in your wallet.");
      }
    }

    // -- note: this is the old flow with verifcation before the actual purchase, this needs to be readjusted --
    // if (parseFloat(state.investAmount) > parseFloat(state.balance)) {
    //   toast("Insufficient balance", ERROR_OPTION);
    //   return false;
    // }
    // onNext();
  }

  return (
    <InvestWrapper>
      <div className="invest-step2-body0">
        <span>Enter your Investment Amount</span>
        <span>Please select the chain and tokens, enter the amount and we will convert the TRCYN amount for you</span>
        <div className="selector-container">
          <ChainSelector setPaymentOption={(option) => setPaymentOption(option)} />
          <AmountInput setInvestAmount={(amount) => setInvestAmount(amount)} />
        </div>
        <div className="steps-action">
          <div>
            <Button type="primary" onClick={() => handleNext()}>
              Invest
            </Button>
          </div>
        </div>
      </div>
    </InvestWrapper>
  )
}

export default InvestStep2;
