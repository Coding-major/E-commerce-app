const {verifyJWT} = require("../utils/jwt")
const unAuthorized = require("../errors/unAuthorized")

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.my_token;

    if(!token) {
        throw new unAuthorized("Autentication invalid")
    }

    try {
        const {name, userID, role} = verifyJWT(token);
        req.user = {name, userID, role}
        next()
    } catch (error) {
        throw new unAuthorized("Authentication invalid")
    }
    
    
}

module.exports = authenticateUser