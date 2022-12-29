import express from "express";

const app = express();
const PORT = 5000;

const logger = (req, res, next) => {
    console.log(`Someone is going to: ${req.url}`);
    next();
}

const handleHome = (req, res) => {
    return res.send("I love middlewares");
};

app.get("/", logger, handleHome);

const handleListening = () => 
    console.log(`Server Listening on Port http://localhost:${PORT} 💡`);

app.listen(PORT, handleListening);
