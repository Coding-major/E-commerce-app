const User = require("../models/product")
const { StatusCodes} = require("http-status-codes")

const createProduct = async (req, res) => {
    res.send("createProduct  aaa")
}

const getAllProducts = async (req, res) => {
    res.send("get all products  aaa")
}

const getSingleProduct = async (req, res) => {
    res.send("get Single")
}

const updateProduct = async (req, res) => {
    res.send("createProduct  aaa")
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
