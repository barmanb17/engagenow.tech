import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import authRoutes from "../server/routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API is running.....");
});


const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, ()=> {
        console.log(`Server is running on https://localhost:${PORT}`)
    })
}).catch((err) => {
    console.error("MongoDB connection faliled:", err);
})