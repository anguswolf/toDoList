import cryptoRandomString from 'crypto-random-string'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {privateKey, publicKey} from '../const/const.js';
//import UnauthorizedException from '../exception/UnathorizedException.js';

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

  generateTokens (user) {
    return {
      accessToken: generateToken(user, 86400),//1 day
      refreshToken: generateToken(user, 7776000),// 3months
    }
  }
}
 
const sha256 = (value, salt) => {
  return crypto.createHmac('sha256', salt).update(value).digest('hex');
};

const generateToken = (user, expiration) => {
  return jwt.sign(
    {
      email: user.email,
      subject: user._id,
      displayName: user.name,
      expiration: expiration,
    },
    privateKey,
    {
      expiresIn: expiration,
      algorithm: 'RS256',
    }
  )
}
export default new CryptoUtils();