
const hre = require("hardhat");

async function main() {
  const Tracking = await hre.ethers.deployContract("Track");

  await Tracking.waitForDeployment();


  console.log(
   `Tracking the   ${Tracking.target}`
  );
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
