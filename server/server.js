import express from "express";
import cors from "cors";
import connectDB from "./src/config/DB.js";
import "dotenv/config";
import router from "./src/routers/routers.js";

const app = express();
const port = process.env.PORT || 8000;

//DataBase Connection & CLOUDINARY
await connectDB();

//Allow Multiple Origins
const allowedOrigins = ["http://localhost:5173","https://cyberjob-bg.onrender.com"];

//Middleware configuration
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//configuration the Routers
app.use("/api", router);

//API end Point for last
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});
