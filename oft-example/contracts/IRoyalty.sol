// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.22;

interface IRoyalty {
    // --------- UTILITY FUNCTIONS ------------
    function isStaker(address _address) external view returns (bool);

    // ----------- STAKING ACTIONS ------------
    function createStake(uint _amount) external;

    function removeStake(uint _amount) external;

    // Backup function in case something happens with the update rewards functions
    function emergencyUnstake(uint _amount) external;

    // ------------ REWARD ACTIONS ---------------
    function getRewards() external;

    function updateAddressRewardsBalance(
        address _address
    ) external returns (uint);

    function updateBigRewardsPerToken() external;

    function userPendingRewards(address _address) external view returns (uint);

    // ------------ ADMIN ACTIONS ---------------
    function withdrawRewards(uint _amount) external;

    function depositRewards(uint _amount) external;

    function setDailyEmissions(uint _amount) external;

    function pause() external;

    function unpause() external;

    function vote() external;

    // ------------ VIEW FUNCTIONS ---------------
    function timeSinceLastReward() external view returns (uint);

    function rewardsBalance() external view returns (uint);

    function addressStakedBalance(
        address _address
    ) external view returns (uint);

    function addressWeigthStakedBalance(
        address _address
    ) external view returns (uint256);

    function showStakingToken() external view returns (address);

    function showRewardToken() external view returns (address);

    function showBigRewardsPerToken() external view returns (uint);

    function showBigUserRewardsCollected() external view returns (uint);

    function showLockTimeRemaining(
        address _address
    ) external view returns (uint256);
}
