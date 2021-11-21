
My project idea is a bit lighthearted. I would like to make a HODL dapp which is exactly what it sounds like.

Holding is hard. Especially when the market is so volatile and fud is everywhere.
My HODL app will take any ERC20 token and hold it in a time locked contract for X amount of time.
Think ETH will be 20k but have baby paper hands? HODL is for you. Put your money where your time is.

I’d also be interested in adding a feature that mints an NFT for you on unlock day that somehow represents time held and what token, but I’m not sure what the difficulty of that would be.

Something like the coin you get from an Alcoholics Anonymous meeting.


Function Sketches:

I'd like to have two contracts, one that creates a new wallet for the locked funds and another that holds the logic for deposit,withdraw, time, etc. 

this would be in the wallet creator contract
  1. function newLockedWallet(address _owner, uint256 _unlockDate)
        payable
        public
        returns(address wallet)
        
    this function would create a new wallet, add the wallet to senders wallets, send ether to the wallet and emit an event

this would be in the seecond contract.
VVV

 2.   constructor LockedWallet(
        address _creator,
        address _owner,
        uint256 _unlockDate
    ) public {
        creator = _creator;
        owner = _owner;
        unlockDate = _unlockDate;
        createdAt = now;
    }
    
    constructor for the wallet
    
3.   function withdraw() onlyOwner public {
        require(now >= unlockDate);
        
    withdraw function that checks owner and date
       
        
    
If i have enough time i hope to add a function that creates an nft that corresponds to timee and amount locked.
    
    

