const mongoose = require("mongoose")
const { trim } = require("validator")
const product = require("./product")

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "please provide the rating"]
    },

    title: {
        type: String,
        trim: true,
        maxlength: 100
    },

    comment: {
        type: String,
        required: [true, "please provide your comment for the review"]
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    }  
},

{timestamps: true}
)

ReviewSchema.index({product: 1, user: 1}, {unique: true})
module.exports = mongoose.model("Review", ReviewSchema)