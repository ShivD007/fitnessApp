import { Exercise } from "../models/exercise.model.js";
import { ExerciseLogModel } from "../models/exerciseLog.model.js";
import { User } from "../models/user.model.js";
import { BadRequestException, NotFoundException } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/response.js";



const addExerciseLog = asyncHandler(async (req, res) => {

    const { date, exercises, userID } = req.body;

    if (!exercises || exercises.length === 0 || !userID) {
        throw new BadRequestException("UserID and excercise is required")
    }

    const user = await User.findById(userID)

    if (!user) {
        throw new BadRequestException("No user associate with this ID")
    }


    const excercisesEntries = await Promise.all(exercises.map(async (exercise) => {

        const { exerciseID, duration, sets, reps } = exercise;

        const exerciseExist = await Exercise.findById(exerciseID).populate('category');

        if (!exerciseExist) {
            throw new NotFoundException(`No exercise associate with this id : ${exerciseID}`)
        }

        return {
            exercise: exerciseID,
            duration,
            sets,
            reps
        }
    }))

    const exerciseLog = await ExerciseLogModel.create({
        date: date,
        exercises: excercisesEntries,
        user: userID
    })


    res.status(200).json(new ApiResponse({ status: 201, message: "Successfully added log", data: exerciseLog }))

})



export { addExerciseLog }