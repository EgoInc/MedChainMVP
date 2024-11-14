const { ethers } = require('ethers');
const crypto = require('crypto');

// Данные приема
const medicalRecord = {
  date: '01.01.24',
  complaints: 'Боль в горле, температура 38',
  diagnosis: 'ангина',
  recommendations: 'хлоргекседин',
};

// Публичный и приватный ключ пациента (в формате Ethereum)
const patientPublicKey = '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97';
const patientPrivateKey = '0x02e6d5f9e65e30e3a22702585de8119ebb42572f9e9e118865a4864bfa15a2b102';

// Генерация случайного симметричного ключа
const aesKey = crypto.randomBytes(32); // 256-битный ключ AES

// Функция для шифрования данных приема
async function encryptMedicalRecord(record) {

  // Шаг 1: Шифрование данных приема симметричным ключом
  const iv = crypto.randomBytes(16); // Инициализационный вектор
  const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
  let encryptedData = cipher.update(JSON.stringify(record), 'utf8', 'hex');
  encryptedData += cipher.final('hex');

  return {
    encryptedData,
    iv: iv.toString('hex'),
  };
}

// Функция для дешифрования данных приема
async function decryptMedicalRecord(encryptedRecord, privateKey) {
  const { encryptedData, iv } = encryptedRecord;

  // Шаг 1: Дешифрование данных приема симметричным ключом
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(aesKey, 'hex'),
    Buffer.from(iv, 'hex')
  );
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');

  return JSON.parse(decryptedData);
}

// Тестирование
(async () => {
  // Шифрование данных
  const encryptedRecord = await encryptMedicalRecord(medicalRecord);
  console.log('Зашифрованные данные:', encryptedRecord);

  // Дешифрование данных
  const decryptedRecord = await decryptMedicalRecord(
    encryptedRecord,
    patientPrivateKey
  );
  console.log('Расшифрованные данные:', decryptedRecord);
})();
