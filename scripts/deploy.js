const { ethers } = require("hardhat");

async function main() {
  const EtherStore = await hre.ethers.getContractFactory("EtherStore");
  const etherStoreContract = await EtherStore.deploy({
    value: ethers.utils.parseUnits("25", "ether"),
  });

  await etherStoreContract.deployed();

  const Attack = await hre.ethers.getContractFactory("Attack");
  const attackContract = await Attack.deploy(etherStoreContract.address);

  await attackContract.deployed();

  console.log("EtherStore Contract deployed to:", etherStoreContract.address);
  console.log("Attack Contract deployed to:", attackContract.address);
}

main();