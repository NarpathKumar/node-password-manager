const CryptoJS = require('crypto-js');
const AES = require('crypto-js/aes');


var encryptedAES = CryptoJS.AES.encrypt("Message", "My Secret Passphrase").toString();
console.log(encryptedAES)
var decryptedBytes = CryptoJS.AES.decrypt(encryptedAES, "My Secret Passphrase");
console.log(decryptedBytes)
var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8)
console.log(plaintext)