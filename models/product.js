const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide the name for the product"],
        minlength: 3,
        maxlength: 50
    },

    price: {
        type: Number,
        required: [true, "please provide the price "]
    },

    description: {
        type: String,
        required: [true, "Description is a must, so provide it"],
        maxlength: [1000, "description cannot be more than 1000 characters"]
    },

    image: {
        type: String,
        default: "/uploads/store.jpeg"
    },

    category: {
        type: String,
        required: [true, "please provide the category"],
        enum: ["office", "kitchen", "school"]
    },

    company: {
        type: String,
        required: [true, "please provide the comapny name"],
        enum: {
            values: ["gucci", "prada", "versace", "balenciaga"],
            message: ""
        }
    },

    colors: {
        type: [String],
        required: true
    },

    featured: {
        type: Boolean,
        default: false
    },

    freeShipping: {
        type: Boolean,
        default: false
    },

    inventory: {
        type: Number,
        required: true,
        default: 15
    },

    averageRating: {
        type: Number,
        default:0
    },

    numberOfReviews: {
        type: Number, 
        default: 0
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},

{timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }}
)

ProductSchema.virtual('reviews', {
    ref: "Review",
    localField: "_id",
    foreignField: "product",
    justOne: false
})

// ProductSchema.pre("findOneAndDelete", async function() {
//     await mongoose.model('Review').deleteMany({product: this._id})
// })

module.exports = mongoose.model("Product", ProductSchema)