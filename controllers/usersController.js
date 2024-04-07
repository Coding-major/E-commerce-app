const User = require("../models/user")
const {StatusCodes} = require("http-status-codes")
const {
    createTokenUser,
    verifyJWT,
    attachCookiesToResponse,
} = require("../utils/index")
const {
    customError,
    notFound,
    unAuthorized,
    badRequest
} = require("../errors/indexErrors")

const getAllUsers = async (req, res) => {
    console.log(req.user)
    const users = await User.find({role: "user"}).select("-password")
    if (!users) {
        throw new notFound("No users in the list")
    }
    res.status(StatusCodes.OK).json({msg: users})
}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({_id: req.params.id}).select("-password")
    
    if (!user) {
        throw new notFound("user with that id does not exist")
    }
    res.status(StatusCodes.OK).json({msg: user})
}


const showCurrentUser = async (req, res) => {
    const user = req.user
    res.status(StatusCodes.OK).json({msg: user})
}

const updateUser = async (req, res) => {
    const {email, name} = req.body;
    if (!email || !name) {
        throw new badRequest("please provide the email or name")
    }

    // const user = await User.findOneAndUpdate({_id: req.user.userID}, {email, name}, {
    //     new: true,
    //     runValidators: true
    // })

    const user = await User.findOne({_id: req.user.userID})
    user.email = email;
    user.name = name;

    await user.save()

    const myToken = createTokenUser(user)
    console.log(myToken)
    attachCookiesToResponse(res, myToken)
    res.status(StatusCodes.OK).json({msg:"you did well", user: myToken})
}

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword, newPasswordAgain } = req.body;
    if (!oldPassword || !newPassword || !newPasswordAgain) {
        throw new badRequest("please enter a value")
    }

    
    const user = await User.findOne({_id: req.user.userID})
    
    const isCorrect = await user.comparePassword(oldPassword)
    if (!isCorrect) {
        throw new unAuthorized("invalid credentials")
    }

    if (newPassword !== newPasswordAgain) {
        throw new unAuthorized("both new password does not match")
    }

    user.password = newPassword

    await user.save()
    res.status(StatusCodes.OK).json({msg: "password change successful"})


}


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}