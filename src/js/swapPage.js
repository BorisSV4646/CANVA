async function getWallet() {
  if (typeof web3 !== "undefined") {
    web3 = new Web3(window.ethereum);
  } else {
    alert(
      "Metamask не доступен, установите необходимое расширение https://chrome.google.com/webstore"
    );
    return;
  }

  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      const connectedAccount = accounts[0];
      return connectedAccount;
    } else {
      console.log("Аккаунты не доступны.");
    }
  } catch (error) {
    console.error("Ошибка при получении аккаунтов:", error);
  }
}

async function getTokenBalanceETH() {
  const web3 = new Web3("https://bsc-dataseed1.binance.org");
  const tokenContractAddress = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8";
  const waleetAdress = await getWallet();

  const tokenContractABI = [
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  const tokenContract = new web3.eth.Contract(
    tokenContractABI,
    tokenContractAddress
  );

  try {
    const balance = await tokenContract.methods.balanceOf(waleetAdress).call();

    const tokenElement = document.getElementById("tokenBalanceChange");
    tokenElement.innerHTML = `${balance} ETH`;
  } catch (error) {
    console.error("Ошибка при получении баланса токенов:", error);
  }
}

async function getTokenBalanceBNB() {
  const web3 = new Web3("https://bsc-dataseed1.binance.org");
  const tokenContractAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  const waleetAdress = await getWallet();

  const tokenContractABI = [
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  const tokenContract = new web3.eth.Contract(
    tokenContractABI,
    tokenContractAddress
  );

  try {
    const balance = await tokenContract.methods.balanceOf(waleetAdress).call();

    const tokenElement = document.getElementById("tokenBalanceChange");
    tokenElement.innerHTML = `${balance} BNB`;
  } catch (error) {
    console.error("Ошибка при получении баланса токенов:", error);
  }
}

async function getPriceEth() {
  fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  )
    .then((response) => response.json())
    .then((data) => {
      const ethPrice = data.ethereum.usd;
      const priceElement = document.getElementById("tokenPrice");
      priceElement.innerHTML = `${ethPrice} $USD`;
    })
    .catch((error) => {
      console.error("Ошибка при получении цены ETH:", error);
    });
}

async function getPriceBnb() {
  fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
  )
    .then((response) => response.json())
    .then((data) => {
      const bnbPrice = data.binancecoin.usd;
      const priceElement = document.getElementById("tokenPrice");
      priceElement.innerHTML = `${bnbPrice} $USD`;
    })
    .catch((error) => {
      console.error("Ошибка при получении цены BNB:", error);
    });
}
