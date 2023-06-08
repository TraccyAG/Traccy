import { useState, useEffect } from "react";
import "./AmountInput.scss"
import { useDispatch, useTrackedState, useWallet } from "../../../contexts/store"
import { LookForTokenInfo } from "../../../config/utilitiy";

import { Contract, ethers } from "ethers";
import saleAbi from "../../../config/PhaseableSaleABI.json";
import { CHAINS_CONFIG, PHASEABLE_SALE_CONTRACT_ADDRESS } from "../../../config/constants";

const TokenSelector = (props) => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const wallet = useWallet();

  useEffect(() => {
    const getBalance = async() => {
      const tokenInfo = LookForTokenInfo(state.investChain, state.investToken);

      if(wallet && wallet.initialized && tokenInfo){
        const balance = await wallet.getTokenBalance(tokenInfo);
        dispatch({type: "setBalance", payload: balance});

        // connect with sales contract - with waller provider
        // const saleContract = new Contract("0xD5ac451B0c50B9476107823Af206eD814a2e2580", saleAbi.abi, wallet.signer.provider);
        // saleContract.phaseCounter().then(res => console.log(`phase counter: ${res}`));
        // saleContract.phaseInfo(0).then(res => console.log(ethers.utils.formatUnits(res.priceUsd, 6)));
      }
    }
    getBalance();
  }, [dispatch, state.investChain, state.investToken, wallet]);

  useEffect(() => {
    // read token price of current phase and store it in state variable `price`
    const provider = new ethers.providers.JsonRpcProvider(CHAINS_CONFIG.avalanche.rpc, CHAINS_CONFIG.avalanche.chainId);
    const saleContract = new Contract(PHASEABLE_SALE_CONTRACT_ADDRESS, saleAbi.abi, provider);
    saleContract.phaseCounter().then(
      counter => saleContract.phaseInfo(counter-1).then(
        res => setPrice(ethers.utils.formatUnits(res.priceUsd, 6))
      )
    );
  }, []);

  const [price, setPrice] = useState(0);

  const token = "TRCYCN";

  const changeValue = (e) => {
    dispatch({ type: "setInvestAmount", payload: e.target.value });
    dispatch({ type: "setInvestTrcyAmount", payload: Math.floor(parseFloat(e.target.value) / price) });
    props.setInvestAmount(e.target.value);
  }
  return (
    <div className="input-wrapper">
      <div className="input-card">
        <span>Token amount you want to invest</span>
        <div className="input-box">
          <input value={state.investAmount} onChange={changeValue} placeholder={0} />
          <span className="suffix">
            {state.investToken}
          </span>
        </div>
        <span className="balance">balance : {state.balance}</span>
      </div>
      <div className="input-card">
        <span>TRCYN tokens you will receive</span>
        <div className="input-box">
          <input value={state.investTrcyAmount} readOnly placeholder={0} />
          <span className="suffix">
            {token}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TokenSelector;
