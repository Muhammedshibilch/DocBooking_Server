// const jwt = require('jsonwebtoken');

// const jwtMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   const token = authHeader.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWTPASSWORD);
//     req.userId = decoded.userId; 
//     next();
//   } catch (err) {
//     return res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// module.exports = jwtMiddleware;
const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No authHeader provided');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTPASSWORD);
    console.log("Decoded Token:", decoded);  // Debug log
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("Token verification error:", err);  // Debug log
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = jwtMiddleware;


