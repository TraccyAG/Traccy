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
      }
    }
    getBalance();
  }, [dispatch, state.investChain, state.investToken, wallet]);

  useEffect(() => {
    // read phase info of current phase and store it in state variable `price` and `phaseVolume`
    const provider = new ethers.providers.JsonRpcProvider(CHAINS_CONFIG.avalanche.rpc, CHAINS_CONFIG.avalanche.chainId);
    const saleContract = new Contract(PHASEABLE_SALE_CONTRACT_ADDRESS, saleAbi.abi, provider);
    saleContract.phaseCounter().then(
      counter => saleContract.phaseInfo(counter-1 > 0 ? counter-1: 0).then(
        res => { 
          setPrice(ethers.utils.formatUnits(res.priceUsd, 6));
          const phaseTokenomics = {total: ethers.utils.formatEther(res.amountTotal), available: ethers.utils.formatEther(res.amountTotal.sub(res.amountSold))};
          setPhaseVolume(phaseTokenomics);
        }
      )
    );

  }, []);

  const [price, setPrice] = useState(0);
  const [phaseVolume, setPhaseVolume] = useState({total:"0", available:"0"});

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
        <span className="balance">your balance : {state.balance}</span>
      </div>
      <div className="input-card">
        <span>TRCYN tokens you will receive</span>
        <div className="input-box">
          <input value={state.investTrcyAmount} readOnly placeholder={0} />
          <span className="suffix">
            {token}
          </span>
        </div>
        <span className="balance">{`available in this phase : ${parseInt(phaseVolume.available)} / ${parseInt(phaseVolume.total)}`}</span>
      </div>
    </div>
  )
}

export default TokenSelector;
