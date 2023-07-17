const {
  ChainId,
  Token,
  Route,
  Fetcher,
  uni,
  WETH9,
  Trade,
  TradeType,
  Percent,
  CurrencyAmount,
} = require("@pancakeswap/sdk");
const { ethers } = require("ethers");
const { getDefaultProvider } = require("ethers");
const provider = getDefaultProvider("https://ethereum-goerli.publicnode.com");
const chainId = ChainId.GOERLI;

const swapEthToUni = async (value) => {
  const uni = await new Token(
    chainId,
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    18,
    "UNI",
    "Uniswap"
  );
  const weth = WETH9[chainId];

  const pair = await Fetcher.fetchPairData(weth, uni, provider);

  const route = new Route([pair], weth, uni);
  const amountOut = value * 10 ** 18;
  const amount = CurrencyAmount.fromRawAmount(weth, amountOut);
  const trade = new Trade(route, amount, TradeType.EXACT_INPUT);
  const howMuchBNB = route.midPrice.toSignificant(6);

  const slippageTolerance = new Percent("50", "10000");
  const amountIn = trade.maximumAmountIn(slippageTolerance);
  const amountOutMin = trade.minimumAmountOut(slippageTolerance);
  const path = [weth.address, uni.address];
  const to = "";
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  // const value = trade.inputAmount.raw;
  console.log(
    howMuchBNB,
    path,
    deadline,
    amountIn.toExact(),
    amountOutMin.toExact()
  );

  return {
    howMuchBNB: howMuchBNB,
    path: path,
    deadline: deadline,
    amountIn: amountIn.toExact(),
    amountOutMin: amountOutMin.toExact(),
  };
};

const swapBnbToEth = async (value) => {
  const uni = await new Token(
    chainId,
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    18,
    "UNI",
    "Uniswap"
  );
  const weth = WETH9[chainId];

  const pair = await Fetcher.fetchPairData(uni, weth, provider);

  const route = new Route([pair], uni, weth);
  const amountOut = value * 10 ** 18;
  const amount = CurrencyAmount.fromRawAmount(uni, amountOut);
  const trade = new Trade(route, amount, TradeType.EXACT_INPUT);
  const howMuchETH = route.midPrice.toSignificant(6);

  const slippageTolerance = new Percent("50", "10000");
  const amountIn = trade.maximumAmountIn(slippageTolerance);
  const amountOutMin = trade.minimumAmountOut(slippageTolerance);
  const path = [uni.address, weth.address];
  const to = "";
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  // const value = trade.inputAmount.raw;
  console.log(
    howMuchETH,
    path,
    deadline,
    amountIn.toExact(),
    amountOutMin.toExact()
  );
  return {
    howMuchETH: howMuchETH,
    path: path,
    deadline: deadline,
    amountIn: amountIn.toExact(),
    amountOutMin: amountOutMin.toExact(),
  };
};

async function swapEthToUniTransaction() {
  const web3 = new Web3(window.ethereum);
  const walletAdress = await getWallet();

  const uniContractRouterAdress = "0xEfF92A263d31888d860bD50809A8D171709b7b1c";
  const uniContractRouterABI = [
    {
      constant: false,
      inputs: [
        {
          name: "amountOutMin",
          type: "uint256",
        },
        {
          name: "path",
          type: "address[]",
        },
        {
          name: "to",
          type: "address",
        },
        {
          name: "deadline",
          type: "uint256",
        },
      ],
      name: "swapExactETHForTokens",
      outputs: [
        {
          name: "amounts",
          type: "uint256[]",
        },
      ],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
  ];

  const tuniContract = new web3.eth.Contract(
    uniContractRouterABI,
    uniContractRouterAdress
  );

  const value = parseFloat(inputSwap.value);
  const { howMuchBNB, path, deadline, amountIn, amountOutMin } =
    await swapEthToUni(value);
  const deadlineSwap = deadline;
  const pathSwap = path;
  const amountOutMinSwap = amountOutMin;
  await tuniContract.methods
    .swapExactETHForTokens(
      ethers.utils.parseEther(amountOutMinSwap),
      pathSwap,
      walletAdress,
      deadlineSwap
    )
    .send({
      from: walletAdress,
      value: ethers.utils.parseEther(value.toString()),
    });
}

async function swapUniToEthTransaction() {
  const web3 = new Web3(window.ethereum);
  const walletAdress = await getWallet();

  const uniContractRouterAdress = "0xEfF92A263d31888d860bD50809A8D171709b7b1c";
  const uniContractRouterABI = [
    {
      constant: false,
      inputs: [
        {
          name: "amountIn",
          type: "uint256",
        },
        {
          name: "amountOutMin",
          type: "uint256",
        },
        {
          name: "path",
          type: "address[]",
        },
        {
          name: "to",
          type: "address",
        },
        {
          name: "deadline",
          type: "uint256",
        },
      ],
      name: "swapExactTokensForTokens",
      outputs: [
        {
          name: "amounts",
          type: "uint256[]",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const tuniContract = new web3.eth.Contract(
    uniContractRouterABI,
    uniContractRouterAdress
  );

  const value = parseFloat(inputSwap.value);
  const { howMuchETH, path, deadline, amountIn, amountOutMin } =
    await swapBnbToEth(value);
  const amountInSwap = amountIn;
  const deadlineSwap = deadline;
  const pathSwap = path;
  const amountOutMinSwap = amountOutMin;
  await tuniContract.methods
    .swapExactTokensForTokens(
      ethers.utils.parseEther(amountInSwap),
      ethers.utils.parseEther(amountOutMinSwap),
      pathSwap,
      walletAdress,
      deadlineSwap
    )
    .send({
      from: walletAdress,
    });
}

async function approveUniToSwap() {
  const web3 = new Web3(window.ethereum);
  const walletAdress = await getWallet();

  const approveContract = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const approveContractAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "spender",
          type: "address",
        },
        {
          name: "rawAmount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const approveContractUni = new web3.eth.Contract(
    approveContractAbi,
    approveContract
  );

  const value = parseFloat(inputSwap.value);
  await approveContractUni.methods
    .approve(
      "0xEfF92A263d31888d860bD50809A8D171709b7b1c",
      web3.utils.toWei(value.toString(), "ether")
    )
    .send({
      from: walletAdress,
    });
}

async function getTokenBalanceUni() {
  const web3 = new Web3("https://ethereum-goerli.publicnode.com");
  const tokenContractAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const wallets = await web3.eth.getAccounts();
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

  let balance;
  try {
    balance = await tokenContract.methods.balanceOf(waleetAdress).call();

    const finalBalance = balance / 10 ** 18;
    const tokenElement = document.getElementById("tokenBalanceChange");
    tokenElement.innerHTML = `${finalBalance.toFixed(2)} UNI`;
  } catch (error) {
    console.error("Ошибка при получении баланса токенов:", error);
  }

  return balance;
}

async function handleSwapButtonClick() {
  const web3 = new Web3(window.ethereum);
  const walletAdress = await getWallet();

  const allowContract = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const allowContractAbi = [
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address",
        },
        {
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
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

  const approveContractUni = new web3.eth.Contract(
    allowContractAbi,
    allowContract
  );

  const value = parseFloat(inputSwap.value);
  const finalvalue = value * 10 ** 18;
  const allowFirst = await approveContractUni.methods
    .allowance(walletAdress, "0xEfF92A263d31888d860bD50809A8D171709b7b1c")
    .send({
      from: walletAdress,
    });

  if (allowFirst >= finalvalue) {
    await swapUniToEthTransaction();
  } else {
    await approveUniToSwap();
    const allowSecond = await approveContractUni.methods
      .allowance(walletAdress, "0xEfF92A263d31888d860bD50809A8D171709b7b1c")
      .send({
        from: walletAdress,
      });

    if (allowSecond >= finalvalue && allowFirst < finalvalue) {
      await swapUniToEthTransaction();
    } else if (allowSecond < finalvalue) {
      alert(
        "Вы не обобрили нужное колличество токенов, введите в поле необходимое колличество для стейкинга"
      );
      await approveUniToSwap();
    }
  }
}

swapEthToUni(1);
swapBnbToEth(1);
