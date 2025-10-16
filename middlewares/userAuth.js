

const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError'); 

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const userAuth = (req, res, next) => {
  try {
    // Get token from Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('Authorization token missing or malformed', 401));
    }

    const token = authHeader.split(' ')[1];

    if(!token){
      return next(new AppError('User is not authenticated',401))
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user payload to request object for later use
    req.user = decoded;

    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token', 401));
  }
};

module.exports = userAuth;