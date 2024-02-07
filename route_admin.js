import express from "express";
import { addAdmin, adminLogin, deleteAdmin, getAdminById, getAllAdmins } from "./controller_admin.js";
const adminrouter=express.Router();
adminrouter.post("/signup",addAdmin);
adminrouter.post("/login",adminLogin);
adminrouter.get("/", getAllAdmins);
adminrouter.get('/:id', getAdminById);
adminrouter.delete("/:id", deleteAdmin);
export default adminrouter