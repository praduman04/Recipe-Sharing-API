import express from "express"
import { createUser, deleteUser, search, updateUser, viewUser} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const Router=express.Router();
Router.post("/new",createUser);
Router.patch("/update/",verifyToken,updateUser);
Router.get("/view/:id",viewUser);
Router.delete("/delete/",verifyToken,deleteUser)
Router.get("/search",search)


export default Router