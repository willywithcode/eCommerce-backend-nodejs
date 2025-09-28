'use strict'

const StatusCode = {
    OK: 200,
    CREATED: 201,
}
const ReasonStatusCode = {
    CREATED: 'Created',
    OK: 'OK',
}

class SuccessResponse {
    constructor({ message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {} }) {
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.reasonStatusCode = reasonStatusCode;
    }
    send(res, header = {}) {
        return res.status(this.status).json(this);
    }
}
class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}

class CREATED extends SuccessResponse {
    constructor({message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata, options = {}}) {
        super({ message, statusCode, reasonStatusCode, metadata });
        this.options = options;
    }
}

module.exports = {
    OK, 
    CREATED,
    SuccessResponse
}

