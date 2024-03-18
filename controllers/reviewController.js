const Product = require("../models/review")
const {StatusCodes} = require("http-status-codes")

const createReview = async (req, res) => {
    res.json("create review")
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