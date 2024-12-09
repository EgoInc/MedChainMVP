const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Приватный ключ одного из аккаунтов, созданных Hardhat (выдаётся при запуске `npx hardhat node`)
const privateKey =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// Создаём экземпляр кошелька
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const abi = [
  "function createPatientContract(string _fio, string _date_birth, string _city) public",
  "function getPatientContract(uint _patient_id) public view returns(address)",
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

(async () => {
  try {
    // Вызов функции изменения данных
    const tx = await contract.createPatientContract(
      "ivanov ivan ivanovich",
      "12.02.2005",
      "Moscow"
    );

    // Ждём подтверждения транзакции
    const receipt = await tx.wait();
    console.log("Транзакция подтверждена! ", receipt.blockNumber);

    // Вызов view-функции
    const value = await contract.getPatientContract(0);
    console.log("Адрес смарт контракта пациента:", value.toString());
  } catch (error) {
    console.error("Ошибка:", error);
  }
})();
