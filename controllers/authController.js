const User = require('../models/user')
const { customError, badRequest, unAuthorized, notFound  } = require("../errors/indexErrors")
const { StatusCodes } = require("http-status-codes")
const {
    attachCookiesToResponse,
    verifyJWT
} = require("../utils/jwt")


const register = async (req, res) => {
    const {email} = req.body
    const emailExist = await User.findOne({email})

    if(emailExist) {
        throw new badRequest("ommoh the email already existrrr")
    }

    const user = await User.create(req.body)
    const userPayload = {name: user.name, userID: user._id}

    attachCookiesToResponse(res, {user: userPayload})
    

    
    console.log(req.cookies);
    res.status(StatusCodes.CREATED).json({user: userPayload})
    
}

const login = async (req, res) => {
    res.send("login naaaaaaa")
}

const logout = async (req, res) => {
    res.send("logout naaaaaaa")
}

module.exports = {
    register,
    login,
    logout
}