// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC20Permit.sol";


contract DFYNToken is ERC20Permit, ERC20Burnable, Ownable {
    constructor(address _owner) public ERC20("DFYN Token", "DFYN") EIP712("DFYN Token", "1") {
        _mint(_owner, 2.5e8 ether);
        transferOwnership(_owner);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
