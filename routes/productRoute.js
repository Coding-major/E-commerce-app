const express = require("express")
const router = express.Router()
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require("../controllers/productController")
const {
    authenticateUser,
    authorizeUser,
    authorizeGettingSingleUSer
} = require("../middlewares/unAuthorized")


router
    .route("/")
    .post(authenticateUser, authorizeUser("admin"), createProduct)
    .get(getAllProducts)

    
router.route("/uploadimage").post(authenticateUser, authorizeUser("admin"), uploadImage)

router
    .route("/:id")
    .get(getSingleProduct)
    .patch(authenticateUser, authorizeGettingSingleUSer("admin"), updateProduct)
    .delete(authenticateUser, authorizeGettingSingleUSer("admin"), deleteProduct)


module.exports = router

