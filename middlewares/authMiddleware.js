// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
  auth: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'));
      req.user = decoded.user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  },
  role: (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  }
};
