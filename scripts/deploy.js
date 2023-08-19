const hre = require("hardhat");

async function main() {

  const Tracking = await hre.ethers.deployContract("Tracking");

  await Tracking.waitForDeployment();

  console.log(
    `Tracking deployed to ${Tracking.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});