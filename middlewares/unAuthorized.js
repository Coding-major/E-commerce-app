const verifyJWT = require("../utils/jwt")
const unAuthorized = require("../errors/unAuthorized")

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.my_token;
    if(!token) {
        console.log("no token present")
    } else {
        console.log("Token is present");
    }

    
    next()
}

module.exports = authenticateUser