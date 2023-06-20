// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./CanvaToken.sol";
import "./StakingPool.sol";

contract StakingFactory is Ownable {
    event NewSmartChefContract(address indexed smartChef);

    // all pools addresses
    address[] public allPools;

    /**
     * @notice Returns all staking pools length
     */
    function allPoolsLength() external view returns (uint) {
        return allPools.length;
    }

    /*
     * @notice Deploy the pool
     * @param _stakedToken: staked token address
     * @param _rewardToken: reward token address
     * @param _rewardPerBlock: reward per block (in rewardToken)
     * @param _startBlock: start block
     * @param _endBlock: end block
     * @param _poolLimitPerUser: pool limit per user in stakedToken (if any, else 0)
     * @param _admin: admin address with ownership
     * @param _referralProgramAddress: referral program address
     * @return address of new smart chef contract
     */
    function deployPool(
        ERC20 _stakedToken,
        CanvaToken _rewardToken,
        uint256 _rewardPerBlock,
        uint256 _startBlock,
        uint256 _bonusEndBlock,
        uint256 _poolLimitPerUser,
        address _admin,
        address _referralProgramAddress
    ) external onlyOwner {
        require(_rewardToken.totalSupply() >= 0);

        bytes memory bytecode = type(StakingPool).creationCode;
        bytes32 salt = keccak256(
            abi.encodePacked(_stakedToken, _rewardToken, _startBlock)
        );
        address smartChefAddress;

        assembly {
            smartChefAddress := create2(
                0,
                add(bytecode, 32),
                mload(bytecode),
                salt
            )
        }

        StakingPool(smartChefAddress).initialize(
            _stakedToken,
            _rewardToken,
            _rewardPerBlock,
            _startBlock,
            _bonusEndBlock,
            _poolLimitPerUser,
            _admin,
            _referralProgramAddress
        );

        allPools.push(smartChefAddress);

        emit NewSmartChefContract(smartChefAddress);
    }
}
