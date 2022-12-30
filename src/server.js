import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";


const PORT = 5000;

const app = express();
const logger = morgan("dev");
app.use(logger)


app.use("/", globalRouter);
app.use("/videos", videoRouter); // 누군가 와서 /videos로 시작하는 url을 찾는다면 videoRouter로 들어감
app.use("/users", userRouter);


const handleListening = () => 
    console.log(`Server Listening on Port http://localhost:${PORT} 💡`);

app.listen(PORT, handleListening);
