const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    try {
        // Extract token without 'Bearer '
        const decoded = jwt.verify(token.substring(7), 'your_secret_key');
        req.admin = decoded;
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
