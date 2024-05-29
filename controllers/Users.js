import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
export const getUsers = async(req, res) => {
    try {
        const users = await User.findOne({
            attributes:['name','email', "type", "password"]
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
 
export const Register = async(req, res) => {
    const { name, email, type, password, confPassword } = req.body;
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            name: name,
            email: email,
            type: type,
            password: hashPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.json({ msg: "Registration Successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Registration Failed" });
    }
}
 
export const Login = async(req, res) => {
    try {
        const user = await User.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const name = user[0].name;
        const email = user[0].email;
        const type = user[0].type;
        const accessToken = jwt.sign({ name, email, type}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15m'
        });
        const refreshToken = jwt.sign({ name, email, type}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email not found"});
    }
}
 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}