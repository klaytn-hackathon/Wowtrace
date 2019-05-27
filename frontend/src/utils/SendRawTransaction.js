const rp = require('request-promise')
const myConfig = require('./config.json')
const token = localStorage.getItem('token')

const createConstract = () => {
    const Caver = require('caver-js');
    const caver = new Caver('https://api.baobab.klaytn.net:8651');

    const contractAddress = myConfig.SC_ADDRESS
    const privateKey = localStorage.getItem('private')

    // Make wallet instance with caver's privateKeyToAccount API
    const walletInstance = caver.klay.accounts.privateKeyToAccount(privateKey)

    // To send a transaction, add wallet instance to caver
    caver.klay.accounts.wallet.add(walletInstance)

    // enter your smart contract address



    // caver.klay.getCode(contractAddress).then(console.log);
    // add lines
    const UnitStampFactory = require('./UnitStampFactory.json');
    // enter your smart contract address
    return ({
        myContract: (new caver.klay.Contract(
            UnitStampFactory.abi,
            contractAddress)),
        walletInstance
    })
}

let arrTnx = []

let sendInitStamp = (stampCodes, isFirt) => {
    arrTnx = isFirt ? [] : arrTnx
    const { myContract, walletInstance } = createConstract()
    const code = stampCodes.pop()
    return new Promise((resolve, reject) => {
        myContract.methods.initStamp(code, walletInstance.address)
            .send({
                from: walletInstance.address,
                gas: 20000000
            })
            .on('transactionHash', (txn) => {
                arrTnx.push({ code, txn })
            })
            .on('receipt', () => {
                resolve(arrTnx)
            })
            .on('error', () => {
                reject(arrTnx.filter(txn => (txn.code !== code)))
            });
    }).then((arrTnx) => {
        if (token) {
            const options = {
                uri: `${myConfig.BACKEND_API}/stamp/initiated`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {
                    stamp: arrTnx[arrTnx.length - 1],
                },
                json: true // Automatically parses the JSON string in the response
            };
            return rp.post(options)
                .then((parseBody) => {
                    return stampCodes.length > 0
                        ? sendInitStamp(stampCodes, false)
                        : arrTnx
                })
        }
    }).then((arrTnx) => {
        return arrTnx
    })
}

let sendActivateStamp = (stampCodes, isFirt) => {
    arrTnx = isFirt ? [] : arrTnx
    const { myContract, walletInstance } = createConstract()
    const code = stampCodes.pop()
    return new Promise((resolve, reject) => {
        myContract.methods.activateStamp(code)
            .send({
                from: walletInstance.address,
                gas: 20000000
            })
            .on('transactionHash', (txn) => {
                arrTnx.push({ code, txn })
            })
            .on('receipt', () => {
                resolve(arrTnx)
            })
            .on('error', () => {
                reject(arrTnx.filter(txn => (txn.code !== code)))
            });
    }).then((arrTnx) => {
        if (token) {
            var options = {
                uri: `${myConfig.BACKEND_API}/stamp/activate`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {
                    stamp: arrTnx[arrTnx.length - 1],
                },
                json: true // Automatically parses the JSON string in the response
            };
            return rp.post(options)
                .then(() => {
                    return stampCodes.length > 0
                        ? sendActivateStamp(stampCodes, false)
                        : arrTnx
                })
        }
    }).then((arrTnx) => {
        return arrTnx
    })
}

module.exports = {
    sendInitStamp,
    sendActivateStamp
}