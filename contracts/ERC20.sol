// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract FitLab is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    /// Minter
    address public minter;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC20_init("FitLabToken", "FLB");
        __ERC20Burnable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();

        /// init minter
        updateMinter(_msgSender());
    }

    function mint(address to, uint256 amount) public onlyMinterOrOwner {
        _mint(to, amount);
    }

    function updateMinter(address to) public onlyMinterOrOwner {
        minter = to;
    }

    modifier onlyMinterOrOwner() {
        require(_msgSender() == minter || _msgSender() == owner(), "caller is not minter or owner");
        _;
    }


    function _authorizeUpgrade(address newImplementation)
    internal
    onlyOwner
    override
    {}
}