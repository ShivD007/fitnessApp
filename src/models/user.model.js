import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {

        // removing user name, otherwise we need to validate username for user when he enters 
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password must be required"],
        },
        weight: {
            type: Number
        },
        heightInCms: {
            type: Number
        }

    }, { timestamps: true }
);


export const User = mongoose.model("User", userSchema)