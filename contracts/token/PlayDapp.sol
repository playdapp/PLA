pragma solidity 0.5.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";


contract PlayDapp is ERC20, ERC20Detailed, ERC20Capped, ERC20Burnable, ERC20Pausable {
  constructor (
    string memory _name,
    string memory _symbol,
    uint8 _decimals,
    uint256 _initialSupply,
    uint256 _cap
  )
    ERC20Detailed (_name, _symbol, _decimals)
    ERC20Capped (_cap)
    ERC20Burnable ()
    ERC20Pausable ()
    public {
    _mint(msg.sender, _initialSupply);
  }
}
