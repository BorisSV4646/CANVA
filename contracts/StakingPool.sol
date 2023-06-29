// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./CanvaToken.sol";
import "./ReferralProgram.sol";

contract StakingPool is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for ERC20;
    using SafeERC20 for CanvaToken;

    // The address of the smart chef factory
    address public SMART_CHEF_FACTORY;

    // address of the ref contract
    address public referralProgramAddress;

    // address of the admin
    address private admin;

    // Whether a limit is set for users
    bool public hasUserLimit;

    // Whether it is initialized
    bool public isInitialized;

    // Accrued token per share
    uint256 public accTokenPerShare;

    // The block number when token mining ends.
    uint256 public bonusEndBlock;

    // The block number when token mining starts.
    uint256 public startBlock;

    // The block number of the last pool update
    uint256 public lastRewardBlock;

    // The pool limit (0 if none)
    uint256 public poolLimitPerUser;

    // reward tokens created per block.
    uint256 public rewardPerBlock;

    // The precision factor
    uint256 public PRECISION_FACTOR;

    // The reward token
    CanvaToken public rewardToken;

    // The staked token
    ERC20 public stakedToken;

    // Period in seconds with increased fee on unstake
    uint256 public increasedFeePeriod = 40 days;

    // Early unstake fee (when increasedFeePeriod is not passed) is 20% by default. 1000000 = 100%.
    uint256 public earlyUnstakeFee = 200000;

    // Unstake fee (when increasedFeePeriod is passed) is 1% by default. 1000000 = 100%.
    uint256 public unstakeFee = 10000;

    // Harvest fee is 3% by default. 1000000 = 100%.
    uint256 public harvestFee = 30000;

    // Referal fee is 7% by default. 1000000 = 100%.
    uint256 public referalFee = 70000;

    // Fee precision
    uint256 constant FEE_PRECISION = 1000000;

    // Info of each user that stakes tokens (stakedToken)
    mapping(address => UserInfo) public userInfo;

    struct UserInfo {
        uint256 amount; // How many staked tokens the user has provided
        uint256 rewardDebt; // Reward debt
        uint256 lastDepositedAt; // Timestamp when last deposit was performed
    }

    event AdminTokenRecovery(address tokenRecovered, uint256 amount);
    event Deposit(address indexed user, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 amount);
    event NewStartAndEndBlocks(uint256 startBlock, uint256 endBlock);
    event NewRewardPerBlock(uint256 rewardPerBlock);
    event NewPoolLimit(uint256 poolLimitPerUser);
    event RewardsStop(uint256 blockNumber);
    event Withdraw(address indexed user, uint256 amount);

    constructor() {
        SMART_CHEF_FACTORY = msg.sender;
    }

    /**
     * @notice Initialize the contract
     * @param _stakedToken: staked token address
     * @param _rewardToken: reward token address
     * @param _rewardPerBlock: reward per block (in rewardToken)
     * @param _startBlock: start block
     * @param _bonusEndBlock: end block
     * @param _poolLimitPerUser: pool limit per user in stakedToken (if any, else 0)
     * @param _admin: admin address with ownership
     * @param _referralProgramAddress address of the referral program
     **/
    function initialize(
        ERC20 _stakedToken,
        CanvaToken _rewardToken,
        uint256 _rewardPerBlock,
        uint256 _startBlock,
        uint256 _bonusEndBlock,
        uint256 _poolLimitPerUser,
        address _admin,
        address _referralProgramAddress
    ) external {
        require(!isInitialized, "Already initialized");
        require(msg.sender == SMART_CHEF_FACTORY, "Not factory");

        _rewardToken.approve(_referralProgramAddress, 17500000);

        // Make this contract initialized
        isInitialized = true;

        stakedToken = _stakedToken;
        rewardToken = _rewardToken;
        rewardPerBlock = _rewardPerBlock;
        startBlock = _startBlock;
        bonusEndBlock = _bonusEndBlock;
        referralProgramAddress = _referralProgramAddress;

        if (_poolLimitPerUser > 0) {
            hasUserLimit = true;
            poolLimitPerUser = _poolLimitPerUser;
        }

        uint256 decimalsRewardToken = uint256(rewardToken.decimals());
        require(decimalsRewardToken < 30, "Must be inferior to 30");

        PRECISION_FACTOR = uint256(
            10 ** (uint256(30).sub(decimalsRewardToken))
        );

        // Set the lastRewardBlock as the startBlock
        lastRewardBlock = startBlock;

        admin = _admin;

        // Transfer ownership to the admin address who becomes owner of the contract
        transferOwnership(_admin);
    }

    /*
     * @notice Deposit staked tokens and collect reward tokens (if any)
     * @param _amount: amount to withdraw (in rewardToken)
     */
    //!need approve from user
    function deposit(
        uint256 _amount,
        address _recipient
    ) external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];

        address recipient;

        if (_recipient == address(0)) {
            recipient = admin;
        } else {
            recipient = _recipient;
        }

        if (hasUserLimit) {
            require(
                _amount.add(user.amount) <= poolLimitPerUser,
                "User amount above limit"
            );
        }

        _updatePool();

        // harvest rewards
        if (user.amount > 0) {
            uint256 pending = user
                .amount
                .mul(accTokenPerShare)
                .div(PRECISION_FACTOR)
                .sub(user.rewardDebt);
            if (pending > 0) {
                // calculate fee
                uint256 feeAmount = pending.mul(harvestFee).div(FEE_PRECISION);
                // calculate reef reward
                uint256 reefReward = pending.mul(referalFee).div(FEE_PRECISION);
                // send fees to burn address
                rewardToken.safeTransfer(rewardToken.burnAddress(), feeAmount);
                // send rewards to user
                rewardToken.safeTransfer(
                    address(msg.sender),
                    pending.sub(feeAmount).sub(reefReward)
                );
                // update referal info
                ReferralProgram(referralProgramAddress).updateNexttDeposit(
                    recipient,
                    _amount,
                    reefReward
                );
            }
        } else {
            // set referal info
            ReferralProgram(referralProgramAddress).updateFirstDeposit(
                recipient,
                msg.sender,
                _amount
            );
        }

        // deposit
        if (_amount > 0) {
            user.amount = user.amount.add(_amount);
            user.lastDepositedAt = block.timestamp;
            stakedToken.safeTransferFrom(
                address(msg.sender),
                address(this),
                _amount
            );
        }

        user.rewardDebt = user.amount.mul(accTokenPerShare).div(
            PRECISION_FACTOR
        );

        emit Deposit(msg.sender, _amount);
    }

    /*
     * @notice Withdraw staked tokens and collect reward tokens
     * @param _amount: amount to withdraw (in rewardToken)
     * @param _parentRefAddress parent ref address
     */
    function withdraw(uint256 _amount) external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];
        require(user.amount >= _amount, "Amount to withdraw too high");

        address recipient = ReferralProgram(referralProgramAddress)
            .showBeneficiarInfo(msg.sender);

        _updatePool();

        uint256 pending = user
            .amount
            .mul(accTokenPerShare)
            .div(PRECISION_FACTOR)
            .sub(user.rewardDebt);

        // withdraw
        if (_amount > 0) {
            user.amount = user.amount.sub(_amount);
            // calculate fee
            uint256 feeRate = block.timestamp - user.lastDepositedAt >=
                increasedFeePeriod
                ? unstakeFee
                : earlyUnstakeFee;
            uint256 feeAmount = _amount.mul(feeRate).div(FEE_PRECISION);
            // send fees to burn address
            stakedToken.safeTransfer(rewardToken.burnAddress(), feeAmount);
            // send withdraw sum to user
            stakedToken.safeTransfer(
                address(msg.sender),
                _amount.sub(feeAmount)
            );
        }

        // harvest rewards
        if (pending > 0) {
            // calculate fee
            uint256 feeAmount = pending.mul(harvestFee).div(FEE_PRECISION);
            // calculate reef reward
            uint256 reefReward = pending.mul(referalFee).div(FEE_PRECISION);
            // send fees to burn address
            rewardToken.safeTransfer(rewardToken.burnAddress(), feeAmount);
            // send rewards to user
            rewardToken.safeTransfer(
                address(msg.sender),
                pending.sub(feeAmount).sub(reefReward)
            );
        }

        // update referal info
        ReferralProgram(referralProgramAddress).updateInfoWithdraw(
            recipient,
            _amount,
            pending
        );

        user.rewardDebt = user.amount.mul(accTokenPerShare).div(
            PRECISION_FACTOR
        );

        emit Withdraw(msg.sender, _amount);
    }

    /*
     * @notice Withdraw staked tokens without caring about rewards rewards
     * @dev Needs to be for emergency.
     */
    function emergencyWithdraw() external nonReentrant {
        address recipient = ReferralProgram(referralProgramAddress)
            .showBeneficiarInfo(msg.sender);

        UserInfo storage user = userInfo[msg.sender];
        uint256 amountToTransfer = user.amount;
        user.amount = 0;
        user.rewardDebt = 0;

        if (amountToTransfer > 0) {
            stakedToken.safeTransfer(address(msg.sender), amountToTransfer);
        }

        // update referal info
        ReferralProgram(referralProgramAddress).updateInfoWithdraw(
            recipient,
            amountToTransfer,
            0
        );

        emit EmergencyWithdraw(msg.sender, amountToTransfer);
    }

    /*
     * @notice Stop rewards
     * @dev Only callable by owner. Needs to be for emergency.
     */
    function emergencyRewardWithdraw(uint256 _amount) external onlyOwner {
        rewardToken.safeTransfer(address(msg.sender), _amount);
    }

    /**
     * @notice It allows the admin to recover wrong tokens sent to the contract
     * @param _tokenAddress: the address of the token to withdraw
     * @param _tokenAmount: the number of tokens to withdraw
     * @dev This function is only callable by admin.
     */
    function recoverWrongTokens(
        address _tokenAddress,
        uint256 _tokenAmount
    ) external onlyOwner {
        require(
            _tokenAddress != address(stakedToken),
            "Cannot be staked token"
        );
        require(
            _tokenAddress != address(rewardToken),
            "Cannot be reward token"
        );

        ERC20(_tokenAddress).safeTransfer(address(msg.sender), _tokenAmount);

        emit AdminTokenRecovery(_tokenAddress, _tokenAmount);
    }

    /*
     * @notice Stop rewards
     * @dev Only callable by owner
     * @param _newBonusEndBlock: a new end block after being paused
     * @param _pause: if you need a pause, then it is true, if you remove it from the pause, then it is false
     */
    function pauseReward(
        uint256 _newBonusEndBlock,
        bool _pause
    ) external onlyOwner {
        if (_pause) {
            bonusEndBlock = block.number;
        } else {
            bonusEndBlock = _newBonusEndBlock;
        }
    }

    /*
     * @notice Update pool limit per user
     * @dev Only callable by owner.
     * @param _hasUserLimit: whether the limit remains forced
     * @param _poolLimitPerUser: new pool limit per user
     */
    function updatePoolLimitPerUser(
        bool _hasUserLimit,
        uint256 _poolLimitPerUser
    ) external onlyOwner {
        require(hasUserLimit, "Must be set");
        if (_hasUserLimit) {
            require(
                _poolLimitPerUser > poolLimitPerUser,
                "New limit must be higher"
            );
            poolLimitPerUser = _poolLimitPerUser;
        } else {
            hasUserLimit = _hasUserLimit;
            poolLimitPerUser = 0;
        }
        emit NewPoolLimit(poolLimitPerUser);
    }

    /*
     * @notice Update reward per block
     * @dev Only callable by owner.
     * @param _rewardPerBlock: the reward per block
     */
    function updateRewardPerBlock(uint256 _rewardPerBlock) external onlyOwner {
        _updatePool();

        rewardPerBlock = _rewardPerBlock;
        emit NewRewardPerBlock(_rewardPerBlock);
    }

    /**
     * @notice It allows the admin to update start and end blocks
     * @dev This function is only callable by owner.
     * @param _startBlock: the new start block
     * @param _bonusEndBlock: the new end block
     */
    function updateStartAndEndBlocks(
        uint256 _startBlock,
        uint256 _bonusEndBlock
    ) external onlyOwner {
        require(block.number < startBlock, "Pool has started");
        require(
            _startBlock < _bonusEndBlock,
            "New startBlock must be lower than new endBlock"
        );
        require(
            block.number < _startBlock,
            "New startBlock must be higher than current block"
        );

        startBlock = _startBlock;
        bonusEndBlock = _bonusEndBlock;

        // Set the lastRewardBlock as the startBlock
        lastRewardBlock = startBlock;

        emit NewStartAndEndBlocks(_startBlock, _bonusEndBlock);
    }

    /**
     * @notice Updates fees
     * @param _increasedFeePeriod period in seconds with increased unstake fee
     * @param _earlyUnstakeFee early unstake fee when "increasedFeePeriod" is not passed, 1000000 = 100%
     * @param _unstakeFee unstake fee when "increasedFeePeriod" is passed, 1000000 = 100%
     * @param _harvestFee harvest fee, 1000000 = 100%
     */
    function updateFees(
        uint256 _increasedFeePeriod,
        uint256 _earlyUnstakeFee,
        uint256 _unstakeFee,
        uint256 _harvestFee
    ) external onlyOwner {
        increasedFeePeriod = _increasedFeePeriod;
        earlyUnstakeFee = _earlyUnstakeFee;
        unstakeFee = _unstakeFee;
        harvestFee = _harvestFee;
    }

    /*
     * @notice View function to see pending reward on frontend.
     * @param _user: user address
     * @return Pending reward for a given user
     */
    function pendingReward(address _user) public view returns (uint256) {
        UserInfo storage user = userInfo[_user];
        uint256 stakedTokenSupply = stakedToken.balanceOf(address(this));
        if (block.number > lastRewardBlock && stakedTokenSupply != 0) {
            uint256 multiplier = _getMultiplier(lastRewardBlock, block.number);
            uint256 tokenReward = multiplier.mul(rewardPerBlock);
            uint256 adjustedTokenPerShare = accTokenPerShare.add(
                tokenReward.mul(PRECISION_FACTOR).div(stakedTokenSupply)
            );
            return
                user
                    .amount
                    .mul(adjustedTokenPerShare)
                    .div(PRECISION_FACTOR)
                    .sub(user.rewardDebt);
        } else {
            return
                user.amount.mul(accTokenPerShare).div(PRECISION_FACTOR).sub(
                    user.rewardDebt
                );
        }
    }

    /*
     * @notice The function of collecting rewards for staking
     */
    function harvestReward() external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];

        require(user.amount > 0, "StakingPool: not rewards");

        address recipient = ReferralProgram(referralProgramAddress)
            .showBeneficiarInfo(msg.sender);

        _updatePool();

        uint256 amountReward = user
            .amount
            .mul(accTokenPerShare)
            .div(PRECISION_FACTOR)
            .sub(user.rewardDebt);

        if (amountReward > 0) {
            // calculate fee
            uint256 feeAmount = amountReward.mul(harvestFee).div(FEE_PRECISION);
            // calculate reef reward
            uint256 reefReward = amountReward.mul(referalFee).div(
                FEE_PRECISION
            );
            // send fees to burn address
            rewardToken.safeTransfer(rewardToken.burnAddress(), feeAmount);
            // send rewards to user
            rewardToken.safeTransfer(
                address(msg.sender),
                amountReward.sub(feeAmount).sub(reefReward)
            );
        }

        // update referal info
        ReferralProgram(referralProgramAddress).updateInfoHarvest(
            recipient,
            amountReward
        );

        user.rewardDebt = user.amount.mul(accTokenPerShare).div(
            PRECISION_FACTOR
        );
    }

    /*
     * @notice Update reward variables of the given pool to be up-to-date.
     */
    function _updatePool() internal {
        if (block.number <= lastRewardBlock) {
            return;
        }

        uint256 stakedTokenSupply = stakedToken.balanceOf(address(this));

        if (stakedTokenSupply == 0) {
            lastRewardBlock = block.number;
            return;
        }

        uint256 multiplier = _getMultiplier(lastRewardBlock, block.number);
        uint256 tokenReward = multiplier.mul(rewardPerBlock);
        rewardToken.mintByContract(
            address(this),
            tokenReward,
            CanvaToken.Target.STAKING
        );
        accTokenPerShare = accTokenPerShare.add(
            tokenReward.mul(PRECISION_FACTOR).div(stakedTokenSupply)
        );
        lastRewardBlock = block.number;
    }

    /*
     * @notice Return reward multiplier over the given _from to _to block.
     * @param _from: block to start
     * @param _to: block to finish
     */
    function _getMultiplier(
        uint256 _from,
        uint256 _to
    ) internal view returns (uint256) {
        if (_to <= bonusEndBlock) {
            return _to.sub(_from);
        } else if (_from >= bonusEndBlock) {
            return 0;
        } else {
            return bonusEndBlock.sub(_from);
        }
    }
}
