require('dotenv').config()
const { ethers } = require("hardhat");

async function main() {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    // const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
    const mintAmount = '1';
    const mintAmountWei = ethers.utils.parseEther(mintAmount);
    const [minter] = await ethers.getSigners();
    const toAddress = minter.address;
    console.log(toAddress);
    console.log(mintAmountWei);
    // const toAddress = "";
    const Contract = await ethers.getContractFactory("FitLab");
    const contract = await Contract.attach(contractAddress);
    console.log(contract.address);

    const Tx = await contract.mint(toAddress, mintAmountWei);
    await Tx.wait();
}

main();