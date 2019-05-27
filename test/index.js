// /**
//  * Require the credentials that you entered in the .env file
//  */
// require('dotenv').config()

// const Web3 = require('web3')
// const HDWalletProvider = require('truffle-hdwallet-provider');
// const mnemonic = "infant quantum illegal earth icon trend close garlic correct rare apart verb";

// const web3 = new Web3(new HDWalletProvider(mnemonic, process.env.ROPSTEN_KEY));
// const account = web3.eth.accounts.privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);
// web3.eth.defaultAccount = account.address

// const jsonInterface = [{
//     "constant": false,
//     "inputs": [
//         {
//             "name": "_stampCode",
//             "type": "string"
//         },
//         {
//             "name": "_receiver",
//             "type": "address"
//         }
//     ],
//     "name": "initStamp",
//     "outputs": [
//         {
//             "name": "",
//             "type": "bool"
//         }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function",
//     "signature": "0x0b524d04"
// }]

// const myContract = new web3.eth.Contract(jsonInterface,
//     process.env.SC_ADDRESS,
//     {
//         from: account.address,
//         gas: 4700000
//     })

// // using the callback
// myContract.methods.initStamp("2019ABC", "0xb51E3bB21697918521Dd4B5260D591497Aed5ECC")
//     .send()
//     .then((receipt) => {
//         console.log(receipt)
//     })
// // console.log(Contract.methods)


// test-klaytn.js
const Caver = require('caver-js');
const caver = new Caver('https://api.baobab.klaytn.net:8651');

const contractAddress = '0x91f99a9a761062869ecfc3a2f7d262195069ed80'
const privateKey = '0x573a762e823f62a286aef9b417d76d4884c756a45102ffa6873f8616981310bd'

// Make wallet instance with caver's privateKeyToAccount API
const walletInstance = caver.klay.accounts.privateKeyToAccount(privateKey)

// To send a transaction, add wallet instance to caver
caver.klay.accounts.wallet.add(walletInstance)

// enter your smart contract address



// caver.klay.getCode(contractAddress).then(console.log);
// add lines
const KlaytnGreeter = require('./UnitStampFactory.json');
// enter your smart contract address
const klaytnGreeter = new caver.klay.Contract(
    KlaytnGreeter.abi, 
    contractAddress);

klaytnGreeter.methods.initStamp("2019DAT", "0xb51E3bB21697918521Dd4B5260D591497Aed5ECC")
.send({
    from: walletInstance.address,
    gas: 2000000
})
.on('transactionHash', (hash) => {
    console.log('transactionHash', hash)
})
.on('receipt', (receipt) => {
    console.log('receipt')
})
.on('error', () => {
    console.log('error')
})
// .then((receipt) => {
//     console.log(receipt)
// });