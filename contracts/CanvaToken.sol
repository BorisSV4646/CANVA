// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title Basic token for
 */
contract CanvaToken is ERC20, Pausable {
    // address which stores tokens that should be burned
    address public burnAddress;

    // contract addresses that can distribute tokens (IDO, DEX, YIELD FARMING, STAKING, REFERRAL)
    mapping(address => bool) public whitelist;

    // how many tokens are issued every block
    uint public tokensPerBlock;

    // how many tokens already burned
    uint public burnedAmount;

    // % denominator
    uint256 constant DENOMINATOR = 1000000;

    // for which purposes tokens can be minted
    enum Target {
        // allocated on contract deploy
        TX_FEE_MINING, // transaction fee mining (swap cashback)
        MARKETING, // marketing and community
        IDO, // initial decentralized offering
        // allocated every block
        YIELD_FARMING_AND_STAKING, // yield farming and staking
        TREASURY, // treasury
        TEAM, // team
        REFERRAL // referral program
    }

    struct TargetInfo {
        uint capAmount; // max amount of tokens to mint
        uint distributedAmount; // how many tokens already minted for this target
        uint lastHarvestedAtBlock; // when was the last harvest, 0 for fixed supply target
        uint tokensPerBlockRate; // how many tokens to issue per block, 0 for fixed supply target, 1000000 = 100%
        bool isInitialized; // whether target is initialized
    }

    // available token distribution targets
    mapping(Target => TargetInfo) public targets;

    /**
     * Contract constructor
     * @param _tokenFullName token full name
     * @param _tokenTicker token ticker name
     * @param _burnAddress address where tokens to be burned should be stored
     * @param _tokensPerBlock how many tokens are issued every block
     */
    constructor(
        string memory _tokenFullName,
        string memory _tokenTicker,
        address _burnAddress,
        uint _tokensPerBlock
    ) ERC20(_tokenFullName, _tokenTicker) {
        // assign constructor variables
        burnAddress = _burnAddress;
        tokensPerBlock = _tokensPerBlock;
    }

    //=============
    // Modifiers
    //=============

    /**
     * @notice Checks that all token distribution targets are initialized
     */
    modifier targetsInitialized() {
        require(
            targets[Target.TX_FEE_MINING].isInitialized &&
                targets[Target.MARKETING].isInitialized &&
                targets[Target.IDO].isInitialized &&
                targets[Target.YIELD_FARMING_AND_STAKING].isInitialized &&
                targets[Target.TREASURY].isInitialized &&
                targets[Target.TEAM].isInitialized &&
                targets[Target.REFERRAL].isInitialized,
            "TARGETS_NOT_INITIALIZED"
        );
        _;
    }

    //===============================
    // Whitelisted address methods
    //===============================

    /**
     * @notice Mints tokens by whitelisted contract addresses (IDO, DEX, YIELD FARMING, STAKING, REFERRAL)
     * @param _to address where to mint tokens
     * @param _amount amount of tokens to mint
     * @param _target token distribution target
     */
    function mintByContract(
        address _to,
        uint _amount,
        Target _target
    ) public targetsInitialized {
        // validation
        require(whitelist[msg.sender], "NOT_ALLOWED");
        // mint
        _mintToTarget(_to, _amount, _target);
    }

    //=================
    // Owner methods
    //=================

    /**
     * Send tokens from the burn address
     * @param _to address where tokens should be sent
     * @param _amount amount of tokens to send
     */
    function burnByOwner(address _to, uint256 _amount) public onlyOwner {
        // validation
        require(_amount <= balanceOf(burnAddress), "NOT_ENOUGH_TOKENS");
        // increase burned amount
        burnedAmount += _amount;
        // allow owner to burn tokens
        _approve(burnAddress, owner(), balanceOf(burnAddress));
        // burn tokens
        transferFrom(burnAddress, _to, _amount);
    }

    /**
     * @notice Mints tokens by owner for particular token distribution targets
     * @param _to address where to mint tokens
     * @param _amount amount of tokens to mint
     * @param _target token distribution target
     */
    function mintByOwner(
        address _to,
        uint _amount,
        Target _target
    ) public targetsInitialized onlyOwner {
        // validation
        require(
            _target == Target.MARKETING ||
                _target == Target.TEAM ||
                _target == Target.TREASURY,
            "NOT_ALLOWED_TO_MINT_BY_OWNER"
        );
        // mint
        _mintToTarget(_to, _amount, _target);
    }

    /**
     * @notice Updates burn address
     * @param _newBurnAddress updated burn address
     */
    function setBurnAddress(address _newBurnAddress) public onlyOwner {
        burnAddress = _newBurnAddress;
    }

    /**
     * @notice Updates token distribution target info
     * @param _target target index
     * @param _targetInfo target info
     */
    function setTargetInfo(
        Target _target,
        TargetInfo memory _targetInfo
    ) public onlyOwner {
        // validation
        require(!targets[_target].isInitialized, "ALREADY_INITIALIZED");
        // assignment
        targets[_target] = _targetInfo;
    }

    /**
     * @notice Updates how many tokens are issued every block
     * @param _tokensPerBlock tokens per block
     */
    function setTokensPerBlock(uint _tokensPerBlock) public onlyOwner {
        tokensPerBlock = _tokensPerBlock;
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

    //===================
    // Internal methods
    //===================

    /**
     * @notice Mints tokens
     * @param _to address where to mint tokens
     * @param _amount amount of tokens to mint
     * @param _target token distribution target
     */
    function _mintToTarget(
        address _to,
        uint _amount,
        Target _target
    ) internal whenNotPaused {
        // get target info
        TargetInfo storage targetInfo = targets[_target];

        // if amount to mint is greater than cap limit then calculate residuals
        if (targetInfo.distributedAmount + _amount > targetInfo.capAmount) {
            _amount = targetInfo.capAmount - targetInfo.distributedAmount;
        }

        // if distrubution target has continuous supply with N tokens per block
        if (targetInfo.lastHarvestedAtBlock != 0) {
            // calculate available amount to mint.
            uint amountAvailable = ((block.number -
                targetInfo.lastHarvestedAtBlock) *
                tokensPerBlock *
                targetInfo.tokensPerBlockRate) / DENOMINATOR;
            // if there are less tokens than needed then mint available
            if (amountAvailable < _amount) {
                _amount = amountAvailable;
            }
            // update last harvested block
            targetInfo.lastHarvestedAtBlock = block.number;
        }

        // update distributed amount
        targetInfo.distributedAmount += _amount;

        // mint tokens to target address
        _mint(_to, _amount);
    }
}
