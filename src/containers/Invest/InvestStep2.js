import {Button} from "antd";
import {useHistory} from "react-router-dom"

import InvestWrapper from "./InvestWrapper";
import "./InvestStep2.scss";
import ChainSelector from "../../components/InvestForm/InvestStep2/ChainSelector"
import AmountInput from "../../components/InvestForm/InvestStep2/AmountInput";
import {useTrackedState, useWallet} from "../../contexts/store";
import {toast} from "react-toastify";
import {ERROR_OPTION} from "../../config/constants";
import {useState} from "react";

const InvestStep2 = ({onPrev, onNext,setPayments }) => {
    const state = useTrackedState();
    const [investAmount, setInvestAmount] = useState(0);
    const [paymentOption, setPaymentOption] = useState(null); // set by chainSelector, object schema is {name, decimals, address}


    const history = useHistory();
    const handleNext = async () => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            toast("You must be registered to proceed with the investment.", ERROR_OPTION);
            history.push('/become-part')
            // return;
        }
        setPayments({
            investAmount,
            paymentOption
        })
        // -- note: this is the old flow with verifcation before the actual purchase, this needs to be readjusted --
        if (parseFloat(state.investAmount) > parseFloat(state.balance)) {
          toast("Insufficient balance", ERROR_OPTION);
          return false;
        }
        onNext();
    }

    return (
        <InvestWrapper>
            <div className="invest-step2-body0">
                <span>Enter your purchase amount</span>
                <span>Please select the chain and tokens, enter the amount and we will convert the TRCYN amount for you</span>
                <div className="selector-container">
                    <ChainSelector setPaymentOption={(option) => setPaymentOption(option)}/>
                    <AmountInput  setInvestAmount={(amount) => setInvestAmount(amount)}/>
                </div>
                <div className="steps-action">
                    <div>
                        <Button type="primary" onClick={() => handleNext()}>
                            Buy
                        </Button>
                    </div>
                </div>
            </div>
        </InvestWrapper>
    )
}

export default InvestStep2;
