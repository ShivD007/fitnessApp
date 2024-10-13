import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const exerciseSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            default: uuidv4,
            required: true,
        },
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
        }
    }, { _id: false });

export const Exercise = mongoose.model("Exercise", exerciseSchema)
