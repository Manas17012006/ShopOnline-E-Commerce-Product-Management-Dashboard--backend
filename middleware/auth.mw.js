require('dotenv').config();
const jwt = require('jsonwebtoken');

async function userauth(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Please Login to get started!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; 
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}

module.exports = { userauth };
