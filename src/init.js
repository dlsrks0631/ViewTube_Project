import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 5000;

const handleListening = () => 
    console.log(`Server Listening on Port http://localhost:${PORT} ✅`);

    // 6.11 3:46
app.listen(PORT, handleListening); 