import { ApiError, BadRequestException, UnauthorizedException } from "./apiError.js";
import jwt from 'jsonwebtoken'
import asyncHandler from "./asyncHandler.js";
import { ApiResponse } from "./response.js";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, } from "../constants.js";

export const auth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['authorization']?.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                console.log(err)
                next(new ApiError({ statusCode: 401, message: 'unauthorized - Failed to authenticate token.' }));
            } else {

                next()
            }
        });
    } else {
        next(new ApiError({ statusCode: 401, message: 'Forbidden- No token provided.' }));
    }
}

export const genrateToken = (user, expiresIn) => {
    return jwt.sign({ username: user.username, email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn })
}

export const refreshToken = asyncHandler(async (req, res) => {

    const { refreshToken } = req.body

    if (!refreshToken) {
        throw new BadRequestException("Pass required parameters")
    }

    jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err)
            throw new UnauthorizedException("Invalid refresh token");
        }

        const accessToken = genrateToken(user, ACCESS_TOKEN_EXPIRY)
        const refreshToken = genrateToken(user, REFRESH_TOKEN_EXPIRY)

        res.status(200).json(new ApiResponse({
            status: 200,
            message: "Token refreshed",
            data: { accessToken, refreshToken }

        }
        ))

    });

})
