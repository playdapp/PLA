const BN = require('bignumber.js')


exports.getBalanceNumberBN = async (token, account) => {
  const balance = await token.balanceOf(account)
  const tokenBalance = new BN(balance)
  return tokenBalance
};
