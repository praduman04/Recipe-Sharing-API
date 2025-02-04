import express from "express"
import { login } from "../controllers/auth.js";
import { sendOtp, verifyOtp } from "../controllers/sendOtp.js";
const router=express.Router();
router.post("/login",login);
router.post("/sendotp",sendOtp);
router.post("/verifyotp",verifyOtp)

export default router;