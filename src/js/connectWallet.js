const connectButton = document.getElementById("connect_button");
const connectButtonMetamask = document.getElementById("connect_meatamask");
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

let isAccountConnected = false;

async function myFunction() {
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
      localStorage.setItem("isAccountConnected", isAccountConnected);
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
  connectWrapper.style.display = "none";
});

const closeWalletImage = document.getElementById("closeWalletImage");

closeWalletImage.addEventListener("click", () => {
  connectWrapper.style.display = "none";
});

const connectTrust = document.getElementById("connect_trust");
connectTrust.addEventListener("click", connectTrustFinal);

async function getTrustWalletInjectedProvider({ timeout } = { timeout: 3000 }) {
  const provider = getTrustWalletFromWindow();

  if (provider) {
    return provider;
  }

  return listenForTrustWalletInitialized({ timeout });
}

async function listenForTrustWalletInitialized(
  { timeout } = { timeout: 3000 }
) {
  return new Promise((resolve) => {
    const handleInitialization = () => {
      resolve(getTrustWalletFromWindow());
    };

    window.addEventListener("trustwallet#initialized", handleInitialization, {
      once: true,
    });

    setTimeout(() => {
      window.removeEventListener(
        "trustwallet#initialized",
        handleInitialization,
        { once: true }
      );
      resolve(null);
    }, timeout);
  });
}

function getTrustWalletFromWindow() {
  const isTrustWallet = (ethereum) => {
    const trustWallet = !!ethereum.isTrust;

    return trustWallet;
  };

  const injectedProviderExist =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

  if (!injectedProviderExist) {
    return null;
  }

  if (isTrustWallet(window.ethereum)) {
    return window.ethereum;
  }

  if (window.ethereum?.providers) {
    return window.ethereum.providers.find(isTrustWallet) ?? null;
  }

  return window["trustwallet"] ?? null;
}

let isAccountConnectedTrust = false;

async function connectTrustFinal() {
  let isAccountConnected = false;

  const injectedProvider = await getTrustWalletInjectedProvider();
  try {
    const account = await injectedProvider.request({
      method: "eth_requestAccounts",
    });
    const chainId = await injectedProvider.request({ method: "eth_chainId" });

    if (chainId !== "0x1") {
      await injectedProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    }

    connectWrapper.style.display = "none";
    changetButton.style.display = "none";

    const connectedAccountTrust = account[0];
    const buttonTextSmal = `${connectedAccountTrust.substring(
      0,
      5
    )}...${connectedAccountTrust.slice(-4)}`;

    spanElement.textContent = buttonTextSmal;

    etherscanLink.href = `https://etherscan.io/address/${account[0]}`;

    isAccountConnectedTrust = true;
    localStorage.setItem("isAccountConnectedTrust", isAccountConnectedTrust);
    localStorage.setItem("connectedAccountTrust", connectedAccountTrust);
  } catch (e) {
    if (e.code === 4001) {
      console.error("User denied connection.");
    }
  }
}

const savedAccountTrust = localStorage.getItem("isAccountConnectedTrust");
if (savedAccountTrust === "true") {
  const savedAccount = localStorage.getItem("connectedAccountTrust");
  if (savedAccount) {
    const buttonTextSmal = `${savedAccount.substring(
      0,
      5
    )}...${savedAccount.slice(-4)}`;

    spanElement.textContent = buttonTextSmal;
    etherscanLink.href = `https://etherscan.io/address/${savedAccount}`;
  }
}

const isAccountConnectedMetamask = localStorage.getItem("isAccountConnected");
if (isAccountConnectedMetamask === "true") {
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

async function listenDisconnectMetamask() {
  if (!window.ethereum || !window.ethereum.on) {
    console.error("MetaMask is not available.");
    return;
  }

  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts.length === 0) {
      isAccountConnected = false;
      localStorage.setItem("isAccountConnected", isAccountConnected);
    } else {
      const newConnectedAccount = accounts[0];
      console.log(newConnectedAccount); // => '0x...'
    }
  });
}

async function listenDisconnectTrust() {
  const injectedProvider = await getTrustWalletInjectedProvider();

  injectedProvider.on("accountsChanged", (accounts) => {
    if (accounts.length === 0) {
      isAccountConnectedTrust = false;
      localStorage.setItem("isAccountConnectedTrust", isAccountConnectedTrust);
      console.log(isAccountConnectedTrust);
    } else {
      const newConnectedAccount = accounts[0];
    }
  });
}

setInterval(listenDisconnectTrust, 1000);
setInterval(listenDisconnectMetamask, 1000);
