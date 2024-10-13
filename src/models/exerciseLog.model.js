import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";


// Embedded/ Subdocuments
const exerciseEntry = new mongoose.Schema(
    {
        exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise'
        },
        duration: {
            type: Number,
            required: true
        },
        sets: {
            type: Number,
            required: true
        },
        reps: {
            type: Number,
            required: true,
        }
    }
)


const exerciseLogSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    exercises: [exerciseEntry],

}, { _id: false });

export const ExerciseLogModel = mongoose.model("ExerciseLog", exerciseLogSchema) 