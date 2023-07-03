const connectButton2 = document.getElementById("connect_button");
const spanElement = connectButton2.querySelector("span");
connectButton2.addEventListener("click", myFunction);

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
  }
}
