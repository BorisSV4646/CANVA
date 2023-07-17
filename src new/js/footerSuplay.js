const totalSuplay = document.getElementById("totalSuplay");
// const totalBurned = document.getElementById("totalBurned");
const spanElementSupply = totalSuplay.querySelectorAll("span");
// const spanElementBurn = totalBurned.querySelectorAll("span");

function readJSONFile(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data.abi;
    })
    .catch((error) => {
      console.error("Ошибка чтения файла JSON:", error);
    });
}

async function getTokenContract(web3provider) {
  const web3 = new Web3(web3provider);
  const tokenContractAddress = "0x5959bC9A10A89cccCfdb6b2BB458F34E52504441";

  const tokenContractABI = await readJSONFile("contracts/CanvaToken.json");

  const tokenContract = new web3.eth.Contract(
    tokenContractABI,
    tokenContractAddress
  );

  return tokenContract;
}

async function getTokenBalance() {
  const tokenContract = await getTokenContract(
    "https://goerli.blockpi.network/v1/rpc/public"
  );

  try {
    const balance = await tokenContract.methods.totalSupply().call();

    if (spanElementSupply.length > 1) {
      const spanElement = spanElementSupply[1];
      const suplay = Number(balance) / 10 ** 18;
      spanElement.textContent = suplay.toLocaleString();
    }
  } catch (error) {
    console.error("Ошибка при получении баланса токенов:", error);
  }
}

// async function getBurnContract(web3provider) {
//   const web3 = new Web3(web3provider);
//   const burnContractAddress = "0x120190C339C3Ef0ECA437C467323197c25967aAc";

//   const burnContractABI = await readJSONFile("contracts/BurnTokens.json");
//   const burnContract = new web3.eth.Contract(
//     burnContractABI,
//     burnContractAddress
//   );

//   return burnContract;
// }

// async function getBurnBalance() {
//   const burnContract = await getBurnContract("https://rpc.sepolia.org");

//   try {
//     const balance = await burnContract.methods.burnedAmount().call();

//     if (spanElementBurn.length > 1) {
//       const spanElement = spanElementBurn[1];
//       const balanceBurn = Number(balance) / 10 ** 18;
//       spanElement.textContent = balanceBurn.toLocaleString();
//     }
//   } catch (error) {
//     console.error("Ошибка при получении баланса токенов:", error);
//   }
// }

getTokenBalance();
// getBurnBalance();
