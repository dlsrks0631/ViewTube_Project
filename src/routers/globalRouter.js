import express from "express"
import { join, login } from "../controllers/userController";
import { trending } from "../controllers/videoController";

const globalRouter = express.Router(); // /login /join /search

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);


export default globalRouter;