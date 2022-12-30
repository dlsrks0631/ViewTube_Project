import express from "express"
import { see, edit, upload, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();  // videos/watch 

videoRouter.get("/upload", upload);
videoRouter.get("/:id", see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;
