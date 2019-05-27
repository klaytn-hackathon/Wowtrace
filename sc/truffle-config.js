const HDWalletProvider = require('truffle-hdwallet-provider');
const PrivateKeyConnector = require('connect-privkey-to-provider')

let mnemonic = "infant quantum illegal earth icon trend close garlic correct rare apart verb";
let ropstenKey = "https://ropsten.infura.io/v3/6b8d5e541fb54d5f84dd5632e39b49cd"

/**
 * URL: URL for the remote node you will be using
 * PRIVATE_KEY: Private key of the account that pays for the transaction (Change it to your own private key)
 */
const URL = `https://api.baobab.klaytn.net:8651`

// Paste your `Private key` that has enough Test_KLAY to truffle.js
const PRIVATE_KEY = '0x573a762e823f62a286aef9b417d76d4884c756a45102ffa6873f8616981310bd'


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777"
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, ropstenKey),
      network_id: 3,
      gas: 4700000
    },
    klaytn: {
      provider: new PrivateKeyConnector(PRIVATE_KEY, URL),
      network_id: "1001",
      gas: "20000000",
      gasPrice: null,
    },
  }
};
