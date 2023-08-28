import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '!@#$%');
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
