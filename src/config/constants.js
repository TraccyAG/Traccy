export const NETWORK = "mainnet";
export const REQUEST_ENDPOINT =
  "https://clownfish-app-ytxjf.ondigitalocean.app";

export const PAYMENT_CONTRACT_ADDRESS = "0xDB4Eb8a105A20B9070ba292AD897d2d81483CD07"

export const PHASEABLE_SALE_CONTRACT_ADDRESS = "0xf606A0Cb6405DBEE4d143D73536D990B87a02e24" // phaseable sale on avalance
export const TRCYN_TOKEN_ADDRESS = "0x500d241f16c62Bf84B80E0631Bf38882D2942cFB" // phaseable sale on avalance

export const WEFUND_JUNO_ADDRESS = " ";
export const WEFUND_BSC_ADDRESS = "0xeD0C3d4d42EFFb4BbabB8155f6D16A4698e0Ddf1";
export const WEFUND_TRON_WALLET = "";
export const WEFUND_POLYGON_WALLET = "";
export const WEFUND_TRUST_BNB_WALLET = "";
export const WEFUND_NEAR_WALLET = "";
export const WEFUND_ELROND_WALLET = "";

export const SUCCESS_OPTION = {
  position: "bottom-right",
  type: "success",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};

export const ERROR_OPTION = {
  position: "bottom-right",
  type: "error",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// export const CHAINS = ["Juno", "BSC", "Tron", "Polygon"];
export const CHAINS = ["Avalanche"];

export const TOKEN_LIST = [
  {
    chain: "Avalanche",
    name: "USDC",
    decimals: 6,
    native: false,
    address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  },
  {
    chain: "Avalanche",
    name: "USDT",
    decimals: 6,
    native: false,
    address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
  },
  {
    chain: "Juno",
    name: "USDC",
    denom:
      "ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034",
    decimals: 6,
    native: true,
  },
  //{
  //  chain: "Juno",
  //   name: "ATOM",
  //   denom:
  //     "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
  //   decimals: 6,
  //   native: true,
  // },
  // {
  //   chain: "BSC",
  //   name: "BNB",
  //   denom: "BNB",
  //   decimals: 18,
  //   native: true,
  // },
  {
    chain: "BSC",
    name: "USDT",
    decimals: 18,
    native: false,
    address:
      NETWORK === "mainnet"
        ? "0x55d398326f99059fF775485246999027B3197955"
        : "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
  },
  {
    chain: "BSC",
    name: "USDC",
    decimals: 18,
    native: false,
    address:
      NETWORK === "mainnet"
        ? "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
        : "0x64544969ed7EBf5f083679233325356EbE738930",
  },
  {
    chain: "BSC",
    name: "BUSD",
    decimals: 18,
    native: false,
    address:
      NETWORK === "mainnet"
        ? "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
        : "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
  },
  {
    chain: "Tron",
    name: "USDD",
    decimals: 6,
    native: false,
    address: "TPYmHEhy5n8TCEfYGqW2rPxsghSfzghPDn",
  },
  {
    chain: "Tron",
    name: "USDT",
    decimals: 6,
    native: false,
    address:
      NETWORK === "mainnet"
        ? "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
        : "TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs",
  },
  // {
  //   chain: "Near",
  //   name: "Near",
  //   decimals: 24,
  //   native: true,
  // },
  // {
  //   chain: "Elrond",
  //   name: "EGLD",
  //   decimals: 18,
  //   native: true,
  // },
  //{
  //  chain: "Elrond",
  //  name: "USDC",
  //  decimals: 6,
  //  native: false,
  //  address: NETWORK == "mainnet" ? "USDC-cbf0b9" : "USDC-cbf0b9",
  //},
  // {
  //   chain: "Polygon",
  //   name: "MATIC",
  //   decimals: 18,
  //   native: true,
  // },
  {
    chain: "Polygon",
    name: "USDT",
    decimals: 6,
    native: false,
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  },
  {
    chain: "Polygon",
    name: "USDC",
    decimals: 6,
    native: false,
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  },
  // {
  //   chain: "OneLedger",
  //   name: "OLT",
  //   decimals: 18,
  //   natie: true,
  // },
  //{
  //  chain: "OneLedger",
  //  name: "USDT",
  //  decimals: 6,
  //  native: false,
  //  address: "0xED344b7C2deD6143e32B03ea905e59dC2010Ce74",
  //},
  // {
  //   chain: "Fantom",
  //   name: "FTM",
  //   decimals: 18,
  //   native: true,
  // },
  //{
  //  chain: "Fantom",
  //  name: "USDC",
  //  decimals: 6,
  //  native: false,
  //  address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
  //},
  //{
  //  chain: "Fantom",
  //  name: "USDT",
  //  decimals: 6,
  //  native: false,
  //  address: "0x1B27A9dE6a775F98aaA5B90B62a4e2A0B84DbDd9",
  //},
  // {
  //   chain: "TELOS",
  //   name: "TLOS",
  //   decimals: 18,
  //   native: true,
  // },
  // {
  //   chain: "TELOS",
  //   name: "USDC",
  //   decimals: 6,
  //   native: false,
  //   address: "0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b",
  // },
  // {
  //   chain: "TELOS",
  //   name: "USDT",
  //   decimals: 6,
  //   native: false,
  //   address: "0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73",
  // },
];

export const CHAINS_CONFIG = {
  rinkeby: {
    chainId: "0x4",
    chainName: "Rinkeby",
    rpc: "https://rpc.ankr.com/eth_rinkeby",
  },
  bsc_testnet: {
    chainId: "0x61",
    chainName: "BSC testnet",
    rpc: "https://bsctestapi.terminet.io/rpc",
  },
  bsc: {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    rpc: "https://bsc-dataseed4.binance.org",
  },
  polygon: {
    chainId: "0x89",
    chainName: "Polygon",
    rpc: "https://matic-mainnet.chainstacklabs.com",
  },
  oneledger: {
    chainId: "0x1294f7c2",
    chainName: "OneLedger",
    rpc: "https://mainnet-rpc.oneledger.network",
  },
  fantom: {
    chainId: "0xFA",
    chainName: "Fantom",
    rpc: "https://rpc2.fantom.network",
  },
  avalanche: {
    //chainId: "0xa86a",
    chainId: 43114,
    chainName: "Avalanche C-Chain",
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18
    },
  },
};

export const WALLET_LIST = [
  {
    name: "Metamask",
    icon: "/wallet/metamask-fox.svg",
    icon_hover: "/wallet/metamask-fox-hover.svg",
    link: "metamask",
  },
  
  // {
  //   name: "TrustWallet",
  //   icon: "/wallet/trust_platform.svg",
  //   icon_hover: "/wallet/trust_platform_hover.svg",
  //   link: "trust",
  // },
  // {
  //   name: "Keplr",
  //   icon: "/wallet/keplr.svg",
  //   icon_hover: "/wallet/keplr_hover.svg",
  //   link: "keplr",
  // },
  // {
  //   name: "TronLink",
  //   icon: "/wallet/tron_link.svg",
  //   icon_hover: "/wallet/tron_link_hover.svg",
  //   link: "tron",
  // },
  // {
  //   name: "ElrondWeb",
  //   icon: "/wallet/elrond-logo.svg",
  //   icon_hover: "/wallet/elrond-logo-hover.svg",
  //   link: "elrond",
  // },
];

export const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() public view returns (uint8)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
  "function approve(address to, uint amount)",
  "function increaseAllowance(address spender, uint amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];
