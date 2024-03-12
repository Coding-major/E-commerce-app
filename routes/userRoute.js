const express = require("express")
const router = express.Router()
const {authorizeUser} = require("../middlewares/unAuthorized")
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUserPassword
} = require("../controllers/usersController")


router.route("/").get(authorizeUser("superAdmin", "admin"), getAllUsers)
router.route("/showMe").get(showCurrentUser)
router.route("/updateUserPassword").post(updateUserPassword)
router.route("/:id").get(authorizeUser("superAdmin", "admin"), getSingleUser)

module.exports = router