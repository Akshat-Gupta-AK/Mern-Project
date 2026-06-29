import jwt from 'jsonwebtoken';


const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("cookies",req.cookies);
    console.log("token",req.cookies.token);
    if (!token) {
        return res.status(400).json({ message: "Token not found" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.userId;
    next();
    console.log("cookies", req.cookies);
  } catch (error) {
    return res.status(500).json({ message: "Authentication error" });
  }
}

export default isAuth;