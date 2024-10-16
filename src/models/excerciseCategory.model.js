import mongoose from "mongoose";

const exerciseCategory = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        categoryImage: {
            type: String
        }

    }, { timestamps: true }
);

export const ExerciseCategory = mongoose.model('ExerciseCategory', exerciseCategory)



/* Tasks:   Need to check if we manually enter these categories to database?
 1. Get All Categories
 2. Search by categoryName   
 
 For Admin:  
 1. Add Category
 2. update Category
 3. delete Category
*/