const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Header se token nikalna
    const token = req.header('x-auth-token');

    // 2. Agar token nahi hai, toh access deny kar do
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied for PrepForge portal' });
    }

    // 3. Token verify karna
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // User ki ID request mein daal di
        next(); // Agle function (route) par bhej do
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};