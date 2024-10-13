import { Router } from "express";
import { addExerciseCategory, getAllExerciseCategory } from "../controllers/exerciseCategory.controller.js";
import { auth } from "../utils/auth.js";


const router = new Router()

router.route('/add_exercise_category').post(auth, addExerciseCategory)
router.route('/get_all_excercise_category').get(auth, getAllExerciseCategory)


export default router
