const User = require('../models/user')
const { customError, badRequest, unAuthorized, notFound  } = require("../errors/indexErrors")
const { StatusCodes } = require("http-status-codes")
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const {
    createTokenUser,
    attachCookiesToResponse,
} = require("../utils/index")

const verifyEmail = async (req, res) => {
    const {email, verificationToken} = req.body;

    const user = await User.findOne({email})

    if(!user) {
        throw new notFound("no user with that email exist")
    }

    if (user.isVerified) {
        throw new badRequest('Already verified')
    }

    if (verificationToken != user.verificationToken) {
        throw new unAuthorized('wrong verifiication token provided')
    }

    user.isVerified = true;
    user.verified = Date.now()
    verificationToken = ''
    await user.save();

    res.status(StatusCodes.OK).json({msg: "email verified"})
}

const register = async (req, res) => {
    const {email, password, name, role} = req.body

    if (!email || !password || !name) {
        throw new badRequest("please fill in the forms where necessary")
    }

    const emailExist = await User.findOne({email})

    if(emailExist) {
        throw new badRequest("ommoh the email already existrrr")
    }

    const verificationToken = crypto.randomBytes(40).toString('hex');
    const user = await User.create({
        email,
        password,
        name,
        role,
        verificationToken
    })

    await sendEmail()

    res.status(StatusCodes.CREATED).json({user})
    
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

    const userPayload = createTokenUser(user)
    attachCookiesToResponse(res, userPayload)

    res.status(StatusCodes.CREATED).json({user: userPayload})

}

const logout = async (req, res) => {
    res.cookie("my_token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(StatusCodes.OK).json({msg: "user logout"})
}

module.exports = {
    verifyEmail,
    register,
    login,
    logout
}