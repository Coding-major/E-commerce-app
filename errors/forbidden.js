const customError = require("./customError");
const {StatusCodes} = require("http-status-codes")

class forbidden extends customError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = forbidden;