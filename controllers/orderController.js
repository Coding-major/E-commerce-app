const badRequest = require("../errors/badRequest")
const Product = require("../models/product")
const checkPermissions = require("../utils/checkpermisions")
const {StatusCodes} = require("http-status-codes")


const createOrder = async (req, res) => {
    const {tax, shippingFee, items: cartItems} = req.body
    if(!cartItems || cartItems.length < 1) {
        throw new badRequest("please provide the cart items")
    }

    if (!tax || !shippingFee) {
        throw new badRequest("please provide both the tax and shipping Fee")
    }

    let subTotal = 0;
    let orderItems = []
    for (const eachItem of cartItems) {
        const dbProduct = await Product.findOne({_id: eachItem.product})

        const {name, price, image, _id} = dbProduct;
        const cartItem = {
            name,
            price,
            image,
            amount: eachItem.amount,
            product: _id
        }

        orderItems = [...orderItems, cartItem]
        subTotal += price * amount
    }

    total = subTotal + shippingFee + tax;
    
}

const getAllOrders = async (req, res) => {
    res.json({msg: "get all order"})
}

const getSingleOrder = async (req, res) => {
    res.json({msg: "get single order"})
}

const getCurrentUserOrder = async (req, res) => {
    res.json({msg: "getCurrentUser order"})
}

const updateOrder = async (req, res) => {
    res.json({msg: "update order"})
}

module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrder,
    updateOrder
}