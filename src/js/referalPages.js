let allReferrals = [];

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
  const tokenContractAddress = "0x5Ec8d136E4F4E5fBA63Fb1aC7679ee8C4fA3Ace7";

  const tokenContractABI = await readJSONFile("contracts/CanvaToken.json");

  const tokenContract = new web3.eth.Contract(
    tokenContractABI,
    tokenContractAddress
  );

  return tokenContract;
}

async function getContractStake(web3provider) {
  const web3 = new Web3(web3provider);
  const stakeContractAddress = "0xa43fA2cfF564f70376b422AA3d3b45f63fCdbca2";

  const stakeContractABI = await readJSONFile("contracts/StakingPool.json");

  const stakeContract = new web3.eth.Contract(
    stakeContractABI,
    stakeContractAddress
  );

  return stakeContract;
}

async function getContractReferral(web3provider) {
  const web3 = new Web3(web3provider);
  const referralContractAddress = "0x68488c736A5497714F399F91be1d35A121c18ff7";

  const referralContractABI = await readJSONFile(
    "contracts/ReferralProgram.json"
  );

  const referralContract = new web3.eth.Contract(
    referralContractABI,
    referralContractAddress
  );

  return referralContract;
}

async function referralInfo() {
  const walletAddress = await getWallet();
  const referralContract = await getContractReferral("https://rpc.sepolia.org");
  const referralInfo = await referralContract.methods
    .beneficiaries(walletAddress)
    .call();

  const beneficiaryInfo = await referralContract.methods
    .beneficiaryInfo(walletAddress)
    .call();
  const referral = beneficiaryInfo.referrels;
  allReferrals = referral;

  const priceElement = document.getElementById("totalInvited");
  const pendingFriends = document.getElementById("pendingFriends");
  const totalErned = document.getElementById("totalErned");
  const spanElement = document.getElementById("spanValue");
  const unclaimReward = document.getElementById("unclaimReward");
  const spanValue2 = document.getElementById("spanValue2");

  priceElement.innerHTML = referralInfo.numberOfReferrer;
  pendingFriends.innerHTML =
    Number(referralInfo.totalStakedReferalls) / 10 ** 18 + " CANVA";
  totalErned.firstChild.nodeValue =
    Math.floor(Number(referralInfo.totalEarned) / 10 ** 18) + " CANVA";
  spanElement.firstChild.nodeValue =
    "~$" +
    Math.floor(Math.floor(Number(referralInfo.totalEarned) / 10 ** 18) * 0.023);
  unclaimReward.innerHTML =
    Math.floor(Number(referralInfo.unclaimReward) / 10 ** 18) + " CANVA";
  spanValue2.innerHTML =
    "~$" +
    Math.floor(
      Math.floor(Number(referralInfo.unclaimReward) / 10 ** 18) * 0.023
    );

  createLink(walletAddress);

  createReferralString(allReferrals);
}

referralInfo();

const claimReward = document.getElementById("claimRewards");
claimReward.addEventListener("click", claimRewards);

async function claimRewards() {
  web3 = new Web3(window.ethereum);
  const walletAddress = await getWallet();
  const referralContract = await getContractReferral(window.ethereum);

  await referralContract.methods.claimRewards().send({ from: walletAddress });
}

async function createReferralString(referrals) {
  const waleetAdress = await getWallet();
  const stakeContract = await getContractStake("https://rpc.sepolia.org");
  const referralContract = await getContractReferral("https://rpc.sepolia.org");

  for (let i = 0; i < referrals.length; i++) {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("referral-table-body-rows");

    const childDiv = document.createElement("div");
    childDiv.classList.add("referral-table-body-r");

    const div1 = document.createElement("div");
    div1.classList.add("referral-table-body-r-col");
    const timeStaked = await stakeContract.methods
      .userInfo(waleetAdress)
      .call();
    const userTime = timeStaked.lastDepositedAt;
    div1.textContent = formatDate(userTime);
    childDiv.appendChild(div1);

    const div2 = document.createElement("div");
    div2.classList.add("referral-table-body-r-col");
    const walletAddress = `${referrals[i].substring(0, 6)}...${referrals[
      i
    ].slice(-6)}`;
    div2.textContent = walletAddress;
    childDiv.appendChild(div2);

    const div3 = document.createElement("div");
    div3.classList.add("referral-table-body-r-col");
    const balanceStaked = await stakeContract.methods
      .userInfo(waleetAdress)
      .call();
    const userBalance = balanceStaked.amount;
    div3.textContent = `${Number(userBalance) / 10 ** 18} CANVA`;
    childDiv.appendChild(div3);

    const div4 = document.createElement("div");
    div4.classList.add("referral-table-body-r-col", "green");
    const referralInfo = await referralContract.methods
      .beneficiaryInfo(waleetAdress)
      .call();
    const totalEarned = Number(referralInfo.totalEarned) / 10 ** 18;
    const totalStakedReferalls =
      Number(referralInfo.totalStakedReferalls) / 10 ** 18;
    const balanceUser = Number(timeStaked.amount) / 10 ** 18;
    const erned = Math.floor(
      (totalEarned / totalStakedReferalls) * balanceUser
    );
    div4.textContent = `${erned} CANVA`;
    childDiv.appendChild(div4);

    parentDiv.appendChild(childDiv);

    const existingDiv = document.querySelector(".referral-table-body-h");
    existingDiv.parentNode.insertBefore(parentDiv, existingDiv.nextSibling);
  }
}

const linkRef = document.getElementById("linkRef");

async function createLink(walletAddress) {
  const generateLink = `http://canva.com/referral/referrallink?userId=${walletAddress}`;
  linkRef.innerHTML = generateLink;
}

function formatDate(timestamp) {
  const date = new Date(Number(timestamp) * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  return `${formattedMonth}/${formattedDay}/${year}`;
}

linkRef.addEventListener("click", () => {
  const inputElement = document.createElement("input");
  inputElement.value = linkRef.textContent;
  document.body.appendChild(inputElement);
  inputElement.select();
  document.execCommand("copy");
  document.body.removeChild(inputElement);
});
