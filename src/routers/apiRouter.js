import express from "express";
import { registerView, createComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView); //localhost:5000/api/videos/:id/view
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment); // comment를 위 링크로 보냄

export default apiRouter;
