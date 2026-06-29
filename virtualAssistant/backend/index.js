import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
dotenv.config()
import authRouter from './Routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './Routes/user.routes.js'



const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)




const port = process.env.PORT || 5000;


app.listen(port, () => {
  connectDB();
    console.log("server is running on port " + port);
})
