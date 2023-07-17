// const connectButton2 = document.getElementById("connect_button");
// const spanElement = connectButton2.querySelector("span");
// connectButton2.addEventListener("click", myFunction);

// async function myFunction() {
//   let isAccountConnected = false;

//   if (typeof web3 !== "undefined") {
//     web3 = new Web3(window.ethereum);
//   } else {
//     alert(
//       "Metamask не доступен, установите необходимое расширение https://chrome.google.com/webstore"
//     );
//   }

//   await web3.eth
//     .requestAccounts()
//     .then((accounts) => {
//       const userAccount = accounts[0];
//       isAccountConnected = true;
//     })
//     .catch((error) => {
//       console.error("Ошибка при запросе аккаунтов:", error);
//     });

//   try {
//     await window.ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: "0xaa36a7" }],
//     });
//     console.log("Вы переключились на нужную сеть");
//   } catch (switchError) {
//     // Сеть не была добавлена в MetaMask
//     if (switchError.code === 4902) {
//       try {
//         await window.ethereum.request({
//           method: "wallet_addEthereumChain",
//           params: [
//             {
//               chainId: "0xaa36a7",
//               chainName: "Sepolia",
//               rpcUrls: ["https://rpc.sepolia.org"],
//               blockExplorerUrls: ["https://sepolia.etherscan.io/"],
//               nativeCurrency: {
//                 name: "ETH",
//                 symbol: "ETH",
//                 decimals: 18,
//               },
//             },
//           ],
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     console.log("Не удается подключиться к сети");
//   }

//   await web3.eth
//     .getAccounts()
//     .then((accounts) => {
//       // Проверяем, есть ли доступные аккаунты
//       if (accounts.length > 0) {
//         const connectedAccount = accounts[0];
//         const buttonTextSmal = `${connectedAccount.substring(
//           0,
//           5
//         )}...${connectedAccount.slice(-4)}`;

//         spanElement.textContent = buttonTextSmal;

//         localStorage.setItem("connectedAccount", connectedAccount);
//       } else {
//         console.log("Аккаунты не доступны.");
//       }
//     })
//     .catch((error) => {
//       console.error("Ошибка при получении аккаунтов:", error);
//     });

//   return isAccountConnected;
// }

// if (myFunction() === true) {
//   const savedAccount = localStorage.getItem("connectedAccount");
//   if (savedAccount) {
//     const buttonTextSmal = `${savedAccount.substring(
//       0,
//       5
//     )}...${savedAccount.slice(-4)}`;

//     spanElement.textContent = buttonTextSmal;
//   }
// }

const connectButton = document.getElementById("connect_button");
const connectButtonMetamask = document.getElementById("connect_meatamask");
const connectButtonTrust = document.getElementById("connect_trust");
const logoutWalletText = document.getElementById("logout_wallet_field_text");
const etherscanLink = document.getElementById("etherscan-link");

const spanElement = connectButton.querySelector("span");
const connectWrapper = document.querySelector(".connect-wallet-wrapper");
const logoutWrapper = document.querySelector(".logout-wallet-wrapper");

connectButton.addEventListener("click", () => {
  if (spanElement.textContent === "CONNECT") {
    const isHidden = connectWrapper.style.display === "none";
    connectWrapper.style.display = isHidden ? "flex" : "none";
  } else {
    const isHidden = logoutWrapper.style.display === "none";
    logoutWrapper.style.display = isHidden ? "flex" : "none";
    logoutWalletText.innerHTML = spanElement.textContent;
  }
});

connectButtonMetamask.addEventListener("click", () => {
  connectWrapper.style.display = "none";
});

connectButtonTrust.addEventListener("click", () => {
  connectWrapper.style.display = "none";
  handleTrustWalletConnect();
});

const link = document.getElementById("link");

link.addEventListener("click", () => {
  const inputElement = document.createElement("input");
  const ethereumAddress = etherscanLink.href.match(/0x[a-fA-F0-9]{40}/)[0];
  inputElement.value = ethereumAddress;
  document.body.appendChild(inputElement);
  inputElement.select();
  document.execCommand("copy");
  document.body.removeChild(inputElement);
});

const connectButton2 = document.getElementById("connect_meatamask");
connectButton2.addEventListener("click", myFunction);

const changetButton = document.getElementById("changetButton");
changetButton.addEventListener("click", changeAccount);

async function changeAccount() {
  const walletAddress = await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });

  await window.ethereum.request({
    method: "wallet_requestPermissions",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
}

async function myFunction() {
  let isAccountConnected = false;

  if (typeof web3 !== "undefined") {
    web3 = new Web3(window.ethereum);
  } else {
    alert(
      "Metamask не доступен, установите необходимое расширение https://chrome.google.com/webstore"
    );
  }

  await web3.eth
    .requestAccounts()
    .then((accounts) => {
      const userAccount = accounts[0];
      isAccountConnected = true;
    })
    .catch((error) => {
      console.error("Ошибка при запросе аккаунтов:", error);
    });

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }],
    });
    console.log("Вы переключились на нужную сеть");
  } catch (switchError) {
    // Сеть не была добавлена в MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xaa36a7",
              chainName: "Sepolia",
              rpcUrls: ["https://rpc.sepolia.org"],
              blockExplorerUrls: ["https://sepolia.etherscan.io/"],
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    }
    console.log("Не удается подключиться к сети");
  }

  await web3.eth
    .getAccounts()
    .then((accounts) => {
      // Проверяем, есть ли доступные аккаунты
      if (accounts.length > 0) {
        const connectedAccount = accounts[0];
        const buttonTextSmal = `${connectedAccount.substring(
          0,
          5
        )}...${connectedAccount.slice(-4)}`;

        spanElement.textContent = buttonTextSmal;
        etherscanLink.href = `https://etherscan.io/address/${connectedAccount}`;

        localStorage.setItem("connectedAccount", connectedAccount);
      } else {
        console.log("Аккаунты не доступны.");
      }
    })
    .catch((error) => {
      console.error("Ошибка при получении аккаунтов:", error);
    });

  return isAccountConnected;
}

if (myFunction() === true) {
  const savedAccount = localStorage.getItem("connectedAccount");
  if (savedAccount) {
    const buttonTextSmal = `${savedAccount.substring(
      0,
      5
    )}...${savedAccount.slice(-4)}`;

    spanElement.textContent = buttonTextSmal;
    etherscanLink.href = `https://etherscan.io/address/${savedAccount}`;
  }
}

const connectTrust = document.getElementById("connect_trust");
connectTrust.addEventListener("click", connectWithTrustWallet);

async function connectWithTrustWallet() {
  try {
    // Запрашиваем доступ к аккаунтам пользователя через Trust Wallet
    await ethereum.send("eth_requestAccounts");
    console.log("Trust Wallet подключен");
    // Здесь вы можете выполнить дополнительные действия после успешного подключения Trust Wallet
  } catch (error) {
    console.error("Не удалось подключить Trust Wallet:", error);
  }
}

const disconnectButton = document.getElementById("disconnectButton");

disconnectButton.addEventListener("click", () => {
  logoutWrapper.style.display = "none";
  spanElement.textContent = "";
  const img = document.createElement("img");
  img.src = "img/connect-btn-icon.png";
  img.alt = "CONNECT";
  const text = document.createTextNode("CONNECT");
  spanElement.appendChild(img);
  spanElement.appendChild(text);
});

const logoutWallet = document.getElementById("logoutWallet");

logoutWallet.addEventListener("click", () => {
  logoutWrapper.style.display = "none";
});

const logoutWalletImage = document.getElementById("logoutWalletImage");

logoutWalletImage.addEventListener("click", () => {
  logoutWrapper.style.display = "none";
});

const closeWallet = document.getElementById("closeWallet");

closeWallet.addEventListener("click", () => {
  logoutWrapper.style.display = "none";
});

const closeWalletImage = document.getElementById("closeWalletImage");

closeWalletImage.addEventListener("click", () => {
  logoutWrapper.style.display = "none";
});
