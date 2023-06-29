import React, { useState, useMemo, useEffect } from "react"
import { Form, Select } from "antd"

import "./ChainSelector.scss"
import { CHAINS, TOKEN_LIST, CHAINS_CONFIG, ERROR_OPTION } from "../../../config/constants"
import { useDispatch, useTrackedState } from "../../../contexts/store"
import { useKeplrWallet } from "../../../contexts/keplrWallet"
import { useMetamaskWallet } from "../../../contexts/metamask"
import { useTronLink } from "../../../contexts/tronLink"
import { toast } from "react-toastify"
import { SvgIcon } from '../../common';

const ChainSelector = (props) => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const keplr = useKeplrWallet();
  const metamask = useMetamaskWallet();
  const tronLink = useTronLink();

  async function connectTo(to) {
    let wallet;
    switch (to.toLowerCase()) {
      case "metamask": wallet = metamask; break;
      case "keplr": wallet = keplr; break;
      case "tron": wallet = tronLink; break;
      default: wallet = metamask; break;
    }

    await wallet.connect();
    dispatch({ type: "setWalletType", payload: to });
  }

  const [chainKey, setChainKey] = useState(0);
  const chainItems = CHAINS.map((chain, index) => {
    return {
      value: index,
      label: chain
    }
  })

  const handleChainSelect = async (index) => {
    setChainKey(index)
    dispatch({ type: "setInvestChain", payload: CHAINS[index] });

    const chain = CHAINS[index].toLowerCase();
    switch (chain) {
      case "juno":
        connectTo("keplr");
        break;
      case "bsc":
      case "bsc_testnet":
      case "polygon":
      case "avalanche":
        const ethereum = window.ethereum;
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${CHAINS_CONFIG[chain].chainId.toString(16)}` }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: `0x${CHAINS_CONFIG[chain].chainId.toString(16)}`,
                    chainName: CHAINS_CONFIG[chain].chainName,
                    rpcUrls: [CHAINS_CONFIG[chain].rpc] /* ... */,
                    nativeCurrency: CHAINS_CONFIG[chain].nativeCurrency
                  },
                ],
              });
            } catch (addError) {
              console.log(addError);
              toast("Can't switch to " + chain.toUpperCase(), ERROR_OPTION);
            }
          }
        }
        connectTo("metamask");
        break;
      case "tron":
        connectTo("tron");
        break;
      default: break;
    }
  }
  useEffect(() => {
    handleChainSelect(chainKey);
  }, []);

  const [tokenKey, setTokenKey] = useState(0);

  const token_list = useMemo(() => TOKEN_LIST.filter(token => token.chain.toLowerCase() === state.investChain.toLowerCase()), [state.investChain]);

  const tokenItems = useMemo(() => token_list.map((token, index) => {
    return {
      key: index,
      label: <div onClick={() => handleTokenSelect(index)}>{token.name}</div>
    }
  }), [token_list]);
  useEffect(() => {
    handleTokenSelect(0);
  }, [tokenItems]);

  const handleTokenSelect = (index) => {
    setTokenKey(index);
    props.setPaymentOption(token_list[index]); // set selected payment option for wrapper component
    dispatch({ type: "setInvestToken", payload: token_list[index].name });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      layout='vertical'
    >
      <div className="selector-wrapper">
        <Form.Item
          name="project"
          label="Select Project"
          style={{ width: "100%" }}
        >
          <Select
            defaultValue={"Traccy"}
            suffixIcon={<SvgIcon name='select-arrow' viewbox='0 0 9.42 7.186' />}
            popupClassName="select-drop"
            options={[{value: "Traccy", label: "Traccy Connect"}]}
          />
        </Form.Item>
        <Form.Item
          name="prjtoken"
          label="Project Token"
          style={{ width: "100%", position: "relative" }}
        >
          <input
            value={token_list.length>tokenKey ? token_list[tokenKey].name : ""}
          />
          <Select
            defaultValue={"trcyn"}
            suffixIcon={<SvgIcon name='select-arrow' viewbox='0 0 9.42 7.186' />}
            popupClassName="select-drop"
            options={[{value: "trcyn", label: "TRCYN"}]}
          />
        </Form.Item>
      </div>
      <div className="selector-wrapper">
        <Form.Item
          name="chain"
          label="Select Chain"
          style={{ width: "100%" }}
        >
          <Select
            defaultValue={0}
            suffixIcon={<SvgIcon name='select-arrow' viewbox='0 0 9.42 7.186' />}
            popupClassName="select-drop"
            options={chainItems}
            onChange={handleChainSelect}
          />
        </Form.Item>
        <Form.Item
          name="tokens"
          label="Tokens"
          style={{ width: "100%", position: "relative" }}
        >
          <input
            value={token_list.length>tokenKey ? token_list[tokenKey].name : ""}
          />
          <Select
            value={token_list.length>tokenKey ? token_list[tokenKey].name : ""}
            suffixIcon={<SvgIcon name='select-arrow' viewbox='0 0 9.42 7.186' />}
            popupClassName="select-drop"
            options={tokenItems}
            onChange={(e) => console.log(e)}
          />
        </Form.Item>
      </div>
    </Form>
  )
}

export default ChainSelector;

