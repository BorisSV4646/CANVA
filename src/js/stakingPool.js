const addTokenButton = document.getElementById("addTokenButton");

addTokenButton.addEventListener("click", function () {
  const tokenAddress = "0x5Ec8d136E4F4E5fBA63Fb1aC7679ee8C4fA3Ace7"; // Адрес токена
  const tokenSymbol = "CNV"; // Символ токена
  const tokenDecimals = 18; // Количество десятичных знаков токена

  ethereum
    .request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: "/src/img/header-submenu-r-bottom.png",
        },
      },
    })
    .then((success) => {
      if (success) {
        console.log("Токен успешно добавлен в Metamask");
      } else {
        console.error("Не удалось добавить токен в Metamask");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

console.log(window.ethereum.isConnected());

const slider = document.getElementById("slider1");
const inputField = document.getElementById("myInputStake");
const priceStaking = document.getElementById("priceStaking");

slider.addEventListener("input", async function () {
  const tokenContract = await getTokenContract("https://rpc.sepolia.org");
  const waleetAdress = await getWallet();
  const balance = await tokenContract.methods.balanceOf(waleetAdress).call();
  const selectedValue = parseInt(this.value);
  const result = ((Number(balance) / 10 ** 18) * selectedValue) / 100;

  inputField.value = result.toLocaleString();

  const price = Math.floor(result * 0.023);
  priceStaking.textContent = "~" + price.toLocaleString() + " USD";
});

inputField.addEventListener("input", async function () {
  const tokenContract = await getTokenContract("https://rpc.sepolia.org");
  const waleetAdress = await getWallet();
  const balance = await tokenContract.methods.balanceOf(waleetAdress).call();

  const selectedValue = parseInt(this.value);
  const percentage = (selectedValue / (Number(balance) / 10 ** 18)) * 100;

  slider.value = Math.floor(percentage);
  updateSliderAppearance(Math.floor(percentage));

  const price = Math.floor(selectedValue * 0.023);
  priceStaking.textContent = "~" + price.toLocaleString() + " USD";
});

// Функция для обновления отображения ползунка и линии
function updateSliderAppearance(percentage) {
  const sliderValue = percentage;
  const thumb = document.getElementById("selector1");
  thumb.style.left = sliderValue + "%";
  const line = document.getElementById("range-line1");
  line.style.width = sliderValue + "%";
}

updateSliderAppearance();

// const slider2 = document.getElementById("slider2");
// const inputField2 = document.getElementById("myInputUnstake");
// const rangeValues = document.querySelectorAll(".staking-pool-range-value");

// slider2.addEventListener("input", async function () {
//   const stakeContract = await getContract(
//     "https://ethereum-goerli.publicnode.com"
//   );
//   const waleetAdress = await getWallet();
//   const balanceStakingUser = await stakeContract.methods
//     .getDepositInfo(waleetAdress)
//     .call();
//   const balanceStake = balanceStakingUser["_stake"];

//   const selectedValue = parseInt(this.value);

//   let result = ((balanceStake / 10 ** 18) * selectedValue) / 100;

//   inputField2.value = result;

//   //   rangeValues.forEach(function (rangeValue) {
//   //     const value = parseInt(rangeValue.textContent);
//   //     if (value <= selectedValue) {
//   //       rangeValue.classList.add("active");
//   //     } else {
//   //       rangeValue.classList.remove("active");
//   //     }
//   //   });
// });

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

async function getTokenContract(web3provider) {
  const web3 = new Web3(web3provider);
  const tokenContractAddress = "0x5Ec8d136E4F4E5fBA63Fb1aC7679ee8C4fA3Ace7";

  const tokenContractABI = await readJSONFile("contracts/CanvaToken.json");

  const tokenContract = new web3.eth.Contract(
    tokenContractABI,
    tokenContractAddress
  );

  return tokenContract;
}

async function getTokenBalance() {
  const wallets = await web3.eth.getAccounts();
  const waleetAdress = await getWallet();
  const tokenContract = await getTokenContract("https://rpc.sepolia.org");

  try {
    const balance = await tokenContract.methods.balanceOf(waleetAdress).call();
    const finalBalance = Number(balance) / 10 ** 18;
    const tokenElement = document.getElementById("balanceUser");
    tokenElement.innerHTML = `${finalBalance.toLocaleString()}`;
  } catch (error) {
    console.error("Ошибка при получении баланса токенов:", error);
  }
}

getTokenBalance();

async function getContract(web3provider) {
  const web3 = new Web3(web3provider);
  const stakeContractAddress = "0xa43fA2cfF564f70376b422AA3d3b45f63fCdbca2";

  const stakeContractABI = await readJSONFile("contracts/StakingPool.json");

  const stakeContract = new web3.eth.Contract(
    stakeContractABI,
    stakeContractAddress
  );

  return stakeContract;
}

function addLeadingZero(value) {
  return value < 10 ? "0" + value : value;
}

function formatTime(time) {
  var days = Math.floor(time / (24 * 60 * 60));
  var hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
  var minutes = Math.floor((time % (60 * 60)) / 60);
  var seconds = Math.floor(time % 60);

  return (
    days +
    "d: " +
    addLeadingZero(hours) +
    "h: " +
    addLeadingZero(minutes) +
    "m: " +
    addLeadingZero(seconds) +
    "s"
  );
}

async function getStaking() {
  const stakeContract = await getContract("https://rpc.sepolia.org");
  const waleetAdress = await getWallet();
  try {
    const balanceStaked = await stakeContract.methods
      .userInfo(waleetAdress)
      .call();
    const finalBalanceStaked = Number(balanceStaked.amount) / 10 ** 18;
    const tokenElementStaked = document.getElementById("balanceStaked");
    const spanElementStaked = tokenElementStaked.getElementsByTagName("p");

    if (spanElementStaked.length >= 2) {
      spanElementStaked[1].textContent = finalBalanceStaked.toLocaleString();
    }
  } catch (error) {
    console.error("Ошибка при получении баланса застейканных токенов:", error);
  }

  try {
    const balanceHarvest = await stakeContract.methods
      .pendingReward(waleetAdress)
      .call();
    const finalHarvestStaked = Number(balanceHarvest) / 10 ** 18;
    const tokenElementStaked = document.getElementById("harvestBalance");
    const spanElementStaked = tokenElementStaked.getElementsByTagName("p");

    if (spanElementStaked.length >= 2) {
      spanElementStaked[1].textContent = finalHarvestStaked.toLocaleString();
    }
  } catch (error) {
    console.error("Ошибка при получении баланса заработанных токенов:", error);
  }

  try {
    const timeDeposut = await stakeContract.methods
      .userInfo(waleetAdress)
      .call();
    const tokenElementStaked = document.getElementById("timeStake");
    const spanElementStaked = tokenElementStaked.getElementsByTagName("p");

    const expirationTimestamp =
      Number(timeDeposut.lastDepositedAt) + 40 * 24 * 60 * 60;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const timeRemaining = expirationTimestamp - currentTimestamp;

    if (spanElementStaked.length >= 2) {
      spanElementStaked[1].textContent = formatTime(timeRemaining);
    }
  } catch (error) {
    console.error("Ошибка при получении баланса застейканных токенов:", error);
  }

  const button = $(".staking-item-center-row-btn");

  if ((await stakeContract.methods.pendingReward(waleetAdress).call()) > 0) {
    button.addClass("green").removeClass("disabled");
  }
}

getStaking();

const harvestmButton = document.getElementById("harvest");
harvestmButton.addEventListener("click", claimReward);

async function claimReward() {
  const stakeContract = await getContract(window.ethereum);
  const tokenContract = await getTokenContract(window.ethereum);
  const waleetAdress = await getWallet();

  const userReward = await stakeContract.methods
    .pendingReward(waleetAdress)
    .call();

  if (userReward !== 0) {
    await stakeContract.methods.harvestReward().send({ from: waleetAdress });
  } else {
    alert("У вас нет ревардов");
  }
}

// const myInputStake = document.getElementById("myInputStake");
// const myInputUnstake = document.getElementById("myInputUnstake");
// const harvestmButton = document.getElementById("harvest");
// harvestmButton.addEventListener("click", claimReward);

// $("#confirmButton").click(function () {
//   var activeTab = $(".staking-pool-content.active").attr("data-tab");

//   if (activeTab === "1") {
//     stakingFunction();
//   } else if (activeTab === "2") {
//     unstakingFunction();
//   }
// });

// async function stakingFunction() {
//   web3 = new Web3(window.ethereum);
//   const stakeContract = await getContract(window.ethereum);
//   const tokenContract = await getTokenContract(window.ethereum);
//   const waleetAdress = await getWallet();
//   const userBalance = await tokenContract.methods
//     .balanceOf(waleetAdress)
//     .call();
//   const value = parseFloat(myInputStake.value);

//   const finalvalue = value * 10 ** 18;

//   if (value > 0 && finalvalue <= userBalance) {
//     try {
//       const allowanceFirst = await tokenContract.methods
//         .allowance(waleetAdress, stakeContract.options.address)
//         .call();
//       if (allowanceFirst >= finalvalue) {
//         await stakeContract.methods
//           .deposit(web3.utils.toWei(value.toString(), "ether")) // finalvalue.toString()
//           .send({ from: waleetAdress });
//       } else {
//         await tokenContract.methods
//           .approve(
//             stakeContract.options.address,
//             web3.utils.toWei(value.toString(), "ether")
//           )
//           .send({ from: waleetAdress });
//         const allowanceSecond = await tokenContract.methods
//           .allowance(waleetAdress, stakeContract.options.address)
//           .call();
//         if (allowanceSecond >= finalvalue && allowanceFirst < finalvalue) {
//           await stakeContract.methods
//             .deposit(web3.utils.toWei(value.toString(), "ether"))
//             .send({ from: waleetAdress });
//         } else if (allowanceSecond < value) {
//           alert(
//             "Вы не обобрили нужное колличество токенов, введите в поле необходимое колличество для стейкинга"
//           );
//           await tokenContract.methods
//             .approve(
//               stakeContract.options.address,
//               web3.utils.toWei(value.toString(), "ether")
//             )
//             .send({ from: waleetAdress });
//         }
//       }
//     } catch (error) {
//       console.error("Ошибка:", error);
//     }
//   } else {
//     alert("Введите значение больше 0 и не больше вашего баланса");
//   }
// }

// async function unstakingFunction() {
//   const stakeContract = await getContract(window.ethereum);
//   const tokenContract = await getTokenContract(window.ethereum);
//   const waleetAdress = await getWallet();
//   const balanceStakingUser = await stakeContract.methods
//     .getDepositInfo(waleetAdress)
//     .call();
//   const userBalance = balanceStakingUser["_stake"];
//   const value = parseFloat(myInputUnstake.value);

//   console.log(userBalance);

//   const finalvalue = value * 10 ** 18;

//   if (value > 0 && finalvalue <= userBalance && finalvalue !== userBalance) {
//     try {
//       const allowanceFirst = await tokenContract.methods
//         .allowance(waleetAdress, stakeContract.options.address)
//         .call();
//       if (allowanceFirst >= value) {
//         await stakeContract.methods
//           .withdraw(web3.utils.toWei(value.toString(), "ether"))
//           .send({ from: waleetAdress });
//       } else {
//         await tokenContract.methods
//           .approve(
//             stakeContract.options.address,
//             web3.utils.toWei(value.toString(), "ether")
//           )
//           .send({ from: waleetAdress });
//         const allowanceSecond = await tokenContract.methods
//           .allowance(waleetAdress, stakeContract.options.address)
//           .call();
//         if (allowanceSecond >= value && allowanceFirst < value) {
//           await stakeContract.methods
//             .withdraw(web3.utils.toWei(value.toString(), "ether"))
//             .send({ from: waleetAdress });
//         } else if (allowanceSecond < value) {
//           alert(
//             "Вы не обобрили нужное колличество токенов, введите в поле необходимое колличество для стейкинга"
//           );
//           await tokenContract.methods
//             .approve(
//               stakeContract.options.address,
//               web3.utils.toWei(value.toString(), "ether")
//             )
//             .send({ from: waleetAdress });
//         }
//       }
//     } catch (error) {
//       console.error("Ошибка:", error);
//     }
//   } else if (finalvalue === userBalance) {
//     try {
//       const allowanceFirst = await tokenContract.methods
//         .allowance(waleetAdress, stakeContract.options.address)
//         .call();
//       if (allowanceFirst >= value) {
//         await stakeContract.methods.withdrawAll().send({ from: waleetAdress });
//       } else {
//         await tokenContract.methods
//           .approve(
//             stakeContract.options.address,
//             web3.utils.toWei(value.toString(), "ether")
//           )
//           .send({ from: waleetAdress });
//         const allowanceSecond = await tokenContract.methods
//           .allowance(waleetAdress, stakeContract.options.address)
//           .call();
//         if (allowanceSecond >= value && allowanceFirst < value) {
//           await stakeContract.methods
//             .withdrawAll()
//             .send({ from: waleetAdress });
//         } else if (allowanceSecond < value) {
//           alert(
//             "Вы не обобрили нужное колличество токенов, введите в поле необходимое колличество для стейкинга"
//           );
//           await tokenContract.methods
//             .approve(
//               stakeContract.options.address,
//               web3.utils.toWei(value.toString(), "ether")
//             )
//             .send({ from: waleetAdress });
//         }
//       }
//     } catch (error) {
//       console.error("Ошибка:", error);
//     }
//   } else {
//     alert("Введите значение больше 0 и не больше вашего баланса токенов");
//   }
// }