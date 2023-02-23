import { ethers } from "hardhat"

const main = async () => {
    console.log("\n---------- Deploying RewardToken Contract ----------")

    const RewardToken = await ethers.getContractFactory("RewardToken")
    const rewardToken = await RewardToken.deploy()
    await rewardToken.deployed()
    const RewardTokenAddress = rewardToken.address

    console.log(`RewardToken deployed at --> ${RewardTokenAddress}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
