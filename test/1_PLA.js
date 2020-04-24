const { expectRevert, time } = require('@openzeppelin/test-helpers');
const BN = require('bignumber.js')
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BN))
  .should()
const util = require('./util/function')
const config = require('../config/index')


const PlayDapp = artifacts.require('PlayDapp');


contract('PLA', async (accounts) => {
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const user3 = accounts[3];

  const amount = new BN(100)
  const amountWei = web3.utils.toWei(amount.toString(), 'ether')

  before (async () => {
    const pla = await PlayDapp.new(
      config.playDappNameRopsten, config.playDappSymbolRopsten, config.decimals,
      config.initialSupply, config.cap,
      { from: owner },
    );
    this.pla = pla


    const init = new BN(1000)
    const initWei = web3.utils.toWei(init.toString(), 'ether')
    await this.pla.transfer(user1, initWei, { from: owner })
  })


  it('PLA config check', async () => {
    const tokenSymbol = await this.pla.symbol()
    const tokenName = await this.pla.name()
    const decimals = await util.getWeiFromBN(await this.pla.decimals())
    const cap = await util.getWeiFromBN(await this.pla.cap())
    const initialSupply = await util.getWeiFromBN(await this.pla.totalSupply())


    tokenSymbol.should.be.equal(config.playDappSymbolRopsten)
    tokenName.should.be.equal(config.playDappNameRopsten)
    decimals.should.be.equal(config.decimals.toString())
    cap.should.be.bignumber.equal(config.cap)
    initialSupply.should.be.bignumber.equal(config.initialSupply)
  })


  it('PLA burn', async () => {
    const beforeSupply = new BN(await this.pla.totalSupply())


    // burn
    await this.pla.burn(amountWei, { from: owner })


    const afterSupply = new BN(await this.pla.totalSupply())
    afterSupply.should.be.bignumber.equal(beforeSupply.minus(amountWei))
  })


  it('PLA mint', async () => {
    const beforeSupply = new BN(await this.pla.totalSupply())
    const beforeOwner = new BN(await this.pla.balanceOf(owner))


    // mint
    await this.pla.mint(owner, amountWei, { from: owner })


    const afterSupply = new BN(await this.pla.totalSupply())
    const afterOwner = new BN(await this.pla.balanceOf(owner))


    afterSupply.should.be.bignumber.equal(beforeSupply.plus(amountWei))
    afterOwner.should.be.bignumber.equal(beforeOwner.plus(amountWei))


    await expectRevert(
      this.pla.mint(owner, amountWei, { from: owner }),
      'ERC20Capped: cap exceeded -- Reason given: ERC20Capped: cap exceeded.',
    );

    await expectRevert(
      this.pla.mint(owner, amountWei, { from: user1 }),
      'revert MinterRole: caller does not have the Minter role -- Reason given: MinterRole: caller does not have the Minter role.',
    );
  })


  it('PLA pausable', async () => {
    const beforePause = await this.pla.paused()
    beforePause.should.be.equal(false)


    await this.pla.transfer(user2, amountWei, { from: user1 })


    await this.pla.pause({ from: owner })


    const afterPause = await this.pla.paused()
    afterPause.should.be.equal(true)


    await expectRevert(
      this.pla.transfer(user2, amountWei, { from: user1 }),
      'Pausable: paused -- Reason given: Pausable: paused.',
    );


    await this.pla.unpause({ from: owner })


    const pause = await this.pla.paused()
    pause.should.be.equal(false)


    await this.pla.transfer(user2, amountWei, { from: user1 })
  })
})
