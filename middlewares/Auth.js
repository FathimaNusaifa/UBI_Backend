import jwt from 'jsonwebtoken';

export default function authenticated(req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access denied. No Authentication Token!");

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};