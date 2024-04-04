const crypto = require('crypto');

// Generate a random JWT secret key
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Usage
const jwtSecret = generateJWTSecret();
console.log('JWT Secret Key:', jwtSecret);
