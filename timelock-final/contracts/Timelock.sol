//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
   
///@title Timelock dapp


interface IERC20 {
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}


///@notice lock tokens for a time period of your choosing
contract Timelock {
   
/// @notice struct to keep track and help manage locks
    struct Lock
    {
        address owner;
        address token;
        uint256 amount;
        uint256 unlockDate;
    }
   
    mapping(address => Lock[]) userToTokenLocks;

    event Locked(address indexed user, address indexed token, uint amount, uint deadline);
    event Withdraw(address indexed user, address indexed token,  uint amount);

    uint constant day = 86400;
   
    constructor(){}
   ///@notice locks a specific token for a specific amount of time
   ///@param _token, the address of the token to be locked
   ///@param _amount, the amount of _token to be locked
   ///@param _deadline, how long the token will be locked in days
    function lockToken(address _token, uint256 _amount, uint256 _deadline) external returns(bool)
    {
        ///@notice before and after balance to prevent _amount of being higher than the final receiving amount due to tokenomics such as fee on transfer
        uint balanceBefore = IERC20(_token).balanceOf(address(this));
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        uint balanceAfter = IERC20(_token).balanceOf(address(this));
        /// pushes to Lock struct 
        userToTokenLocks[msg.sender].push(Lock(msg.sender, _token, balanceAfter-balanceBefore, _deadline));     
        ///Locked event
        emit Locked(msg.sender, _token, _amount, _deadline);
        return true;
    }
    
///@notice returns locked funds and removes user from Lock struct
///@param _index is the amount you wish to unlock/withdraw
    function withdraw(uint256 _index) external returns(Lock[] memory)
    {
        Lock memory lock = userToTokenLocks[msg.sender][_index];
        require(msg.sender == lock.owner, "not the owner");
        require(block.timestamp >= lock.unlockDate, "Token not unlocked yet!");

        (address token, uint amount, uint last) = (lock.token,lock.amount,userToTokenLocks[msg.sender].length-1);

        if(_index != last) {
            userToTokenLocks[msg.sender][_index] = userToTokenLocks[msg.sender][last];
            userToTokenLocks[msg.sender][last] = lock;
        }

        userToTokenLocks[msg.sender].pop();

        IERC20(token).transfer(msg.sender, amount);
        emit Withdraw(msg.sender,token,amount);
        return userToTokenLocks[msg.sender];
    }
    
    // @notice returns all locks
    function getLocks() public view returns(Lock[] memory)  {
        return userToTokenLocks[msg.sender];
    }
    //@notice returns locks by user
    function getLocksByUser(address _user) public view returns(Lock[] memory){
        return userToTokenLocks[_user];
    }
   
}
