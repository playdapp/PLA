const { setConfig } = require('./config.js')
const config = require('../config/index')


const PlayDapp = artifacts.require('PlayDapp');
const PlayDappPurchased = artifacts.require('PlayDappPurchased');


module.exports = async (deployer, network) => {
  await deployer.deploy(
    PlayDappPurchased,
    PlayDapp.address,
    config.ethToPlaRatio,
  );
  const playDappPurchased = await PlayDappPurchased.deployed();

  setConfig(`deployed.${network}.PlayDappPurchased V2`, playDappPurchased.address)
};
