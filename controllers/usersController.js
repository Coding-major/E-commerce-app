const User = require("../models/user")
const {StatusCodes} = require("http-status-codes")
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
    res.status(StatusCodes.OK).json({msg: req.user})
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
    updateUserPassword
}