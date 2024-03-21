const express = require("express")
const router = express.Router()
const {
    createProduct,
    getAllProducts,
    getMyProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    getSingleProductReviews
} = require("../controllers/productController")
const {
    authenticateUser,
    authorizeUser,
    authorizeGettingSingleUSer
} = require("../middlewares/unAuthorized")

const {deleteMany} = require("../controllers/reviewController")


router
    .route("/")
    .post(authenticateUser, createProduct)
    .get(getAllProducts)

router.route("/myproducts").get(authenticateUser, getMyProducts)

    
router.route("/uploadimage").post(uploadImage)

router
    .route("/:id")
    .get(getSingleProduct)
    .patch(authenticateUser, authorizeUser("admin"), updateProduct)
    .delete(authenticateUser,deleteProduct, deleteMany)

router.route("/:id/reviews").get(getSingleProductReviews);


module.exports = router

//authenticateUser, authorizeUser("admin"), 

