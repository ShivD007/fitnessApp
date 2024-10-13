import { ExerciseCategory } from "../models/excerciseCategory.model.js";
import { Exercise } from "../models/exercise.model.js";
import { ApiError, BadRequestException, NotFoundException } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/response.js";



const addExercise = asyncHandler(async (req, res) => {

    const { name, description, categoryID } = req.body;

    const excerciseCategory = await ExerciseCategory.findById(categoryID)

    if (!excerciseCategory) {
        throw new BadRequestException("No Catergory is associated with this ID")
    }


    const addExercise = await Exercise.create({
        exerciseName: name,
        decription: description,
        category: categoryID
    })

    if (!addExercise) {
        throw new ApiError({ statusCode: 500, message: "Something went wrong...." })
    }

    res.status(200).json(new ApiResponse({
        status: 200,
        message: "Sucessfully added excercise"
    }))

})

const getAllExercise = asyncHandler(async (req, res) => {

    const exercises = await Exercise.find().populate().populate("category")

    if (!exercises || exercises.length === 0) {
        throw new NotFoundException({ message: "No exercises found" })
    }

    res.status(200).json(new ApiResponse({
        status: 200, message: "Succesfully get all exercises",
        data: exercises

    }))

})


const getExerciseByID = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const exercise = await Exercise.findById(id).populate("category")

    if (!exercise) {
        throw new NotFoundException("Exercise not found")

    }

    res.status(200).json(new ApiResponse({ status: 200, message: "Successfully get exercise", data: exercise }))

})


export { addExercise, getAllExercise, getExerciseByID } 