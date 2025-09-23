'use strict'

const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
}
const ReasonStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict error',
}

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode);
    }
}

module.exports = {
    ErrorResponse,
    ConflictRequestError,
    BadRequestError
};
