const { ethers } = require("ethers")
const abi = require("../artifacts/contracts/Staking/StakingPool.sol/StakingPool.json")

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL
const provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC_URL)

const address = "0xB61DE8833255d4f507BBd21269B1ce5a393Cf205" //Dai Address
const contract = new ethers.Contract(address, abi.abi, provider)
const userAddress = "0x1d38649F181889BF189926862784b89dFb5414F3"

const main = async () => {
    const PRECISION_CONSTANT = await contract.PRECISION_CONSTANT()
    console.log(PRECISION_CONSTANT.toString())

    let positionIndex = 0
    const getReward = await contract
        .connect(userAddress)
        .getReward(positionIndex)

    console.log(getReward.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
