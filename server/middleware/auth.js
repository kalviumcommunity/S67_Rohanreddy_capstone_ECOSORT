import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if the token is provided in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      // Proceed to the next middleware/route handler
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If there's no token
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
