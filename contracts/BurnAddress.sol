// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CanvaToken.sol";

/**
 * @title Contract for storing and burning tokens
 */
contract BurnTokens is Ownable {
    // contract addresses that can burn tokens
    mapping(address => bool) public whitelist;

    // how many tokens already burned
    uint public burnedAmount;

    CanvaToken _burnToken;

    modifier onlyOwnerAndWhitelist() {
        require(
            whitelist[msg.sender] || msg.sender == owner(),
            "BurnTokens: you don't have rights"
        );
        _;
    }

    /**
     * @notice Sets whitelist address which can accrue interest
     * @param _targetAddress address to whitelist
     * @param _isWhitelisted whether address is allowed to accrue interest
     */
    function setWhitelistAddress(
        address _targetAddress,
        bool _isWhitelisted
    ) public onlyOwner {
        whitelist[_targetAddress] = _isWhitelisted;
    }

    /**
     * @notice function for burning tokens that are stored on the contract
     * @param _amount number of tokens
     */
    function burn(uint256 _amount) external onlyOwnerAndWhitelist {
        burnedAmount += _amount;
        _burnToken._burn(address(this), _amount);
    }

    /**
     * @notice function for moving tokens that are stored on the contract
     * @param _amount number of tokens
     * @param _to to whom to transfer tokens
     */
    function tracnsfer(
        address _to,
        uint256 _amount
    ) external onlyOwnerAndWhitelist {
        burnedAmount += _amount;
        _burnToken.transfer(_to, _amount);
    }
}
