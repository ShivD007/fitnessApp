import { Router } from "express";
import { registerUser, login, getUsers } from "../controllers/user.controller.js";
import { auth } from "../utils/auth.js"

const router = new Router()

router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/getUsers").get(auth, getUsers)

export default router

