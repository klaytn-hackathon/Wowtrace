/**
 * Require the credentials that you entered in the .env file
 */

const Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "infant quantum illegal earth icon trend close garlic correct rare apart verb";
var myConfig = require("./config.json")
let accAddress = '0xb51E3bB21697918521Dd4B5260D591497Aed5ECC'
const createConstract = () => {
    // const web3 = new Web3(new HDWalletProvider(mnemonic, myConfig.ROPSTEN_KEY));
    const web3 = new Web3(new HDWalletProvider(mnemonic, myConfig.RINKEBY_KEY));
    const account = web3.eth.accounts.privateKeyToAccount(`0x${myConfig.PRIVATE_KEY}`);
    web3.eth.defaultAccount = account.address

    const jsonInterface = [{
        "constant": false,
        "inputs": [
            {
                "name": "_stampCode",
                "type": "string"
            },
            {
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "initStamp",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x0b524d04"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_stampCode",
                "type": "string"
            }
        ],
        "name": "activateStamp",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x603aca1c"
    }]

    return (new web3.eth.Contract(jsonInterface,
        myConfig.SC_ADDRESS,
        {
            from: account.address,
            gas: 4700000
        }))
}

let arrTnx = []

let sendInitStamp = (stampCodes, ownerAddress, isFirt) => {
    arrTnx = isFirt ? [] : arrTnx
    const myContract = createConstract()
    const code = stampCodes.pop()
    return new Promise((resolve, reject) => {
        myContract.methods.initStamp(code, ownerAddress)
            .send()
            .on('transactionHash', (hash) => {
                arrTnx.push({ code, hash })
            })
            .on('receipt', (receipt) => {
                resolve(arrTnx)
            })
            .on('error', () => {
                reject(arrTnx.filter(tnx => (tnx.code !== code)))
            });
    }).then((arrTnx) => {
        return stampCodes.length > 0
            ? sendInitStamp(stampCodes, ownerAddress, false)
            : arrTnx
    }).then((arrTnx) => {
        return arrTnx
    })
}

let sendActivateStamp = (stampCodes, isFirt) => {
    arrTnx = isFirt ? [] : arrTnx
    const myContract = createConstract()
    const code = stampCodes.pop()
    return new Promise((resolve, reject) => {
        myContract.methods.activateStamp(code)
            .send()
            .on('transactionHash', (hash) => {
                arrTnx.push({ code, hash })
            })
            .on('receipt', (receipt) => {
                resolve(arrTnx)
            })
            .on('error', () => {
                reject(arrTnx.filter(tnx => (tnx.code !== code)))
            });
    }).then((arrTnx) => {
        return stampCodes.length > 0
            ? sendActivateStamp(stampCodes, false)
            : arrTnx
    }).then((arrTnx) => {
        return arrTnx
    })
}

module.exports = {
    sendInitStamp,
    sendActivateStamp
}
// console.log(Contract.methods)