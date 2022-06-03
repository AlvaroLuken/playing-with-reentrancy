require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.10",
  gasReporter: {
    currency: 'USD',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  optimizer: {
    enabled: true,
    runs: 1000,
  },
  networks: {
    hardhat: {
      gasPrice: 100000000000
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_KEY
  }
};
