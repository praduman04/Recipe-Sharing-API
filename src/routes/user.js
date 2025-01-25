import express from "express"
import { createUser, deleteUser, updateUser, viewUser} from "../controllers/user.js";
const Router=express.Router();
Router.post("/new",createUser);
Router.patch("/update/:id",updateUser);
Router.get("/view/:id",viewUser);
Router.delete("/delete/:id",deleteUser)


export default Router