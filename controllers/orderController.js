const {badRequest, notFound} = require("../errors/indexErrors")
const Product = require("../models/product")
const checkPermissions = require("../utils/checkpermisions")
const {StatusCodes} = require("http-status-codes")
const Order = require('../models/order')

const fakeStripe = async (amount, currency) => {
    const client_secret = 'congrats'
    return {client_secret}
}
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

        if(!dbProduct) {
            throw new notFound("product does not exist")
        }

        const {name, price, image, _id} = dbProduct;
        const cartItem = {
            name,
            price,
            image,
            amount: eachItem.amount,
            product: _id
        }

        orderItems = [...orderItems, cartItem]
        subTotal += price * eachItem.amount
    }

    total = subTotal + shippingFee + tax;

    const paymentIntent = await fakeStripe(total, "usd")
    
    const order = await Order.create({
        tax,
        shippingFee,
        subTotal,
        total,
        orderItems,
        user: req.user.userID,
        clientSecret: paymentIntent.client_secret
    })

    res.status(StatusCodes.OK).json(order)



    
}

const getAllOrders = async (req, res) => {
    const orders = await Order.find({});
    res.status(StatusCodes.OK).json({ orders, count: orders.length });
};


const getSingleOrder = async (req, res) => {
    const { id: orderId } = req.params;
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
    }
    checkPermissions(req.user, order.user);
    res.status(StatusCodes.OK).json({ order });
};


const getCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.userId });
    res.status(StatusCodes.OK).json({ orders, count: orders.length });
};


const updateOrder = async (req, res) => {
    const { id: orderId } = req.params;
    const { paymentIntentId } = req.body;

    const order = await Order.findOne({ _id: orderId });
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
    }
    checkPermissions(req.user, order.user);

    order.paymentIntentId = paymentIntentId;
    order.status = 'paid';
    await order.save();

    res.status(StatusCodes.OK).json({ order });
};

module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    updateOrder
}