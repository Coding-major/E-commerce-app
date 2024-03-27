
const createOrder = async (req, res) => {
    res.json({msg: "create order"})
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