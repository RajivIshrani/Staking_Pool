//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract StakingPool is Ownable, Pausable, ReentrancyGuard {
    IERC20 public immutable stakingToken; //stakingToken
    IERC20 public immutable rewardToken; //rewardToken

    uint256 public minDuration = 172800; // 2Days * 24hours * 60min * 60sec

    // Annual reward percentage
    uint256 public rewardPercentage = 2000; //20%

    uint256 public constant PRECISION_CONSTANT = 10000;

    uint256 public constant YEAR = 31536000; //365days * 24hours * 60min * 60sec

    struct StakePosition {
        uint256 amount;
        uint256 startTime; //starttime
        bool redeemed;
    }

    //user address to an array of their staked amounts and durations
    mapping(address => StakePosition[]) public stakes;

    event Staked(
        address indexed _user,
        uint256 indexed _amount,
        uint256 _timestamp
    );

    event RewardsClaimed(
        address indexed _user,
        uint256 _stakedAmount,
        uint256 _rewardAmount,
        uint256 _timestamp
    );

    constructor(address _stakingToken, address _rewardToken) {
        stakingToken = IERC20(_stakingToken); //RJToken
        rewardToken = IERC20(_rewardToken); //RWDToken
    }

    function stake(uint256 _amount) external whenNotPaused nonReentrant {
        require(_amount > 0, "amount cannot be 0");
        require(
            stakingToken.allowance(msg.sender, address(this)) >= _amount,
            "Staking Contract is not approved for this Token or approved amount is not equal to given amount"
        );

        // Create a new staked amount and duration for the user
        StakePosition memory newStake = StakePosition(
            _amount,
            block.timestamp,
            false
        );
        stakes[msg.sender].push(newStake);

        stakingToken.transferFrom(msg.sender, address(this), _amount);

        emit Staked(msg.sender, _amount, block.timestamp);
    }

    function Unstake(
        uint256 _positionIndex
    ) external whenNotPaused nonReentrant {
        require(_positionIndex < stakes[msg.sender].length, "Invalid position");
        require(
            stakes[msg.sender][_positionIndex].redeemed == false,
            "User already claimed rewards"
        );

        // Get the staked amount and duration for the specified position
        StakePosition memory _stake = stakes[msg.sender][_positionIndex];
        uint256 amount = _stake.amount;
        uint256 duration = block.timestamp - _stake.startTime;

        stakes[msg.sender][_positionIndex].redeemed = true;

        uint256 rewardAmount = ((amount * rewardPercentage * duration) /
            (PRECISION_CONSTANT * YEAR));

        require(duration >= minDuration, "Minimum staking duration not met");

        stakingToken.transfer(msg.sender, amount);
        rewardToken.transfer(msg.sender, rewardAmount);

        emit RewardsClaimed(msg.sender, amount, rewardAmount, block.timestamp);
    }

    function getReward(uint256 _positionIndex) public view returns (uint256) {
        require(_positionIndex < stakes[msg.sender].length, "Invalid position");
        require(
            stakes[msg.sender][_positionIndex].redeemed == false,
            "User already claimed rewards"
        );

        // Get the staked amount and duration for the specified position
        StakePosition memory getStake = stakes[msg.sender][_positionIndex];
        uint256 amount = getStake.amount;
        uint256 duration = block.timestamp - getStake.startTime;

        uint256 rewardAmount = ((amount * rewardPercentage * duration) /
            (PRECISION_CONSTANT * YEAR));

        return rewardAmount;
    }

    function getTotalStakedAmount() public view returns (uint256) {
        return stakingToken.balanceOf(address(this));
    }

    function getUsersPosition(
        address _address
    ) public view returns (StakePosition[] memory) {
        return stakes[_address];
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
