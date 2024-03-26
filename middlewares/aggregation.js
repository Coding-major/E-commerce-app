const {StatusCodes} = require('http-status-codes');
const Review = require("../models/review")
//const review = require('../models/review');
const aggregation = async function(req, res) {
    const review = req.review
    // const result = await Review.aggregate([
    //     { $match: {product: Review.product} },
    //     { $group : {
    //         _id: null,
    //         averageRating: {$avg: '$rating'},
    //         numberOfReviews: {$sum: 1}
    //     }}
    // ])

    review.after()

    //console.log(result)
    res.status(StatusCodes.OK).json({msg: review})
}

module.exports = aggregation;