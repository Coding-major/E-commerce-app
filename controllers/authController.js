const User = require('../models/user')
const { customError, badRequest, unAuthorized, notFound  } = require("../errors/indexErrors")
const { StatusCodes } = require("http-status-codes")
const {
    attachCookiesToResponse,
    verifyJWT
} = require("../utils/jwt")


const register = async (req, res) => {
    const {email, password, name} = req.body

    if (!email || !password || !name) {
        throw new badRequest("please fill in the forms where necessary")
    }

    const emailExist = await User.findOne({email})

    if(emailExist) {
        throw new badRequest("ommoh the email already existrrr")
    }

    const user = await User.create(req.body)
    const userPayload = {name: user.name, userID: user._id}

    attachCookiesToResponse(res, {user: userPayload})
    


    res.status(StatusCodes.CREATED).json({user: userPayload})
    
}

const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new badRequest("please fill in the forms where necessary")
    }

    const user = await User.findOne({email})

    if(!user) {
        throw new notFound("user with that email does not exist")
    }

    const isCorrect = user.comparePassword(password)

    if (!isCorrect) {
        throw new unAuthorized("password is not correct")
    }

    const userPayload = {name: user.name, userID: user._id}
    attachCookiesToResponse(res, {user: userPayload})

    res.status(StatusCodes.CREATED).json({user: userPayload})

    

}

const logout = async (req, res) => {
    res.send("logout naaaaaaa")
}

module.exports = {
    register,
    login,
    logout
}