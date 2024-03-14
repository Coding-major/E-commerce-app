const express = require("express")
const router = express.Router()
const { authorizeUser, authorizeGettingSingleUSer } = require("../middlewares/unAuthorized")
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUserPassword,
    updateUser
} = require("../controllers/usersController")


router.route("/").get(authorizeUser("superAdmin", "admin"), getAllUsers)
router.route("/showMe").get(showCurrentUser)
router.route("/updateUser").patch(updateUser)
router.route("/updateUserPassword").patch(updateUserPassword)
router.route("/:id").get(authorizeGettingSingleUSer, getSingleUser)

module.exports = router