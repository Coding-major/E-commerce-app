const express = require("express")
const router = express.Router()
const {
    createProduct,
    getAllProducts,
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


router
    .route("/")
    .post(authenticateUser, createProduct)
    .get(getAllProducts)

    
router.route("/uploadimage").post(uploadImage)

router
    .route("/:id")
    .get(getSingleProduct)
    .patch(authenticateUser, authorizeUser("admin"), updateProduct)
    .delete(authenticateUser, authorizeUser("admin"), deleteProduct)

router.route("/:id/reviews").get(getSingleProductReviews);


module.exports = router

//authenticateUser, authorizeUser("admin"), 

