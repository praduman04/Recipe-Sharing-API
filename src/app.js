import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./utils/connectDB.js";
import UserRoutes from "../src/routes/user.js";
import loginRoutes from "../src/routes/auth.js";
import recipeRoutes from "./routes/recipe.js"
dotenv.config()
const app=express();
app.use(express.json());
app.use("/api/v1/user",UserRoutes)
app.use("/api/v1/auth",loginRoutes)
app.use("/api/v1/recipe",recipeRoutes)
connectDB()
app.listen(3000,()=>{
    console.log("server started")
})