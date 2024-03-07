const {customError} = require("../errors/indexErrors")
const {StatusCodes} = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message;

    if (err instanceof customError) {
        return res.status(err.statusCode).json({msg: err.message})
    }

    return res.status(statusCode).json({msg: message})
}