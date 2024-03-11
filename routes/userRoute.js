const express = require("express")
const router = express.Router()
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUserPassword
} = require("../controllers/usersController")

router.route("/").get(getAllUsers)
router.route("/showMe").get(showCurrentUser)
router.route("/updateUserPassword").post(updateUserPassword)
router.route("/:id").get(getSingleUser)

module.exports = router