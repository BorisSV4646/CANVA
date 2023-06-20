async function deployFixture() {
  const [deployer, otherAccount1, otherAccount2, otherAccount3] =
    await ethers.getSigners();

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

  const burn = await ethers.getContractFactory("BurnTokens", deployer);
  const BurnTokens = await burn.deploy(CanvaToken.address);
  await BurnTokens.deployed(CanvaToken.address);

  await CanvaToken.setBurnAddress(BurnTokens.address);
  await CanvaToken.grantBurnRole(BurnTokens.address);

  const factory = await ethers.getContractFactory("StakingFactory", deployer);
  const StakingFactory = await factory.deploy();
  const finalDeploy = await StakingFactory.deployed();

  const referral = await ethers.getContractFactory("ReferralProgram", deployer);
  const ReferralProgram = await referral.deploy(CanvaToken.address);
  await ReferralProgram.deployed(CanvaToken.address);

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

  ReferralProgram.grantStakerRole(addressPool);

  CanvaToken.setWhitelistAddress(addressPool, true);

  CanvaToken.transfer(BurnTokens.address, 1000);

  return {
    deployer,
    otherAccount1,
    otherAccount2,
    otherAccount3,
    BurnTokens,
    CanvaToken,
    StakingFactory,
    ReferralProgram,
    blocStart,
    addressPool,
  };
}

module.exports = { deployFixture };
