import asyncHandler from "../utils/asyncHandler.js";
import { BadRequestException, ApiError, NotFoundException, UnauthorizedException } from "../utils/apiError.js";
import { ApiResponse } from "../utils/response.js";
import { User } from "../models/user.model.js";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, SALT } from "../constants.js";
import bcypt from "bcrypt"
import jwt from "jsonwebtoken"
import { genrateToken } from "../utils/auth.js";


const registerUser = asyncHandler(
    async (req, res, next) => {

        const { username, email, password } = req.body

        if ([username, email, password].some((field) => !field || (typeof field === 'string' && field.trim() === ""))) {
            throw new BadRequestException("All Fields are required");
        }

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existedUser) {
            throw new ApiError({ statusCode: 409, message: "User already exist" })
        }

        const hashpassword = await bcypt.hash(password, SALT)

        const user = await User.create({
            username,
            email,
            password: hashpassword
        })

        const createdUser = await User.findById(user._id).select("-password")

        if (!createdUser) {
            throw new ApiError({ statusCode: 500, message: "Something went wrong" })
        }

        console.log(req.originalUrl)
        console.log(username)
        console.log(createdUser)
        res.status(200).json(new ApiResponse({ status: 200, message: "Sucess", data: createdUser }))
    }

)

const login = asyncHandler(async (req, res, next) => {

    const { username, password } = req.body

    if ([username, password].some((field) => !field || (typeof field === "String" && field.trim() === ""))) {
        throw new BadRequestException("All Fields are required")
    }

    const existUser = await User.findOne({ username })

    if (!existUser) {
        throw new NotFoundException("User not exist")
    }

    if (!(bcypt.compare(password, existUser.password))) {
        throw new UnauthorizedException("UnauthorizedException")
    }

    const accessToken = genrateToken(existUser, ACCESS_TOKEN_EXPIRY)
    const refreshToken = genrateToken(existUser, REFRESH_TOKEN_EXPIRY)


    res.status(200).json(new ApiResponse({
        status: 200, message: "login successfully", data: {
            accessToken,
            refreshToken
        }
    }))

})


const getUsers = asyncHandler(async (req, res, next) => {

    const user = await User.find()

    res.status(200).json(new ApiResponse({
        status: 200, message: "login successfully", data: user
    }))

})

export { registerUser, login, getUsers }