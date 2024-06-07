const crypto = require('crypto');

const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const jwtSecret = generateJWTSecret();
console.log('JWT Secret Key:', jwtSecret);
