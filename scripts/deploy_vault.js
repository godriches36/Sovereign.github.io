const { ethers } = require("hardhat");

async function main() {
  const SovereignVault = await ethers.getContractFactory("SovereignVault");
  const vault = await SovereignVault.deploy();
  await vault.deployed();
  console.log("XER Global Standard Deployed to:", vault.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
