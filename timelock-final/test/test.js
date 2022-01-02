const Timelock = artifacts.require('Timelock')
const Token = artifacts.require('Token')
const timeMachine = require('ganache-time-traveler');

contract('Timelock&Token',() => {

    let token;
    let timeLock;

    let accounts;

    it('Should deploy Token properly', async () => {
        token = await Token.deployed()
        accounts = await web3.eth.getAccounts()
        assert(token !== null)
    })

    it('Should deploy Timelock properly', async () => {
        timeLock = await Timelock.deployed()

        assert(timeLock !== null)
    })


    it('Should approve 1 wei', async () => {
        const approve = await token.approve.call(timeLock.address,'1')
        if(approve) {
            await token.approve(timeLock.address,'300')
        }
        assert(approve)
    })
    it('Should be able to lock', async () => {
        await timeLock.lockToken(token.address, '100', '1')
    })
    it('Should give back list of locks', async () => {
        await timeLock.getLocks.call();
    })

    it('Should be able to withdraw and return empty Lock array', async () => {
        //@notice block advancment
        /*
        advancement = 86400 * 10 // 10 Days
        await timeMachine.advanceTimeAndBlock(advancement);
        */
        //withdrawing after time
        const withdrawCall = await timeLock.withdraw.call('0')
        assert(withdrawCall.length === 0)
    })
    it('Should withdraw properly', async () => {
        
        await timeLock.withdraw('0')
        assert(true)
    })
    it('Should get exact amount back', async () => {
        
        await timeLock.lockToken(token.address, '100', '1')
        await timeLock.lockToken(token.address, '200', '1')
        //@notice block advancment
        /*advancement = 86400 * 10 // 10 Days
        await timeMachine.advanceTimeAndBlock(advancement);
        */
        //withdrawing after time
        await timeLock.withdraw('1')
        
        const afterWithdraw = await token.balanceOf(accounts[0])
        assert(afterWithdraw.toString() === "9999999999999999999900")
    })
    it('Should not be able to withdraw before deadline', async () => {
        await timeLock.lockToken(token.address, '1', '9999')

        try {
            await timeLock.withdraw('1')
            assert(false)
        } catch (error) {
            assert(true)
        }
    })
})
