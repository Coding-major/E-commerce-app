const Product = require("../models/product")
const Review = require("../models/review")
const { StatusCodes} = require("http-status-codes")
const path = require("path")
const {
    customError,
    notFound,
    unAuthorized,
    badRequest,
    forbidden
} = require("../errors/indexErrors")
const checkPermissions = require("../utils/checkpermisions")

const createProduct = async (req, res) => {
    req.body.user = req.user.userID
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({msg: product})
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({})
    if (!products) {
        throw new notFound("no products to display")
    }
    res.status(StatusCodes.OK).json({msg: products})
}

const getMyProducts = async (req, res) => {
    const theUser = req.user.userID
    const products = await Product.find({user: theUser}).populate("reviews")
    if (!products) {
        throw new notFound("no products to display")
    }

    res.status(StatusCodes.OK).json({msg: products})
}



const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id}).populate("reviews")
    if (!product) {
        throw new notFound("No product to display")
    }
    res.status(StatusCodes.OK).json({msg: product})
}

const updateProduct = async (req, res) => {
    const product = await Product.findOneAndUpdate({_id: req.params.id, user: req.user.userID}, req.body, {
        new: true,
        runValidators: true
    })

    if (!product) {
        throw new notFound("No product to the specified id to update")
    }

    res.status(StatusCodes.OK).json({msg: product})
}

const deleteProduct = async (req, res) => {
    const theUser = req.user.userID
    const product = await Product.findOneAndDelete({_id: req.params.id, user: theUser})

    if(!product) {
        throw new notFound("No product to delete")
    }

    // const review = await Review.deleteMany({product: product._id})
    res.status(StatusCodes.OK).json({msg: "delete succesfull"})

}

const uploadImage = async (req, res) => {
    
    
    if(!req.files) {
        throw new badRequest("No file uploaded")
    }

    const productImage = req.files.image
    const maxSize = 1024 * 1024
    const imagePath = path.join(__dirname, `../public/uploads/${productImage.name}`);

     if (!productImage.mimetype.startsWith("image")) {
        throw new badRequest("please upload image instead")
     }

     if (productImage.size > maxSize) {
        throw new badRequest("please upload an image less than 1MB")
     }

     await productImage.mv(imagePath)

    res.status(StatusCodes.OK).json({msg: "successful"})
}

const getSingleProductReviews = async (req, res) => {
    const {id} = req.params

    const review = await Review.find({product: id})
    res.status(StatusCodes.OK).json({review})
}


module.exports = {
    createProduct,
    getAllProducts,
    getMyProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    getSingleProductReviews
}
