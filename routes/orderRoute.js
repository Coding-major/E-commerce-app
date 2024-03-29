const express = require("express")
const router = express.Router()

const {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
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


router.route('/showAllMyOrders').get(getCurrentUserOrders)

router.route("/:id")
    .get(getSingleOrder)
    .patch(updateOrder)


module.exports = router