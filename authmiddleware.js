const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.createJWT = (payload) => {
    return jwt.sign({ ...payload }, JWT_SECRET, { expiresIn: '1h' });
};

exports.verifyJWTToken = (token) => {
    try {
        const decode = jwt.verify(token, JWT_SECRET);
        return decode;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ status: false, message: 'Access denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ status: false, message: 'Invalid token' });
        req.user = user;
        next();
    });
}

module.exports = { createJWT, verifyJWTToken, authenticateToken };
