import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const exerciseCategory = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            default: uuidv4
        },
        categoryName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }

    }, { _id: false }
);

export const ExerciseCategory = mongoose.model('ExerciseCategory', exerciseCategory)