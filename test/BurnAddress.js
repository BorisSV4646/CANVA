const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { deployFixture } = require("./Fixtures");

describe("BurnAddress", function () {
  describe("setWhitelistAddress", async function () {
    it("Set a whitelist", async function () {
      const { otherAccount1, BurnTokens } = await loadFixture(deployFixture);

      await BurnTokens.setWhitelistAddress(otherAccount1.address, true);

      expect(await BurnTokens.whitelist(otherAccount1.address)).to.equal(true);
    });

    it("Can burn tokens", async function () {
      const { BurnTokens, CanvaToken } = await loadFixture(deployFixture);

      const burn = await BurnTokens.burn(100);

      await expect(burn).to.changeTokenBalance(
        CanvaToken,
        BurnTokens.address,
        -100
      );

      expect(await BurnTokens.burnedAmount()).to.equal(100);
    });

    it("You can't burn tokens without a role", async function () {
      const { otherAccount1, otherAccount2, BurnTokens, CanvaToken } =
        await loadFixture(deployFixture);

      const newUSer = BurnTokens.connect(otherAccount1);

      await expect(newUSer.burn(100)).to.be.revertedWith(
        "BurnTokens: you don't have rights"
      );

      await BurnTokens.setWhitelistAddress(otherAccount2.address, true);

      const newUSer2 = BurnTokens.connect(otherAccount2);

      await expect(newUSer2.burn(100)).to.changeTokenBalance(
        CanvaToken,
        BurnTokens.address,
        -100
      );
    });

    it("Can transfer tokens", async function () {
      const { deployer, BurnTokens, CanvaToken } = await loadFixture(
        deployFixture
      );

      const burn = await BurnTokens.transfer(deployer.address, 100);

      await expect(burn).to.changeTokenBalances(
        CanvaToken,
        [BurnTokens.address, deployer.address],
        [-100, 100]
      );

      expect(await BurnTokens.burnedAmount()).to.equal(100);
    });
  });
});
