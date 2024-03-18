const { badRequest, notFound } = require("../errors/indexErrors")
const Review = require("../models/review")
const Product = require("../models/product")
const {StatusCodes} = require("http-status-codes")


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
    res.json({msg: "get All review"})
}

const getSingleReview = async (req, res) => {
    res.json({msg: "get Single review"})
}

const updateReview = async (req, res) => {
    res.json({msg: "update Review"})
}

const deleteReview = async (req, res) => {
    res.json({msg: "delete Review"})
}

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}