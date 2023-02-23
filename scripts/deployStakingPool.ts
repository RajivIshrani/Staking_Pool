import { ethers } from "hardhat"
import { StakingPool__factory, StakingPool } from "../typechain-types"

const main = async () => {
    console.log("\n---------- Deploying StakingPool Contract ----------\n")

    const StakingToken: string = ""
    const RewardToken: string = ""

    const StakingPool: StakingPool__factory = (await ethers.getContractFactory(
        "StakingPool"
    )) as StakingPool__factory
    const stakingPool: StakingPool = await StakingPool.deploy(
        StakingToken,
        RewardToken
    )
    const poolReceipt = await stakingPool.deployed()
    const poolAddress: string = stakingPool.address

    console.log(poolReceipt)

    console.log("\n-----------------------------------------------\n")

    console.log(`\nStakingPool deployed at --> ${poolAddress}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
