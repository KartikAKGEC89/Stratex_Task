import jwt from "jsonwebtoken";
 
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.user = decoded;
        next();
    })
}

export const authorizeSeller = (req, res, next) => {
    if (req.user.type !== 'seller') {
        return res.status(403).json({ msg: 'Forbidden: Only sellers can upload files.' });
    }
    next();
};