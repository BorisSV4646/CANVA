const {
  mine,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("FinalTestAll", function () {
  async function deployFixture() {
    const [deployer, otherAccount1, otherAccount2, otherAccount3] =
      await ethers.getSigners();

    const canva = await ethers.getContractFactory("CanvaToken", deployer);
    const CanvaToken = await canva.deploy(
      "CanvaToken",
      "CANVA",
      deployer.address,
      (30 * 10 ** 18).toLocaleString("fullwide", { useGrouping: false }),
      deployer.address
    );
    const finalDeployCanva = await CanvaToken.deployed(
      "CanvaToken",
      "CANVA",
      deployer.address,
      (30 * 10 ** 18).toLocaleString("fullwide", { useGrouping: false }),
      deployer.address
    );

    const blocStart = await ethers.provider.getBlock(
      finalDeployCanva.blockHash
    );

    await CanvaToken.setTargetInfo(0, [
      (310000000 * 10 ** 18).toLocaleString("fullwide", { useGrouping: false }),
      0,
      blocStart.number,
      348350,
      true,
    ]);
    await CanvaToken.setTargetInfo(1, [
      (100000000 * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
      0,
      blocStart.number,
      112350,
      true,
    ]);
    await CanvaToken.setTargetInfo(2, [
      (250000000 * 10 ** 18).toLocaleString("fullwide", { useGrouping: false }),
      0,
      blocStart.number,
      280890,
      true,
    ]);
    await CanvaToken.setTargetInfo(3, [
      (70000000 * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
      (70000000 * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
      0,
      0,
      true,
    ]);
    await CanvaToken.setTargetInfo(4, [
      (150000000 * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
      0,
      blocStart.number,
      168530,
      true,
    ]);
    await CanvaToken.setTargetInfo(5, [
      (80000000 * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
      0,
      blocStart.number,
      89880,
      true,
    ]);
    await CanvaToken.setTargetInfo(6, [
      (30000000 * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
      (30000000 * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
      0,
      0,
      true,
    ]);
    await CanvaToken.setTargetInfo(7, [
      (10000000 * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
      (10000000 * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
      0,
      0,
      true,
    ]);

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
      (8 * 10 ** 18).toLocaleString("fullwide", { useGrouping: false }),
      block.number,
      endblock,
      0,
      deployer.address,
      ReferralProgram.address
    );

    ReferralProgram.grantStakerRole(StakingPool.address);

    CanvaToken.setWhitelistAddress(StakingPool.address, true);

    ReferralProgram.setPoolAdress(StakingPool.address);

    CanvaToken.approve(
      StakingPool.address,
      (1000 * 10 ** 18).toLocaleString("fullwide", { useGrouping: false })
    );

    StakingPool.deposit(
      (500 * 10 ** 18).toLocaleString("fullwide", { useGrouping: false }),
      deployer.address
    );

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
      StakingPool,
    };
  }

  describe("Staking contract", function () {
    it("Staking send correct tokens", async function () {
      const { deployer, ReferralProgram, StakingPool, CanvaToken, BurnTokens } =
        await loadFixture(deployFixture);

      await mine(100);

      const balanceUser = await CanvaToken.balanceOf(deployer.address);
      const amountRewards = await StakingPool.pendingReward(deployer.address);
      const feeReferral = (amountRewards * 10) / 100;

      const secondDeposit = await StakingPool.deposit(
        (300 * 10 ** 18).toLocaleString("fullwide", { useGrouping: false }),
        deployer.address
      );

      const beneficiaryInfo = await ReferralProgram.beneficiaryInfo(
        deployer.address
      );

      expect(beneficiaryInfo.exists).to.equal(true);
      expect(beneficiaryInfo.numberOfReferrer).to.equal(1);
      expect(beneficiaryInfo.totalStakedReferalls).to.equal(800n * 10n ** 18n);
      const referral = beneficiaryInfo.referrels;
      expect(referral[0]).to.equal(deployer.address);
      expect(beneficiaryInfo.unclaimReward).to.equal(
        BigInt(feeReferral) + 800000000000000000n
      );
      expect(beneficiaryInfo.totalEarned).to.equal(
        BigInt(feeReferral) + 800000000000000000n
      );

      await expect(secondDeposit).to.changeTokenBalances(
        CanvaToken,
        [
          StakingPool.address,
          BurnTokens.address,
          deployer.address,
          ReferralProgram.address,
        ],
        [
          300n * 10n ** 18n,
          0,
          -(300n * 10n ** 18n) +
            BigInt(amountRewards) -
            BigInt(feeReferral) +
            7200000000000000000n,
          BigInt(feeReferral) + 800000000000000000n,
        ]
      );

      await mine(100);

      const amountRewardsNew = await StakingPool.pendingReward(
        deployer.address
      );
      const feeReferralNew = (amountRewardsNew * 10) / 100;
      const harvestRewards = await StakingPool.harvestReward();

      const beneficiaryNew = await ReferralProgram.beneficiaryInfo(
        deployer.address
      );

      expect(beneficiaryNew.totalStakedReferalls).to.equal(800n * 10n ** 18n);
      expect(beneficiaryNew.unclaimReward).to.equal(
        BigInt(feeReferral) + 800000000000000000n + 80800000000000000000n
      );
      expect(beneficiaryNew.totalEarned).to.equal(
        BigInt(feeReferral) + 800000000000000000n + 80800000000000000000n
      );

      await expect(harvestRewards).to.changeTokenBalances(
        CanvaToken,
        [
          StakingPool.address,
          BurnTokens.address,
          deployer.address,
          ReferralProgram.address,
        ],
        [0, 0, 727200000000000000000n, 80800000000000000000n]
      );

      await mine(100);

      const amountRewardsSecond = await StakingPool.pendingReward(
        deployer.address
      );
      const feeReferralSecond = (amountRewardsSecond * 10) / 100;
      const withDraw = await StakingPool.withdraw(300n * 10n ** 18n);

      await expect(withDraw).to.changeTokenBalances(
        CanvaToken,
        [
          StakingPool.address,
          BurnTokens.address,
          deployer.address,
          ReferralProgram.address,
        ],
        [
          -(300n * 10n ** 18n),
          60n * 10n ** 18n,
          240n * 10n ** 18n +
            BigInt(amountRewardsSecond) -
            BigInt(feeReferralSecond) +
            7200000000000000000n,
          BigInt(feeReferralSecond) + 800000000000000000n,
        ]
      );

      const beneficiaryInfoFinal = await ReferralProgram.beneficiaryInfo(
        deployer.address
      );

      expect(beneficiaryInfoFinal.totalStakedReferalls).to.equal(
        500n * 10n ** 18n
      );
      expect(beneficiaryInfoFinal.unclaimReward).to.equal(
        BigInt(feeReferral) +
          800000000000000000n +
          80800000000000000000n +
          BigInt(feeReferralSecond) +
          800000000000000000n
      );
      expect(beneficiaryInfoFinal.totalEarned).to.equal(
        BigInt(feeReferral) +
          800000000000000000n +
          80800000000000000000n +
          BigInt(feeReferralSecond) +
          800000000000000000n
      );

      const claimRewards = await ReferralProgram.claimRewards();

      await expect(claimRewards).to.changeTokenBalances(
        CanvaToken,
        [deployer.address, ReferralProgram.address],
        [
          BigInt(feeReferral) +
            800000000000000000n +
            80800000000000000000n +
            BigInt(feeReferralSecond) +
            800000000000000000n,
          -(
            BigInt(feeReferral) +
            800000000000000000n +
            80800000000000000000n +
            BigInt(feeReferralSecond) +
            800000000000000000n
          ),
        ]
      );

      expect(await CanvaToken.balanceOf(ReferralProgram.address)).to.equal(0);
    });
  });
});
