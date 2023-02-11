import express from "express";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view"); //localhost:5000/api/videos/:id/view

export default apiRouter;