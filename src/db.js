import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.DB_URL);
// mongoose.connect("mongodb://127.0.0.1:27017/wetubedb", {
//   useNewUrlParser: true,
//   useUnifiedTopoloy: true,
// });

const db = mongoose.connection;

const handleOpen = () => console.log("✅Connected to DB");
const handleError = () => console.log("❌DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
