pragma solidity 0.5.15;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract PlayDappPurchased is ReentrancyGuard, Ownable {
  event EventPurchased(address _to, uint256 _value);
  event EventAirdrop(address _to, uint256 _value);
  event EventWithdraw(address _to, uint256 _value);

  using SafeMath for uint256;
  using SafeERC20 for IERC20;

  IERC20 private token;
  uint256 ratio;

  constructor(IERC20 _token, uint256 _ratio)
    public {
      token = IERC20(_token);
      ratio = _ratio;
  }

  function ()
    external payable {
    buyTokens(msg.sender, msg.value);
  }


  function buyTokens(address _to, uint256 _amount)
    internal nonReentrant {
    uint256 amount = SafeMath.mul(_amount, ratio);
    validateCheck(_to, amount);

    token.safeTransfer(_to, amount);
    emit EventPurchased(_to, _amount);
  }


  function airDrop(address _to, uint256 _amount)
    public nonReentrant onlyOwner {
    validateCheck(_to, _amount);

    token.safeTransfer(_to, _amount);
    emit EventAirdrop(_to, _amount);
  }


  function validateCheck(address _to, uint256 _amount)
    internal view {
    require(_to != address(0), 'wrong address');
    require(_amount > 0, 'wrong price');
    require(token.balanceOf(address(this)) >= _amount, 'to lack token');
  }



  function getRatio ()
    public view onlyOwner returns (uint256) {
    return ratio;
  }
  function setRatio (uint256 _ratio)
    public onlyOwner {
    ratio = _ratio;
  }


  function withdraw (uint256 _amount, address payable _account)
    public onlyOwner {
    require (
      address(_account) != address(0) &&
      address(_account) != address(this), 'wrong address');
    require(_amount <= address(this).balance, 'wrong price');

    _account.transfer(_amount);
    emit EventWithdraw(_account, _amount);
  }
}
