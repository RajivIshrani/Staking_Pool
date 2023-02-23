import { ethers } from "hardhat"

const main = async () => {
    console.log("\n---------- Deploying StakingToken Contract ----------")

    const StakingToken = await ethers.getContractFactory("StakingToken")
    const stakingToken = await StakingToken.deploy()
    await stakingToken.deployed()
    const StakingTokenAddress = stakingToken.address

    console.log(`StakingToken deployed at --> ${StakingTokenAddress}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
