require('dotenv').config()
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
const privateKey = process.env.PRIVATE_KEY
const polygonMumbai = process.env.POLYGON_MUMBAI
const polygonMainnet = process.env.POLYGON_MAINNET
const polygonScanAPIKey = process.env.POLYGON_SCAN_API_KEY

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.4",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: polygonMumbai,
      accounts: [privateKey],
      gasPrice: 65000000000
    },
    mainnet: {
      url: polygonMainnet,
      accounts: [privateKey]
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: polygonScanAPIKey
    }
  },
};
