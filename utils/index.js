const jwt = require('jsonwebtoken');

// Generates a JWT token based on the user ID and any other parameter you want to sign the JWT with
const generateAuthToken = (userId, role) => {
    const token = jwt.sign({ userId, role}, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
    return token;
  };

module.exports={
    generateAuthToken
}