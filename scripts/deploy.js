const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", await deployer.address);

  // console.log("Account balance:", (await deployer.getBalance()).toString());

  // const canva = await hre.ethers.deployContract("CanvaToken", [
  // "CanvaToken",
  // "CV",
  // "0x176d7b70b643688d528ac0387a8e9b609cae5d028b4165dc095b886044086d2f",
  // 30,
  // ]);

  // await canva.waitForDeployment();

  const canva = await ethers.getContractFactory("CanvaToken", deployer);

  const canvaERC20 = await canva.deploy(
    "CanvaToken",
    "CV",
    "0xDbfEEa0fc1F1F2f43F7DbaD7827Cccad8C47c337",
    30
  );

  await canvaERC20.deployed(
    "CanvaToken",
    "CV",
    "0xDbfEEa0fc1F1F2f43F7DbaD7827Cccad8C47c337",
    30
  );

  console.log("Token ERC20 address:", canvaERC20.address);

  // saveForFront({ canvaERC20: canva });
}

async function saveForFront(contracts) {
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
