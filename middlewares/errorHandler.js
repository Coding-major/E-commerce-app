const {customError} = require("../errors/indexErrors")
const {StatusCodes} = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
    
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message;

    if (err instanceof customError) {
        return res.status(err.statusCode).json({msg: err.message})
    }

    if (err.name === "CastError") {
        statusCode = 400;
        message = `please provide a complete value for the id`
    }

    return res.status(statusCode).json({msg: message})
}

module.exports = errorHandler