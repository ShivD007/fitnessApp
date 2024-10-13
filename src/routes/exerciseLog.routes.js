import { Router } from "express";
import { auth } from "../utils/auth.js";
import { addExerciseLog } from "../controllers/exerciseLog.controller.js";


const router = new Router();

router.route("/add_exercise_log").post(auth, addExerciseLog)

export default router