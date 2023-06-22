const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { deployFixture } = require("./Fixtures");

describe("ReferralProgram", function () {
  describe("Initialization contract", async function () {
    it("Checking the constructor parameters", async function () {
      const { ReferralProgram, CanvaToken } = await loadFixture(deployFixture);

      expect(await ReferralProgram.rewardToken()).to.equal(CanvaToken.address);
    });

    it("Function grantStakerRole() work", async function () {
      const { ReferralProgram, otherAccount1, otherAccount2 } =
        await loadFixture(deployFixture);

      await ReferralProgram.grantStakerRole(otherAccount1.address);

      const newUSer = ReferralProgram.connect(otherAccount1);

      await expect(
        newUSer.grantStakerRole(otherAccount2.address)
      ).to.be.revertedWith(
        "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
      );
    });

    it("Function token() work", async function () {
      const { ReferralProgram, CanvaToken } = await loadFixture(deployFixture);

      expect(await ReferralProgram.token()).to.equal(CanvaToken.address);
    });

    it("Function beneficiaryInfo() and addBeneficiary() work", async function () {
      const { ReferralProgram, addressPool, otherAccount1 } = await loadFixture(
        deployFixture
      );

      await network.provider.send("hardhat_setBalance", [
        addressPool,
        "0xde0b6b3a7640000",
      ]);

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addressPool],
      });

      const signer = await ethers.getSigner(addressPool);

      const newUSer = ReferralProgram.connect(signer);

      await newUSer.addBeneficiary(otherAccount1.address);

      const beneficiaryInfo = await ReferralProgram.beneficiaryInfo(
        otherAccount1.address
      );

      expect(beneficiaryInfo.exists).to.equal(true);
    });

    it("Function updateFirstDeposit() and showBeneficiarAddress()  work", async function () {
      const { ReferralProgram, addressPool, otherAccount1, otherAccount2 } =
        await loadFixture(deployFixture);

      await network.provider.send("hardhat_setBalance", [
        addressPool,
        "0xde0b6b3a7640000",
      ]);

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addressPool],
      });

      const signer = await ethers.getSigner(addressPool);

      const newUSer = ReferralProgram.connect(signer);

      await newUSer.updateFirstDeposit(
        otherAccount1.address,
        otherAccount2.address,
        1000
      );

      const newUSer2 = ReferralProgram.connect(otherAccount2);

      expect(await newUSer2.showBeneficiarInfo(otherAccount2.address)).to.equal(
        otherAccount1.address
      );

      const beneficiaryInfo = await ReferralProgram.beneficiaryInfo(
        otherAccount1.address
      );

      expect(beneficiaryInfo.exists).to.equal(true);
      expect(beneficiaryInfo.numberOfReferrer).to.equal(1);
      expect(beneficiaryInfo.totalStakedReferalls).to.equal(1000);
      const referral = beneficiaryInfo.referrels;
      expect(referral[0]).to.equal(otherAccount2.address);
    });
  });

  describe("Test functions updateNexttDeposit() updateInfoHarvest() updateInfoWithdraw()", async function () {
    async function deployNewFixture() {
      const {
        ReferralProgram,
        CanvaToken,
        addressPool,
        otherAccount1,
        otherAccount2,
      } = await loadFixture(deployFixture);

      await network.provider.send("hardhat_setBalance", [
        addressPool,
        "0xde0b6b3a7640000",
      ]);

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addressPool],
      });

      const signer = await ethers.getSigner(addressPool);

      const newUSer = ReferralProgram.connect(signer);

      await newUSer.updateFirstDeposit(
        otherAccount1.address,
        otherAccount2.address,
        1000
      );

      await CanvaToken.transfer(addressPool, 1000);

      return {
        newUSer,
        ReferralProgram,
        otherAccount1,
        otherAccount2,
        CanvaToken,
        addressPool,
      };
    }

    it("Function updateNexttDeposit() work", async function () {
      const { newUSer, ReferralProgram, otherAccount1 } = await loadFixture(
        deployNewFixture
      );

      await newUSer.updateNexttDeposit(otherAccount1.address, 1000, 100);

      const beneficiaryInfo = await ReferralProgram.beneficiaryInfo(
        otherAccount1.address
      );

      expect(beneficiaryInfo.totalStakedReferalls).to.equal(2000);
      expect(beneficiaryInfo.unclaimReward).to.equal(100);
      expect(beneficiaryInfo.totalEarned).to.equal(100);
    });

    it("Function updateInfoHarvest() work", async function () {
      const { newUSer, ReferralProgram, otherAccount1 } = await loadFixture(
        deployNewFixture
      );

      await newUSer.updateInfoHarvest(otherAccount1.address, 199);

      const beneficiaryInfo = await ReferralProgram.beneficiaryInfo(
        otherAccount1.address
      );

      expect(beneficiaryInfo.unclaimReward).to.equal(199);
      expect(beneficiaryInfo.totalEarned).to.equal(199);
    });

    it("Function updateInfoWithdraw() work", async function () {
      const { newUSer, ReferralProgram, otherAccount1 } = await loadFixture(
        deployNewFixture
      );

      await newUSer.updateInfoWithdraw(otherAccount1.address, 900, 155);

      const beneficiaryInfo = await ReferralProgram.beneficiaryInfo(
        otherAccount1.address
      );

      expect(beneficiaryInfo.totalStakedReferalls).to.equal(100);
      expect(beneficiaryInfo.unclaimReward).to.equal(155);
      expect(beneficiaryInfo.totalEarned).to.equal(155);
    });

    it("Function claimRewards() work", async function () {
      const {
        newUSer,
        ReferralProgram,
        otherAccount1,
        CanvaToken,
        addressPool,
      } = await loadFixture(deployNewFixture);

      await newUSer.updateInfoWithdraw(otherAccount1.address, 900, 155);

      const newUSer2 = ReferralProgram.connect(otherAccount1);

      const claim = await newUSer2.claimRewards();

      await expect(claim).to.changeTokenBalances(
        CanvaToken,
        [addressPool, otherAccount1.address],
        [-155, 155]
      );

      const beneficiaryInfo = await ReferralProgram.beneficiaryInfo(
        otherAccount1.address
      );

      expect(beneficiaryInfo.unclaimReward).to.equal(0);
      expect(beneficiaryInfo.totalEarned).to.equal(155);
    });
  });
});
