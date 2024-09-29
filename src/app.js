import cookieParser from "cookie-parser";
import cors from "cors";
import express from 'express';
import { ApiResponse } from './utils/response.js'
import { ApiError, NotFoundException } from "./utils/apiError.js";


const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json(
    { limit: "16kb" }
))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// import routes
import userRouter from './routes/user.routes.js'
import { refreshToken } from "./utils/auth.js";


// routes declaration
app.use("/api/v1/refresh_token", refreshToken)
app.use("/api/v1/users", userRouter)


// error handling
app.all("*", (req, res, next) => {
    next(new NotFoundException(`${req.url} not found on server`));
})

app.use((error, req, res, next) => {

    // Handle Mongoose Validation Error
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).send(new ApiResponse({
            status: 400,
            message: messages.join('. '),
            data: null
        }));
    }

    // Handle Mongoose Duplicate Key Error (wrapped by Mongoose as a MongoError)
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        const duplicateValue = error.keyValue[duplicateField];

        return res.status(400).send(new ApiResponse({
            status: 400,
            message: `The ${duplicateField} "${duplicateValue}" already exists. Please choose another ${duplicateField}.`,
            data: null
        }));
    }

    // Handle Cast Errors (e.g., invalid ObjectId format)
    if (error.name === 'CastError') {
        return res.status(400).send(new ApiResponse({
            status: 400,
            message: `Invalid ${error.path}: ${error.value}.`,
            data: null
        }));
    }

    // Handle custom ApiErrors
    if (error instanceof ApiError) {
        return res.status(error.statusCode || 500).send(new ApiResponse({
            status: error.statusCode || 500,
            message: error.message,
            data: error.data
        }));
    }

    // Default to handling unknown errors
    res.status(error.statusCode || 500).send(new ApiResponse({
        status: error.statusCode || 500,
        message: error.message || 'Internal Server Error',
        data: error.data || null
    }));
});




export { app };
