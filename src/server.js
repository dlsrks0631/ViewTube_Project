import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);

// 서버에게 제공한 middleware로 덕분에 서버가 form으로부터 오는 data를 이해할 수 있는 것
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // 텍스트를 json으로 다시 변환해서 백엔드에서 사용할 거라고 이해하는 것


console.log(process.env.COOKIE_SECRET);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(flash());
app.use(localsMiddleware);

app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

// Express에게 만약 누군가 /uploads로 가려고 한다면 uploads폴더의 내용을 보여쥬라 !!
app.use("/uploads", express.static("uploads")); // express.static(노출시키고 싶은 폴더명)
app.use("/static", express.static("assets")); // express.static(노출시키고 싶은 폴더명)

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;
