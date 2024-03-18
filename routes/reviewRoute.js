const express = require("express")
const router = express.Router()
const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
} = require("../controllers/reviewController")
const { authenticateUser, authorizeUser } = require("../middlewares/unAuthorized")

router.route("/")
    .post(authenticateUser, authorizeUser("user"), createReview)
    .get(getAllReviews)

router.route("/:id")
    .get(getSingleReview)
    .patch(authenticateUser, authorizeUser("user"), updateReview)
    .delete(authenticateUser,authorizeUser("user"), deleteReview)

module.exports = router