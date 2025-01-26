import express from "express"
import { createUser, deleteUser, search, updateUser, viewUser} from "../controllers/user.js";
const Router=express.Router();
Router.post("/new",createUser);
Router.patch("/update/:id",updateUser);
Router.get("/view/:id",viewUser);
Router.delete("/delete/:id",deleteUser)
Router.get("/search",search)


export default Router