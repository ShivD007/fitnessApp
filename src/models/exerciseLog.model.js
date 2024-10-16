import mongoose, { Schema } from "mongoose";
import { exerciseSetSchema, hybridSetSchema } from "./set_type.model.js"



// Embedded/ Subdocuments
const exerciseEntry = new mongoose.Schema(
    {
        exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise'
        },
        hybridSets: hybridSetSchema,
        sets: [exerciseSetSchema]
    }
)


const exerciseLogSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    exercises: [exerciseEntry],
    userCategoryRef: {
        type: mongoose.Schema.Types.ObjectId //this is for checking which category user is adding data to
    },
}, { timestamps: true });

export const ExerciseLogModel = mongoose.model("ExerciseLog", exerciseLogSchema)




/* Tasks:
 1. Get exerciseLog  -- By date, by month by userCateogry
 2. Need to Update User Category with PR (Whenever user entered new PR) : Little Complex so will take it up later
3. update
4. delete
*/