import express from "express"
import { edit, remove, logout, see } from "../controllers/userController";
const userRouter = express.Router();   // users/edit   users/delete

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get(":id", see);

export default userRouter;