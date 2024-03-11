const User = require("../models/user")
const {StatusCodes} = require("http-status-codes")
const {
    customError,
    notFound,
    unAuthorized,
    badRequest
} = require("../errors/indexErrors")

const getAllUsers = async (req, res) => {
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
    res.json({msg: "current user"})
}

const updateUserPassword = async (req, res) => {
    res.json({msg: "update user"})
}


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUserPassword
}