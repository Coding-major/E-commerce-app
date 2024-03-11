const customError = require("./customError")
const notFound = require("./notFound")
const unAuthorized = require("./unAuthorized")
const badRequest = require("./badRequest")
const forbidden = require("./forbidden")

module.exports = {
    customError,
    notFound,
    unAuthorized,
    badRequest,
    forbidden
}