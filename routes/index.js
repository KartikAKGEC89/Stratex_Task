import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { authorizeName, authorizeSeller, verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { create, deleteBook, getbook, updatebook } from "../controllers/BookDeatils.js";
import { deepdetails, retrivebook } from "../controllers/RetriveBooks.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.post('/create', verifyToken, authorizeSeller, create);
router.get('/books/:id',  verifyToken, authorizeSeller, authorizeName, getbook)
router.delete('/books/:id',  verifyToken, authorizeSeller,authorizeName, deleteBook);
router.put('/update/:id', verifyToken, authorizeSeller, authorizeName, updatebook);
router.get('/retrive', retrivebook);
router.get('/retrive/:title', deepdetails);
 
export default router;