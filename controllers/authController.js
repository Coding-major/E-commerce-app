const User = require('../models/user')
const { customError, badRequest, unAuthorized, notFound  } = require("../errors/indexErrors")
const { StatusCodes } = require("http-status-codes")
const crypto = require('crypto')
const {
    createTokenUser,
    attachCookiesToResponse,
    sendVerification
} = require("../utils/index")
const bcrypt = require("bcryptjs")

const verifyEmail = async (req, res) => {
    const {email, verificationToken} = req.body;

    const user = await User.findOne({email})

    if(!user) {
        throw new notFound("no user with that email exist")
    }

    if (user.isVerified) {
        throw new badRequest('The account is already verified',
        )
    }

    if (verificationToken != user.verificationToken) {
        throw new unAuthorized('wrong verifiication token provided')
    }

    await User.findOneAndUpdate({email}, { verified: Date.now(), isVerified: true})
    // user.isVerified = true;
    // user.verified = Date.now()
    // verificationToken = ''
    // await user.save();

    res.status(StatusCodes.OK).json({msg: "email verified"})
}

const register = async (req, res) => {
    const {email, password, name, role} = req.body

    if (!email || !password || !name) {
        throw new badRequest("you dey craze, fill the form jare")
    }

    const emailExist = await User.findOne({email})

    if(emailExist) {
        throw new badRequest("ommoh the email already exist, shey you go like login")
    }

    const verificationToken = crypto.randomBytes(40).toString('hex');
    const user = await User.create({
        email,
        password,
        name,
        role,
        verificationToken
    })
    const origin = "http://localhost:3000"

    await sendVerification({
        name: user.name,
        email: user.email,
        verificationToken: user.verificationToken,
        origin
    });

    res.status(StatusCodes.CREATED).json({msg: 'please check your email for verification'})
    
}

const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new badRequest("you be dan iska?, fill the form jare")
    }

    const user = await User.findOne({email})

    if(!user) {
        throw new notFound("Dear idiot oyu no get Account, kuku register")
    }

    if (user.isVerified != true) {
        throw new unAuthorized("verify your account if you no wan die")
    }
    //const isCorrect = user.comparePassword(password)

    // if (!isCorrect) {
    //     throw new unAuthorized("password is not correct")
    // }


    // const salt = await bcrypt.genSalt(10)
    // const hashedPasssword = await bcrypt.hash(password, salt)

    const isCorrect = await bcrypt.compare(password, user.password)

    if (!isCorrect) {
        throw new unAuthorized("password is not corrector")
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