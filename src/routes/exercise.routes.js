import { Router } from "express";
import { addExercise, getAllExercise, getExerciseByID } from "../controllers/excercise.controller.js";
import { auth } from "../utils/auth.js";


const excerciseRouter = new Router()

excerciseRouter.route('/add_exercise').post(auth, addExercise)
excerciseRouter.route('/get_all_exercise').get(auth, getAllExercise)
excerciseRouter.route('get/exercises/:id').get(auth, getExerciseByID)

export default excerciseRouter
