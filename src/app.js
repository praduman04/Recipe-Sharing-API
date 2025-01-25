import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./utils/connectDB.js";
import UserRoutes from "../src/routes/user.js"
dotenv.config()
const app=express();
app.use(express.json());
app.use("/api/v1/user",UserRoutes)
connectDB()
app.listen(3000,()=>{
    console.log("server started")
})