require("dotenv").config()
require("express-async-errors")


const express = require("express")
const app = express()
const connectDB = require("./DB/connect")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")


const authRouter = require("./routes/authRoute")
const userRouter = require("./routes/userRoute")
const productRouter = require("./routes/productRoute")
const reviewRouter = require("./routes/reviewRoute")
const orderRouter = require("./routes/orderRoute")


const {authenticateUser, authorizeUser} = require("./middlewares/unAuthorized")
const notFoundMiddleware = require("./middlewares/notFound")
const errorHandlerMiddleware = require("./middlewares/errorHandler")


app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static("./public"))
app.use(fileUpload())

app.get("/api/v1", (req, res) => {
    console.log(req.signedCookies);
    res.send("ecommerce is on")
    
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", authenticateUser, userRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/orders", authenticateUser, orderRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 4000

//connection
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, console.log(`server is well listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()