const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { deployFixture } = require("./Fixtures");

describe("CanvaToken", function () {
  describe("Initialization contract", async function () {
    it("After the deployment of the contract, all sets", async function () {
      const { deployer, CanvaToken, blocStart, BurnTokens } = await loadFixture(
        deployFixture
      );

      expect(await CanvaToken.balanceOf(deployer.address)).to.equal(
        109999999999999999999999000n
      );

      const target = await CanvaToken.targets(0);

      expect(target.capAmount).to.equal(310000000);
      expect(target.lastHarvestedAtBlock).to.equal(blocStart.number);
      expect(target.tokensPerBlockRate).to.equal(348350);
      expect(target.isInitialized).to.equal(true);

      expect(await CanvaToken.burnAddress()).to.equal(BurnTokens.address);
      expect(await CanvaToken.tokensPerBlock()).to.equal(30);
    });

    it("The initialization modifier works", async function () {
      const [deployer, otherAccount1] = await ethers.getSigners();

      const canva = await ethers.getContractFactory("CanvaToken", deployer);
      const CanvaToken = await canva.deploy(
        "CanvaToken",
        "CV",
        deployer.address,
        30,
        deployer.address
      );
      await CanvaToken.deployed(
        "CanvaToken",
        "CV",
        deployer.address,
        30,
        deployer.address
      );

      await CanvaToken.setTargetInfo(3, [70000000, 70000000, 0, 0, true]);
      await CanvaToken.setTargetInfo(6, [30000000, 30000000, 0, 0, true]);
      await CanvaToken.setTargetInfo(7, [10000000, 10000000, 0, 0, true]);

      await expect(
        CanvaToken.mintByContract(otherAccount1.address, 100, 3)
      ).to.be.revertedWith("TARGETS_NOT_INITIALIZED");
    });

    it("The function mintByContract() works", async function () {
      const { CanvaToken, addressPool } = await loadFixture(deployFixture);

      await network.provider.send("hardhat_setBalance", [
        addressPool,
        "0xde0b6b3a7640000",
      ]);

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addressPool],
      });

      const signer = await ethers.getSigner(addressPool);

      const newUSer = CanvaToken.connect(signer);

      const target = await CanvaToken.targets(2);

      const amountAvailable =
        ((20 - target.lastHarvestedAtBlock) * 30 * target.tokensPerBlockRate) /
        1000000;

      const mint = await newUSer.mintByContract(addressPool, 1000, 2);

      await expect(mint).to.changeTokenBalance(
        CanvaToken,
        addressPool,
        Math.floor(amountAvailable)
      );

      const target2 = await CanvaToken.targets(2);

      expect(await target2.distributedAmount).to.equal(
        Math.floor(amountAvailable)
      );

      expect(await target2.lastHarvestedAtBlock).to.equal(Math.floor(20));
    });

    it("You can't mint if you're not on the whitelist", async function () {
      const { otherAccount1, CanvaToken, addressPool } = await loadFixture(
        deployFixture
      );

      const newUSer = CanvaToken.connect(otherAccount1);

      await expect(
        newUSer.mintByContract(addressPool, 1000, 2)
      ).to.be.revertedWith("NOT_ALLOWED");
    });

    it("You can't mint on a completed goal", async function () {
      const { CanvaToken, addressPool } = await loadFixture(deployFixture);

      await network.provider.send("hardhat_setBalance", [
        addressPool,
        "0xde0b6b3a7640000",
      ]);

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addressPool],
      });

      const signer = await ethers.getSigner(addressPool);

      const newUSer = CanvaToken.connect(signer);

      await expect(
        newUSer.mintByContract(addressPool, 1000, 3)
      ).to.be.revertedWith("THERE ARE NO TOKENS FOR MINT FOR THIS PURPOSE");
    });

    it("The function mintByOwner() works", async function () {
      const { deployer, CanvaToken } = await loadFixture(deployFixture);

      const target = await CanvaToken.targets(2);

      const amountAvailable =
        ((20 - target.lastHarvestedAtBlock) * 30 * target.tokensPerBlockRate) /
        1000000;

      const mint = await CanvaToken.mintByOwner(deployer.address, 1000, 2);

      await expect(mint).to.changeTokenBalance(
        CanvaToken,
        deployer.address,
        Math.floor(amountAvailable)
      );

      const target2 = await CanvaToken.targets(2);

      expect(await target2.distributedAmount).to.equal(
        Math.floor(amountAvailable)
      );

      expect(await target2.lastHarvestedAtBlock).to.equal(Math.floor(20));
    });

    it("The function setBurnAddress() works", async function () {
      const { CanvaToken, otherAccount1 } = await loadFixture(deployFixture);

      await CanvaToken.setBurnAddress(otherAccount1.address);

      expect(await CanvaToken.burnAddress()).to.equal(otherAccount1.address);
    });

    it("The function setTokensPerBlock() works", async function () {
      const { CanvaToken } = await loadFixture(deployFixture);

      await CanvaToken.setTokensPerBlock(35);

      expect(await CanvaToken.tokensPerBlock()).to.equal(35);
    });
  });
});
