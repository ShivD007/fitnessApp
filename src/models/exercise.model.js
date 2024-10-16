import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const exerciseSchema = new mongoose.Schema(
    {
        exerciseName: {
            type: String,
            required: true
        },
        decription: {
            type: String,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'ExerciseCategory',
            required: true
        },
        images: [{
            type: String,
            // this may be useful if in case we find any api that provides video or gif url
        }]
    }, { timestamps: true });

export const Exercise = mongoose.model("Exercise", exerciseSchema)



/* Tasks:
 1. Get All Exercise     -- Need Pagaination
 2. Get Exercise by id
 3. Get Exercises by category  -- Need Pagination
 4. Search By Exercise Name  -- Need Pagination

 For Admin:
 1. Add Exercise
 2. update Exercise
 3. delete Exercise

 */
