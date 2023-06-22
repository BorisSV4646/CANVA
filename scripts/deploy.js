const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", await deployer.address);

  const canva = await ethers.getContractFactory("CanvaToken", deployer);

  const CanvaToken = await canva.deploy(
    "CanvaToken",
    "CV",
    deployer.address,
    30,
    deployer.address
  );

  const finalDeployCanva = await CanvaToken.deployed(
    "CanvaToken",
    "CV",
    deployer.address,
    30,
    deployer.address
  );

  console.log("Token ERC20 address:", CanvaToken.address);

  const blocStart = await ethers.provider.getBlock(finalDeployCanva.blockHash);

  await CanvaToken.setTargetInfo(0, [
    310000000,
    0,
    blocStart.number,
    348350,
    true,
  ]);
  await CanvaToken.setTargetInfo(1, [
    100000000,
    0,
    blocStart.number,
    112350,
    true,
  ]);
  await CanvaToken.setTargetInfo(2, [
    250000000,
    0,
    blocStart.number,
    280890,
    true,
  ]);
  await CanvaToken.setTargetInfo(3, [70000000, 70000000, 0, 0, true]);
  await CanvaToken.setTargetInfo(4, [
    150000000,
    0,
    blocStart.number,
    168530,
    true,
  ]);
  await CanvaToken.setTargetInfo(5, [
    80000000,
    0,
    blocStart.number,
    89880,
    true,
  ]);
  await CanvaToken.setTargetInfo(6, [30000000, 30000000, 0, 0, true]);
  await CanvaToken.setTargetInfo(7, [10000000, 10000000, 0, 0, true]);

  console.log("All targets set");

  const burn = await ethers.getContractFactory("BurnTokens", deployer);

  const BurnTokens = await burn.deploy();

  await BurnTokens.deployed();

  console.log("Contract BurnTokens address:", BurnTokens.address);

  await CanvaToken.setBurnTokens(BurnTokens.address);

  console.log("BurnTokens set");

  await CanvaToken.grantBurnRole(BurnTokens.address);

  console.log("Burn_Allow role granted to:", BurnTokens.address);

  const factory = await ethers.getContractFactory("StakingFactory", deployer);

  const StakingFactory = await factory.deploy();

  const finalDeploy = await StakingFactory.deployed();

  console.log("StakingFactory address:", StakingFactory.address);

  const referral = await ethers.getContractFactory("ReferralProgram", deployer);

  const ReferralProgram = await referral.deploy(CanvaToken.address);

  await ReferralProgram.deployed(CanvaToken.address);

  console.log("ReferralProgram address:", ReferralProgram.address);

  const block = await ethers.provider.getBlock(finalDeploy.blockHash);
  const endblock = block.number + (365 * 24 * 60 * 60) / 12;

  await StakingFactory.deployPool(
    CanvaToken.address,
    CanvaToken.address,
    8,
    block.number,
    endblock,
    0,
    deployer.address,
    ReferralProgram.address
  );

  const addressPool = await StakingFactory.allPools(0);

  console.log("Pool CANVA earn CANVA address:", addressPool);

  ReferralProgram.grantStakerRole(addressPool);

  console.log("Granted roll STAKING_CONTRACT_ROLE for", addressPool);

  CanvaToken.setWhitelistAddress(addressPool, true);

  console.log("Pool add to whitelist CanvaToken");

  ReferralProgram.setPoolAdress(addressPool);

  console.log("Pool address add to ReferralProgram");

  // saveForFront({
  //   CanvaToken: CanvaToken,
  //   BurnTokens: BurnTokens,
  //   StakingFactory: StakingFactory,
  //   ReferralProgram: ReferralProgram,
  // });
}

function saveForFront(contracts) {
  const contractsDir = path.join(__dirname, "../src/contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  Object.entries(contracts).forEach((contract_item) => {
    const [name, contract] = contract_item;

    if (contract) {
      fs.writeFileSync(
        path.join(contractsDir, "/", name + "-contract-address.json"),
        JSON.stringify({ [name]: contract.address }, undefined, 2)
      );
    }

    const contractArtifact = hre.artifacts.readArtifactSync(name);

    fs.writeFileSync(
      path.join(contractsDir, "/", name + ".json"),
      JSON.stringify(contractArtifact, null, 2)
    );
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
