const { expectRevert, time } = require('@openzeppelin/test-helpers');
const BN = require('bignumber.js')
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BN))
  .should()
const util = require('./util/function')
const config = require('../config/index')


const PlayDapp = artifacts.require('PlayDapp');
const PlayDappTimelock = artifacts.require('PlayDappTimelock');


contract('PlayDappTimelock', async (accounts) => {
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const user3 = accounts[3];

  const amount = new BN(100);
  const amountWei = web3.utils.toWei(amount.toString(), 'ether')

  before (async () => {
    const pla = await PlayDapp.new(
      config.playDappNameRopsten, config.playDappSymbolRopsten, config.decimals,
      config.initialSupply, config.cap,
      { from: owner },
    );
    this.pla = pla
  })


  it('PLA V2 timelock deploy', async () => {
    // 1년뒤에 락업 해제시에 user1에게 PLA가 전송될 수 있도록 설정
    const releaseTime = (await time.latest()).add(time.duration.years(1));
    this.releaseTime = releaseTime

    const timelock = await PlayDappTimelock.new(
      this.pla.address, user1, releaseTime,
      { from: owner },
    );
    this.timelock = timelock


    // 락업 후 받을 PLA 수량 전송
    await this.pla.transfer(this.timelock.address, amountWei, { from: owner })


    const balance = new BN(await this.pla.balanceOf(this.timelock.address))
    balance.should.be.bignumber.equal(amountWei)

    // ** 락업 컨트렉트 배포는 어떤 유저나 실행할 수 있다.
  })


  it('PLA V2 timelock release', async () => {
    // 락업 해제 시간이 안되었을때 release는 불가능
    await expectRevert(
      this.timelock.release(),
      'TokenTimelock: current time is before release time -- Reason given: TokenTimelock: current time is before release time.',
    );


    // 테스트를 위해 시간 변경
    await time.increaseTo(this.releaseTime.add(time.duration.years(1)));
    const beforeBalance = new BN(await this.pla.balanceOf(user1))


    // 락업 해지
    await this.timelock.release() // ** 어떤 유저나 실행할 수 있다.


    // release가 된 이후에는 user1에게 pla가 늘어난다.
    const afterBalance = new BN(await this.pla.balanceOf(user1))
    afterBalance.should.be.bignumber.equal(beforeBalance.plus(amountWei))
  })
})
