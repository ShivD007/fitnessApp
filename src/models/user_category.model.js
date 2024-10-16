import mongoose from "mongoose";


const userExerciseCategory = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        },

        images: [{ type: String }],  // for user provided images

        exercises: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Exercise"
            }
        ]
    }, { timestamps: true }
);

export const UserExerciseCategory = mongoose.model('UserExerciseCategory', userExerciseCategory)



/* Tasks:
 1. Add UserCategory
 2. Add Exercises to cateogry
 3. Not Provising to update Category, only name and description can be changed
 4. delete exercise: If (delete need to inform user and will clear all related logs).
 5. Delete Category: Delete all Related exercise logs (We can give reactivate option with 30 days period),
*/