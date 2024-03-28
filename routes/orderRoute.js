const express = require("express")
const router = express.Router()

const {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrder,
    updateOrder
} = require("../controllers/orderController")

const {
    authenticateUser,
    authorizeUser,
    authorizeGettingSingleUSer
} = require('../middlewares/unAuthorized')

router.route("/")
    .post(createOrder)
    .get(authorizeUser('admin'), getAllOrders)


router.route('/showAllMyOrders').get(getCurrentUserOrder)

router.route("/:id")
    .get(getSingleOrder)
    .patch(updateOrder)


module.exports = router