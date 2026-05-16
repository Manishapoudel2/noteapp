const jwt = require('jsonwebtoken')
const SECRETKEY = process.env.SECRETKEY;
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token required" })

    }

    try {
        const decoded = jwt.verify(token, SECRETKEY)
        req.user = decoded;
        next()
    } catch (err) {
        console.log("error")
        return res.status(401).json({ message: "Token required" });
    }
};
module.exports = verifyToken; 