
class ApiError extends Error {
    constructor(
        { statusCode,
            message = "Something went wrong",
            errors = [],
            stack = "" }
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }

}


class BadRequestException extends ApiError {
    constructor(
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super({ statusCode: 400, errors, message, stack })
    }
}

class UnauthorizedException extends ApiError {
    constructor(
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super({ statusCode: 401, errors, message, stack })
    }
}

class NotFoundException extends ApiError {
    constructor(
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super({ statusCode: 404, errors, message, stack })
    }
}

class LimitExceededException extends ApiError {
    constructor(
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super({ statusCode: 408, errors: errors, message, stack })
    }
}


export { BadRequestException, LimitExceededException, NotFoundException, UnauthorizedException }

