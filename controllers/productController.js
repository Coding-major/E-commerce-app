const Product = require("../models/product")
const { StatusCodes} = require("http-status-codes")
const {
    customError,
    notFound,
    unAuthorized,
    badRequest,
    forbidden
} = require("../errors/indexErrors")

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

const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id})
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
    const product = await Product.findOne({_id: req.params.id})

    if(!product) {
        throw new notFound("No product with the ID")
    }

    await product.remove()
    res.status(StatusCodes.OK).json({msg: "product successfully deleted"})
}

const uploadImage = async (req, res) => {
    res.send("image  upload")
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}
