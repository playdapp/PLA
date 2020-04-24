const web3 = require('web3')

const all = {
  decimals: 18,

  playDappNameRopsten: 'PlayDapp Token',
  playDappSymbolRopsten: 'PLA',

  playDappNameMainnet: 'PlayDapp Token',
  playDappSymbolMainnet: 'PLA',

  initialSupply: web3.utils.toWei('2500000000', 'ether'),
  cap: web3.utils.toWei('2500000000', 'ether'),
}
module.exports = all
