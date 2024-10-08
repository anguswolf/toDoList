import cryptoRandomString from 'crypto-random-string';
import crypto from 'crypto';

class CryptoUtils {
  generateUniqueCode(length, type) {
    return cryptoRandomString({length: length, type: type || 'base64'});
  }
  hashPassword(password) {
    let salt = this.generateUniqueCode(10);
    return {
      password: sha256(password, salt),
      salt: salt,
    };
  }
  compare(value, salt, hashedValue) {
    return salt ? sha256(value, salt) === hashedValue : false;
  }
  generateUrlEncodedCode(length) {
    const code = this.generateUniqueCode(length);
    return encodeURIComponent(code)
  }
}
const sha256 = (value, salt) => {
  return crypto.createHmac('sha256', salt).update(value).digest('hex');
};

export default new CryptoUtils();