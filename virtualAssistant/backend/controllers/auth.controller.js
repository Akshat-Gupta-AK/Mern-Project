import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import genToken  from '../config/token.js';

export const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: "Email already exists" });
        } 
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        } 
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
          name, email, password: hashedPassword
        });

        const token = await genToken(user._id);
         res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            sameSite:"None",
            secure:true,
            path:"/"

        });


        return res.status(201).json(user);
  }catch (error) {
    res.status(500).json({ message: "Signup error" });
   }
}



export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user= await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
              sameSite:"None",
            secure:true
        });
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Login error" });
    }
};



export const Logout = async (req, res) => { 
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Logout error" });
    } 
} 
          
