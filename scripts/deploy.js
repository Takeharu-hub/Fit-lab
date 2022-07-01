require('dotenv').config()
const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    /// deploy
    const Contract = await ethers.getContractFactory("FitLab");
    const contract = await upgrades.deployProxy(Contract, [], { initializer: 'initialize()', kind: 'uups'});
    await contract.deployed();
    console.log(contract.address);
}

main();
