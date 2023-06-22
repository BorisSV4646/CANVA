const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { deployFixture } = require("./Fixtures");

describe("StakingFactory", function () {
  describe("Initialization contract", async function () {
    it("After the deployment of the contract, all sets", async function () {
      const { StakingFactory, addressPool } = await loadFixture(deployFixture);

      expect(await StakingFactory.allPools(0)).to.equal(addressPool);
    });

    it("Function allPoolsLength() work", async function () {
      const { StakingFactory } = await loadFixture(deployFixture);

      expect(await StakingFactory.allPoolsLength()).to.equal(1);
    });

    it("Function deployPool() work", async function () {
      const { StakingFactory, ReferralProgram, CanvaToken, otherAccount1 } =
        await loadFixture(deployFixture);

      const newPool = await StakingFactory.deployPool(
        "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
        CanvaToken.address,
        25,
        25,
        1000000,
        1000,
        otherAccount1.address,
        ReferralProgram.address
      );

      expect(await StakingFactory.allPoolsLength()).to.equal(2);

      await expect(newPool)
        .to.emit(StakingFactory, "NewSmartChefContract")
        .withArgs(await StakingFactory.allPools(1));
    });
  });
});
