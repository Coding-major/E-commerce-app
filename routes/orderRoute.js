const express = require("express")
const route = express.Router()

const {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrder,
    updateOrder
} = require("../controllers/orderController")
