# Configuration
Application configuration, such as network, contract addresses and more are set in file:
`src/config/constants.js`

# ABIs
Contract ABI JSON files are located in directory:
`src/config/`.

# Sale
* `/src/components/InvestForm/InvestStep2/AmountInput.js` for specifying the amount to invest
* `src/components/InvestForm/InvestStep2/ChainSelector.js` for specifying payment option (and also network, which is not relevant for now)
* `src/containers/Invest/InvestStep2.js` as wrapper for payment components

# Dev Confif/ Connection
Config in `src/config/constants.js`
Connection handling in `src/components/InvestForm/InvestStep2/ChainSelector.js`