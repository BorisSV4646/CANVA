const {
  mine,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("StakingPool", function () {
  async function deployFixture() {
    const [deployer, otherAccount1, otherAccount2] = await ethers.getSigners();

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

    const blocStart = await ethers.provider.getBlock(
      finalDeployCanva.blockHash
    );

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

    const referral = await ethers.getContractFactory(
      "ReferralProgram",
      deployer
    );
    const ReferralProgram = await referral.deploy(CanvaToken.address);
    await ReferralProgram.deployed(CanvaToken.address);

    const block = await ethers.provider.getBlock(finalDeploy.blockHash);
    const endblock = block.number + (365 * 24 * 60 * 60) / 12;

    const pool = await ethers.getContractFactory("StakingPool", deployer);
    const StakingPool = await pool.deploy();
    await StakingPool.deployed();

    await StakingPool.initialize(
      CanvaToken.address,
      CanvaToken.address,
      8,
      block.number,
      endblock,
      0,
      deployer.address,
      ReferralProgram.address
    );

    ReferralProgram.grantStakerRole(StakingPool.address);

    CanvaToken.setWhitelistAddress(StakingPool.address, true);

    return {
      deployer,
      BurnTokens,
      CanvaToken,
      StakingFactory,
      ReferralProgram,
      otherAccount1,
      otherAccount2,
      StakingPool,
      block,
      endblock,
    };
  }

  describe("Initialization contract", async function () {
    it("After the deployment of the contract, all sets", async function () {
      const {
        deployer,
        ReferralProgram,
        StakingPool,
        CanvaToken,
        block,
        endblock,
      } = await loadFixture(deployFixture);

      expect(await StakingPool.SMART_CHEF_FACTORY()).to.equal(deployer.address);
      expect(
        await CanvaToken.allowance(StakingPool.address, ReferralProgram.address)
      ).to.equal(17500000);

      expect(await StakingPool.isInitialized()).to.equal(true);
      expect(await StakingPool.stakedToken()).to.equal(CanvaToken.address);
      expect(await StakingPool.rewardToken()).to.equal(CanvaToken.address);
      expect(await StakingPool.rewardPerBlock()).to.equal(8);
      expect(await StakingPool.startBlock()).to.equal(block.number);
      expect(await StakingPool.bonusEndBlock()).to.equal(endblock);
      expect(await StakingPool.referralProgramAddress()).to.equal(
        ReferralProgram.address
      );
      expect(await StakingPool.poolLimitPerUser()).to.equal(0);
      expect(await StakingPool.PRECISION_FACTOR()).to.equal(10 ** 12);
      expect(await StakingPool.lastRewardBlock()).to.equal(block.number);
      expect(await StakingPool.owner()).to.equal(deployer.address);
    });

    it("You cannot initialize the pool again", async function () {
      const {
        deployer,
        ReferralProgram,
        StakingPool,
        CanvaToken,
        block,
        endblock,
      } = await loadFixture(deployFixture);

      await expect(
        StakingPool.initialize(
          CanvaToken.address,
          CanvaToken.address,
          12,
          block.number,
          endblock,
          10000,
          deployer.address,
          ReferralProgram.address
        )
      ).to.be.revertedWith("Already initialized");
    });
  });

  describe("Function deposit()", async function () {
    it("UpdatePool() work correctly", async function () {
      const { deployer, StakingPool, CanvaToken, otherAccount1 } =
        await loadFixture(deployFixture);

      await mine(100);

      CanvaToken.approve(StakingPool.address, 100);

      const update = await StakingPool.deposit(100, deployer.address);

      const block = await ethers.provider.getBlock(update.blockHash);
      expect(await StakingPool.lastRewardBlock()).to.equal(block.number);
      expect(await StakingPool.accTokenPerShare()).to.equal(0);

      await expect(update).to.changeTokenBalances(
        CanvaToken,
        [deployer.address, StakingPool.address],
        [-100, 100]
      );

      CanvaToken.transfer(otherAccount1.address, 199);

      const newUserCanva = await CanvaToken.connect(otherAccount1);

      newUserCanva.approve(StakingPool.address, 199);

      const newUserStaking = await StakingPool.connect(otherAccount1);

      const update2 = await newUserStaking.deposit(199, deployer.address);

      const block2 = await ethers.provider.getBlock(update2.blockHash);

      const reward = (block2.number - block.number) * 8;
      const accTokenPerShare = 0 + (reward * 10 ** 12) / 100;
      expect(await StakingPool.lastRewardBlock()).to.equal(block2.number);
      expect(await StakingPool.accTokenPerShare()).to.equal(accTokenPerShare);

      await expect(update2).to.changeTokenBalances(
        CanvaToken,
        [otherAccount1.address, StakingPool.address],
        [-199, 199 + reward]
      );

      CanvaToken.approve(StakingPool.address, 100);

      const update3 = await StakingPool.deposit(100, deployer.address);
      const block3 = await ethers.provider.getBlock(update3.blockHash);

      const rewardNew = (block3.number - block2.number) * 8;
      const accTokenPerShareNew =
        accTokenPerShare + (rewardNew * 10 ** 12) / 299;
      const rewardDebt = (200 * accTokenPerShareNew) / 10 ** 12;
      const user = await StakingPool.userInfo(deployer.address);
      expect(user.rewardDebt).to.equal(Math.floor(rewardDebt - 1));
    });

    it("User information is updated", async function () {
      const { deployer, StakingPool, CanvaToken, otherAccount1 } =
        await loadFixture(deployFixture);

      await mine(100);

      CanvaToken.approve(StakingPool.address, 100);
      const update = await StakingPool.deposit(100, deployer.address);

      await expect(update)
        .to.emit(StakingPool, "Deposit")
        .withArgs(deployer.address, 100);

      const block = await ethers.provider.getBlock(update.blockHash);

      const user = await StakingPool.userInfo(deployer.address);

      expect(user.amount).to.equal(100);
      expect(user.lastDepositedAt).to.equal(block.timestamp);
      expect(user.rewardDebt).to.equal(0);
    });

    it("Referral information is updated", async function () {
      const {
        deployer,
        StakingPool,
        CanvaToken,
        otherAccount1,
        ReferralProgram,
      } = await loadFixture(deployFixture);

      await mine(100);

      CanvaToken.approve(StakingPool.address, 100);
      const update = await StakingPool.deposit(100, deployer.address);

      expect(
        await ReferralProgram.showBeneficiarInfo(deployer.address)
      ).to.equal(deployer.address);

      const beneficiaryInfo = await ReferralProgram.beneficiaryInfo(
        deployer.address
      );

      expect(beneficiaryInfo.exists).to.equal(true);
      expect(beneficiaryInfo.numberOfReferrer).to.equal(1);
      expect(beneficiaryInfo.totalStakedReferalls).to.equal(100);
      const referral = beneficiaryInfo.referrels;
      expect(referral[0]).to.equal(deployer.address);

      CanvaToken.approve(StakingPool.address, 100);
      const update2 = await StakingPool.deposit(100, deployer.address);

      const beneficiaryInfo2 = await ReferralProgram.beneficiaryInfo(
        deployer.address
      );

      expect(beneficiaryInfo2.unclaimReward).to.equal(1);
      expect(beneficiaryInfo2.totalEarned).to.equal(1);
      expect(beneficiaryInfo2.totalStakedReferalls).to.equal(200);
    });

    it("Harvest work correct", async function () {
      const { deployer, StakingPool, CanvaToken, BurnTokens } =
        await loadFixture(deployFixture);

      await mine(100);

      CanvaToken.approve(StakingPool.address, 100);
      const update = await StakingPool.deposit(100, deployer.address);

      CanvaToken.approve(StakingPool.address, 100);
      const update2 = await StakingPool.deposit(100, deployer.address);

      const accTokenPerShare = await StakingPool.accTokenPerShare();
      const reward = (100 * accTokenPerShare) / 10 ** 12 - 0;
      const feeBurn = (reward * 30000) / 1000000;
      const feeReff = (reward * 70000) / 1000000;
      await expect(update2).to.changeTokenBalances(
        CanvaToken,
        [deployer.address, StakingPool.address, BurnTokens.address],
        [
          -100 + reward - Math.floor(feeReff) - Math.floor(feeBurn),
          100 + Math.floor(feeReff),
          Math.floor(feeBurn),
        ]
      );
    });
  });

  describe("Function withdraw()", async function () {
    it("User information is updated", async function () {
      const { deployer, StakingPool, CanvaToken, otherAccount1 } =
        await loadFixture(deployFixture);
    });
  });
});
