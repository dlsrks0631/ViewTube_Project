import express from "express"
import {edit, remove} from "../controllers/userController";
const userRouter = express.Router();   // users/edit   users/delete

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);

export default userRouter;