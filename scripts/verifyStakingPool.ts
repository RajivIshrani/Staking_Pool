import hre from "hardhat"
import "@nomiclabs/hardhat-etherscan"
import { config as dotEnvConfig } from "dotenv"
dotEnvConfig()

const main = async () => {
    await hre.run("verify:verify", {
        address: "address-of-your-smart-contract",
        constructorArguments: ["parameter1", "parameter2"],
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
