const {verifyJWT} = require("../utils/jwt")
const { unAuthorized,forbidden } = require("../errors/indexErrors")

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.my_token;

    if(!token) {
        throw new unAuthorized("Authentication invalid")
    }

    try {
        const {name, userID, role} = verifyJWT(token);
        req.user = {name, userID, role}
        next()
    } catch (error) {
        throw new unAuthorized("Authentication invalid")
    }    
}

const authorizeUser = async (req, res, next) => {
    if (req.user.role !== "admin") {
        throw new forbidden("you don't have access, only admin can access")
    }
    next()
}

module.exports = {
    authenticateUser,
    authorizeUser
}