
const timelockAddress = "0xc3eC723D784Fc8089b003d5189CEb6315B69460c"

const timelockABI =
    [
        {
            "inputs": [],
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "Receive",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Receive",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "Withdraw",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "balance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balances",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "duration",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "end",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "time",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }]


//metamask detection

window.addEventListener('load', function(){
    if(typeof window.ethereum !== 'undefined'){
        console.log('Metamask detected')
        let mmDetected = this.document.getElementById('mm-detected')
        mmDetected.innerHTML = "Metamask has been detected"
    }
    else{
        console.log('Metamask is not available')
        alert('You neeed to install metamask')
    }

})
//enable mm on the site
const mmEnable = document.getElementById('mm-connect');
mmEnable.onclick = async () =>{
    await ethereum.request({method:
    'eth_requestAccounts'})

    const mmCurrentAccount = document.getElementById('mm-current-account');
mmCurrentAccount.innerHTML = "Here's your current account: " + ethereum.selectedAddress
}

//listen for deposit button
const tlSubmit = document.getElementById('tl-deposit-button');


tlSubmit.onclick = async () => {
    const tlValue = document.getElementById('tl-deposit-box').value;
    console.log(tlValue)

    var web3 = new Web3(window.ethereum)
    
    const timelock = new web3.eth.Contract(timelockABI,timelockAddress)

    timelock.setProvider(window.ethereum)

    await web3.eth.sendTransaction({
        from: ethereum.selectedAddress,
        to: timelockAddress,
        value: tlValue })
}

//listen for  withdrawbutton
const tlWithdraw = document.getElementById('tl-withdraw-button');

tlWithdraw.onclick = async () => {
    const tlWithdrawAmount = document.getElementById('tl-withdraw-box').value;
    console.log(tlWithdrawAmount)

    var web3 = new Web3(window.ethereum)

    const timelock = new web3.eth.Contract(timelockABI,timelockAddress)
    timelock.setProvider(window.ethereum)

    
    await timelock.methods.withdraw(tlWithdrawAmount).
    send({from: ethereum.selectedAddress}) 


}