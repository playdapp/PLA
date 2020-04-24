const { setConfig } = require('./config.js')
const config = require('../config/index')

const PlayDapp = artifacts.require('PlayDapp');

module.exports = async (deployer, network) => {
  let name = config.playDappNameRopsten
  let symbol = config.playDappSymbolRopsten

  if (network === 'mainnet') {
    name = config.playDappNameMainnet
    symbol = config.playDappSymbolMainnet
  }


  await deployer.deploy(
    PlayDapp,
    name, symbol, config.decimals,
    config.initialSupply, config.cap,
  );
  const token = await PlayDapp.deployed();


  setConfig(`deployed.${network}.PlayDapp`, token.address)
};
