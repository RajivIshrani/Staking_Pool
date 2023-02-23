import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-etherscan"
import "@nomicfoundation/hardhat-chai-matchers"
import "@nomicfoundation/hardhat-toolbox"
import { config as dotEnvConfig } from "dotenv"
dotEnvConfig()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY!
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY!
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY!
const BNB_API_KEY = process.env.BNB_API_KEY!
const BNB_RPC_URL = process.env.BNB_RPC_URL

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545",
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },

        mumbai: {
            url: MUMBAI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 80001,
        },

        bsc: {
            url: BNB_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 56,
        },
    },
    etherscan: {
        // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            goerli: ETHERSCAN_API_KEY,
            polygonMumbai: POLYGONSCAN_API_KEY,
            bsc: BNB_API_KEY,
        },
    },
    mocha: {
        timeout: 500000, // 500 seconds max for running tests
    },
}

export default config
