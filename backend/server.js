import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log("Server is running in port:", PORT);
    connectMongoDB();
});
