import jwt from "jsonwebtoken";
import BookDetail from '../models/CsvModel.js';
 
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

export const authorizeName = async (req, res, next) => {
    try {
        const id = req.params.id;
        const book = await BookDetail.findByPk(id);

        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        if (req.user.name !== book.author) {
            return res.status(403).json({ msg: 'Forbidden: Only the author can modify this book.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};