const tlToken = '0x6fee3e680480cc1a94dd384e1651cada9b1d5d3c'
const tlAddress = '0xC8f89C4854D7EBE150b43EA5EAc9691AD187Af41'
const ercABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const tlABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "Locked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getLocks",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "unlockDate",
						"type": "uint256"
					}
				],
				"internalType": "struct Timelock.Lock[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getLocksByUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "unlockDate",
						"type": "uint256"
					}
				],
				"internalType": "struct Timelock.Lock[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_deadline",
				"type": "uint256"
			}
		],
		"name": "lockToken",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "unlockDate",
						"type": "uint256"
					}
				],
				"internalType": "struct Timelock.Lock[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
//metamask detection
var web3 = new Web3(window.ethereum);
   
const timeLock = new web3.eth.Contract(tlABI,tlAddress);
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
    
/// if current locks = null then x
}



//listen for deposit button
const tlSubmit = document.getElementById('tl-deposit-button');


tlSubmit.onclick = async () => {
//token address
const tlTokenAddress = document.getElementById('tl-address-box').value
    console.log(tlTokenAddress)
// value box
    const tlValue = document.getElementById('tl-deposit-box').value
    console.log(tlValue)
// time box
    const tlTime = document.getElementById('tl-time-box').value
    console.log(tlTime)
	
    var web3 = new Web3(window.ethereum);
   
    const timeLock = new web3.eth.Contract(tlABI,tlAddress);
	const Locked = await timeLock.events.Locked(function(error, event){console.log(event)})
	

    timeLock.setProvider(window.ethereum);
	
    await timeLock.methods.lockToken(tlTokenAddress,tlValue,tlTime).
    send({from: ethereum.selectedAddress}).then(Locked)



}
//listen for  withdrawbutton
const tlWithdraw = document.getElementById('tl-withdraw-button');

tlWithdraw.onclick = async () => {
    const tlWithdrawAmount = document.getElementById('tl-withdraw-box').value;
    console.log(tlWithdrawAmount)

    var web3 = new Web3(window.ethereum)

    const timeLock = new web3.eth.Contract(tlABI,tlAddress)
    timeLock.setProvider(window.ethereum)

    
    await timeLock.methods.withdraw(tlWithdrawAmount).
    send({from: ethereum.selectedAddress}) 

}

const tlGetValue = document.getElementById('tl-get-locks')

tlGetValue.onclick = async () => {

  var web3 = new Web3(window.ethereum)

  const Timelock = new web3.eth.Contract(tlABI, tlAddress)
  Timelock.setProvider(window.ethereum)

  var value = await Timelock.methods.getLocksByUser(ethereum.selectedAddress).call()
  var stringValue = JSON.stringify(value)
  console.log(value)

  const tlDisplayLocks = document.getElementById('tl-display-locks')

  tlDisplayLocks.innerHTML = 'Current Locks: ' + stringValue

}

