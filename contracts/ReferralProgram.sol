// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./CanvaToken.sol";
import "./StakingPool.sol";

contract ReferralProgram is Ownable, AccessControl, ReentrancyGuard {
    using SafeERC20 for CanvaToken;

    bytes32 public constant STAKING_CONTRACT_ROLE =
        keccak256(bytes("STAKING_CONTRACT_ROLE"));

    // The reward token
    CanvaToken public rewardToken;

    // The Pool address
    StakingPool public poolCanva;

    // Referral and Beneficiary Information
    struct beneficiary {
        uint256 numberOfReferrer;
        uint256 unclaimReward;
        uint256 totalEarned;
        uint256 totalStakedReferalls;
        address[] referrels;
        bool exists;
    }

    mapping(address => beneficiary) public beneficiaries;

    mapping(address => address) private showBeneficiar;

    constructor(CanvaToken _rewardToken) {
        rewardToken = _rewardToken;
        _grantRole(DEFAULT_ADMIN_ROLE, owner());
    }

    function setPoolAdress(
        StakingPool _poolCanva
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        poolCanva = _poolCanva;
    }

    function grantStakerRole(
        address _staker
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(STAKING_CONTRACT_ROLE, _staker);
    }

    function token() public view returns (CanvaToken) {
        return rewardToken;
    }

    function beneficiaryInfo(
        address _beneficiar
    ) public view returns (beneficiary memory) {
        return beneficiaries[_beneficiar];
    }

    function showBeneficiarInfo(
        address _referral
    ) public view returns (address) {
        return showBeneficiar[_referral];
    }

    function addBeneficiary(
        address _beneficiaryAddress
    ) public onlyRole(STAKING_CONTRACT_ROLE) {
        beneficiaries[_beneficiaryAddress].exists = true;
    }

    function updateFirstDeposit(
        address _beneficiaryAddress,
        address _referall,
        uint256 _amountDeposit
    ) external onlyRole(STAKING_CONTRACT_ROLE) {
        if (beneficiaries[_beneficiaryAddress].exists) {
            showBeneficiar[_referall] = _beneficiaryAddress;
            beneficiaries[_beneficiaryAddress].numberOfReferrer += 1;
            beneficiaries[_beneficiaryAddress].referrels.push(_referall);
            beneficiaries[_beneficiaryAddress]
                .totalStakedReferalls += _amountDeposit;
        } else {
            addBeneficiary(_beneficiaryAddress);
            showBeneficiar[_referall] = _beneficiaryAddress;
            beneficiaries[_beneficiaryAddress].numberOfReferrer += 1;
            beneficiaries[_beneficiaryAddress].referrels.push(_referall);
            beneficiaries[_beneficiaryAddress]
                .totalStakedReferalls += _amountDeposit;
        }
    }

    function updateNexttDeposit(
        address _beneficiaryAddress,
        uint256 _amountDeposit,
        uint256 _amountReward
    ) external onlyRole(STAKING_CONTRACT_ROLE) {
        beneficiaries[_beneficiaryAddress].unclaimReward += _amountReward;
        beneficiaries[_beneficiaryAddress].totalEarned += _amountReward;
        beneficiaries[_beneficiaryAddress]
            .totalStakedReferalls += _amountDeposit;
    }

    function updateInfoHarvest(
        address _beneficiaryAddress,
        uint256 _amountReward
    ) external onlyRole(STAKING_CONTRACT_ROLE) {
        beneficiaries[_beneficiaryAddress].unclaimReward += _amountReward;
        beneficiaries[_beneficiaryAddress].totalEarned += _amountReward;
    }

    function updateInfoWithdraw(
        address _beneficiaryAddress,
        uint256 _amountWithdraw,
        uint256 _amountReward
    ) external onlyRole(STAKING_CONTRACT_ROLE) {
        beneficiaries[_beneficiaryAddress].unclaimReward += _amountReward;
        beneficiaries[_beneficiaryAddress].totalEarned += _amountReward;
        beneficiaries[_beneficiaryAddress]
            .totalStakedReferalls -= _amountWithdraw;
    }

    function claimRewards() external nonReentrant {
        require(
            beneficiaries[msg.sender].exists,
            "ReferralProgram: beneficiar not register"
        );
        require(
            beneficiaries[msg.sender].unclaimReward > 0,
            "ReferralProgram: not reward for claim"
        );

        uint256 amount = beneficiaries[msg.sender].unclaimReward;

        beneficiaries[msg.sender].unclaimReward = 0;

        rewardToken.safeTransfer(address(msg.sender), amount);
    }
}
