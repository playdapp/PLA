const { setConfig } = require('./config.js')

const PlayDapp = artifacts.require('PlayDapp');
const PlayDappTimelock = artifacts.require('PlayDappTimelock');


module.exports = async (deployer, network, accounts) => {
  const list = []

  let plaAddress = PlayDapp.address

  if (network === 'localhost') {
    plaAddress = '0x6DC76Cd477B629199db9250D88eA7bA30C7703e3'
    list.push({ beneficiary: accounts[0], releaseTime: 1615939200000 })
    list.push({ beneficiary: accounts[1], releaseTime: 1615939200000 })
    list.push({ beneficiary: accounts[2], releaseTime: 1615939200000 })
    list.push({ beneficiary: accounts[3], releaseTime: 1615939200000 })
    list.push({ beneficiary: accounts[4], releaseTime: 1615939200000 })
  }
  if (network === 'development') {
    plaAddress = '0x6DC76Cd477B629199db9250D88eA7bA30C7703e3'
    list.push({ beneficiary: '0xD09cCa8DF5A0A9fB7FbeC6b1F4e79d9D0750E0BF', releaseTime: 1584676098000 })
  }

  for (let i = 0; i < list.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await deployer.deploy(
      PlayDappTimelock,
      plaAddress, list[i].beneficiary, list[i].releaseTime,
    );
    // eslint-disable-next-line no-await-in-loop
    const playDappTimelock = await PlayDappTimelock.deployed();

    setConfig(`deployed.${network}.PlayDappTimelock V2 ${i}`, playDappTimelock.address)
  }
};
