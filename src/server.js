import express from "express";
import morgan from "morgan";

const app = express();
const logger = morgan("dev");
const PORT = 5000;

const home = (req, res) => {
    console.log("I will respond.");
    return res.send("hello");
};

const login = (req, res) => {
    return res.send("login");
};
app.use(logger)
app.get("/", home);
app.get("/login", login);
const handleListening = () => 
    console.log(`Server Listening on Port http://localhost:${PORT} 💡`);

app.listen(PORT, handleListening);
