require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    localhost: {
      host: '127.0.0.1',
      port: 7546,
      network_id: '5777',
      gas: 6700000,
    },
    development: {
      provider: () => new HDWalletProvider(process.env.mnemonic_development, `https://ropsten.infura.io/v3/${process.env.infura_development}`),
      network_id: 3,
      gasPrice: 11000000000,
    },
    qa: {
      provider: () => new HDWalletProvider(process.env.mnemonic_qa, `https://ropsten.infura.io/v3/${process.env.infura_qa}`),
      network_id: 3,
      gasPrice: 11000000000,
    },
    mainnet: {
      provider: () => new HDWalletProvider(process.env.mnemonic_mainnet, `https://mainnet.infura.io/v3/${process.env.infura_mainnet}`),
      network_id: 1,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: '0.5.15',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
