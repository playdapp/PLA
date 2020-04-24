pragma solidity 0.5.15;

import "@openzeppelin/contracts/token/ERC20/TokenTimelock.sol";


contract PlayDappTimelock is TokenTimelock {
  constructor (
    IERC20 _token,
    address _beneficiary,
    uint256 _releaseTime
  ) public
    TokenTimelock(_token, _beneficiary, _releaseTime)
  {}
}
