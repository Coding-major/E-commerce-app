const Product = require("../models/product")
const { StatusCodes} = require("http-status-codes")

const createProduct = async (req, res) => {
    req.body.user = req.user.userID
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({msg: product})
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({user: req.user.userID})
    res.status(StatusCodes.OK).json({msg: products})
}

const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id, user: req.user.userID})
    res.status(StatusCodes.OK).json({msg: product})
}

const updateProduct = async (req, res) => {
    
}

const deleteProduct = async (req, res) => {
    res.send("delete  aaa")
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
