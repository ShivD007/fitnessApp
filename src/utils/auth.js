import { ApiError, BadRequestException, UnauthorizedException, TokenExpiredException } from "./apiError.js";
import jwt from 'jsonwebtoken'
import asyncHandler from "./asyncHandler.js";
import { ApiResponse } from "./response.js";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, } from "../constants.js";

export const auth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['authorization']?.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err.name === "TokenExpiredError") {
                next(new TokenExpiredException());
            } else {
                next(new BadRequestException(error.message));
            }
        });
    } else {
        next(new BadRequestException("Forbidden- No token provided."))
    }
}



export const genrateToken = (user, expiresIn) => {
    return jwt.sign({ username: user.username, email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn })
}









