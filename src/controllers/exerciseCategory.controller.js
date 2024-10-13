import { ExerciseCategory } from "../models/excerciseCategory.model.js";
import { ApiError, NotFoundException } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/response.js";


const addExerciseCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    const exerciseCategory = await ExerciseCategory.create({
        categoryName: name,
        description: description
    })

    if (!exerciseCategory) {
        throw new ApiError({ statusCode: 500, message: "Something went wrong..." })
    }

    res.status(200).json(new ApiResponse({ status: 201, message: "Sucessfully added" }))

});


const getAllExerciseCategory = asyncHandler(async (req, res) => {

    const exerciseCategories = await ExerciseCategory.find()

    if (!exerciseCategories || exerciseCategories === 0) {
        throw new NotFoundException("No data of Exercise Category")
    }


    res.status(200).json(new ApiResponse({ status: 200, message: "Sucessfully get all exercise", data: exerciseCategories }))

})

export { addExerciseCategory, getAllExerciseCategory }