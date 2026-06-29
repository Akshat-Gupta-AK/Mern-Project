import express from 'express';
import isAuth from '../middleware/isAuth.js';
import {askToAssistant, getCurrentUser }from '../controllers/user.controller.js';
import {updateAssistant} from '../controllers/user.controller.js';
import upload from '../middleware/multer.js';


const userRouter = express.Router();


userRouter.get("/current",isAuth, getCurrentUser);
userRouter.post("/update",isAuth,upload.single("assistantImage"), updateAssistant);
userRouter.post("/asktoassistent",isAuth,askToAssistant)

export default userRouter; 