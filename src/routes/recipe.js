import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createRecipe, getRecipe, rateRecipe, saveRecipe, serachRecipe } from "../controllers/recipe.js";
const router=express.Router();
router.post("/new",verifyToken,createRecipe);
router.get("/view/:id",verifyToken,getRecipe);
router.get("/search",verifyToken,serachRecipe);
router.patch("/rate/:id",verifyToken,rateRecipe);
router.patch("/save/:id",verifyToken,saveRecipe)

export default router;