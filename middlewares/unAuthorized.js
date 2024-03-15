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

const authorizeUser = (...rolesParameters) => {
    return (req, res, next) => {
        if (!rolesParameters.includes(req.user.role)) {
            throw new forbidden("you are forbidden to access this data as you are not an admin")
        }
        
        next()
    }
}

const authorizeGettingSingleUSer = (...rolesParameters) => {
    return (req, res, next) => {
        if ( !rolesParameters.includes(req.user.role)) {
            if (req.user.userID !== req.params.id) {
                throw new forbidden("you are not allowed to view it")
            }    
        }
        next()
    }
}

module.exports = {
    authenticateUser,
    authorizeUser,
    authorizeGettingSingleUSer
}