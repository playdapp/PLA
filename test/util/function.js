const BN = require('bignumber.js')
const web3 = require('web3')

exports.getNumberFromBN = async (bn) => {
  const value = web3.utils.fromWei(bn, 'ether')
  return value
};

exports.getWeiFromBN = async (bn) => {
  const value = web3.utils.fromWei(bn, 'wei')
  return value
};


exports.getToWei = async (amount) => {
  const value = web3.utils.toWei(amount.toString(), 'ether')
  return value
};


exports.getBalance = async (token, account) => {
  const decimals = 18
  const balance = await token.balanceOf(account)

  const tokenBalance = new BN(balance).dividedBy(10 ** decimals).toFixed(0)

  return tokenBalance
};


exports.getBalanceBN = async (token, account) => {
  const decimals = 18
  const balance = await token.balanceOf(account)

  const tokenBalance = new BN(balance).dividedBy(10 ** decimals)

  return tokenBalance
};


exports.getBalanceNumberBN = async (token, account) => {
  const balance = await token.balanceOf(account)
  const tokenBalance = new BN(balance)
  return tokenBalance
};
