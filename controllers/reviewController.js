const { badRequest, notFound } = require("../errors/indexErrors")
const Review = require("../models/review")
const Product = require("../models/product")
const {StatusCodes} = require("http-status-codes")
const checkPermissions = require("../utils/checkpermisions")


const createReview = async (req, res) => {
    const productID = req.body.product
    if (!productID) {
        throw new badRequest("please provide the productID")
    }

    const product = await Product.findOne({_id: productID})
    if (!product) {
        throw new notFound("Product with that id not found")
    }

    const alreadyExist = await Review.findOne({
        user: req.user.userID,
        product: productID
    })

    if (alreadyExist) {
        throw new badRequest("you have already posted a review for the product")
    }

    req.body.user = req.user.userID
    const review = Review.create(req.body)
    res.status(StatusCodes.OK).json({msg: review})
}

const getAllReviews = async (req, res) => {
    const reviews = await Review.find({})
    if (!reviews) {
        throw new notFound("no review found")
    }
    res.status(StatusCodes.OK).json({msg: reviews, count: reviews.length})
}

const getSingleReview = async (req, res) => {
    const reviewID = req.params.id

    const review = await Review.findOne({_id: reviewID})

    if (!review) {
        throw new notFound("no review with that id exist")
    }

    res.status(StatusCodes.OK).json({msg: review})
}

const updateReview = async (req, res) => {
    res.json({msg: "update Review"})
}

const deleteReview = async (req, res) => {


    const available = await Review.findOneAndDelete({_id: req.params.id})
    if (!available) {
        throw new notFound("no review with that id")
    }

    const review = await Review.findOneAndDelete({_id: req.params.id, user: req.user.userID})

    // checkPermissions(req.user.userID, review.user)
    // await review.remove()
    res.status(StatusCodes.OK).json({msg: "deleted successfully"})
}

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}