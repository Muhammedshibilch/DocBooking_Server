const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json('Access denied. No token provided.');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTPASSWORD);
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    res.status(400).json('Invalid token.');
  }
};

module.exports = jwtMiddleware;