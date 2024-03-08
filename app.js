require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()
const connectDB = require("./DB/connect")
const morgan = require("morgan")

const authRouter = require("./routes/authRoute")

const notFoundMiddleware = require("./middlewares/notFound")
const errorHandlerMiddleware = require("./middlewares/errorHandler")
const unAuthorizedMiddleware = require("./middlewares/unAuthorized")

app.use(morgan('tiny'))
app.use(express.json())


app.get("/", (req, res) => {
    res.send("ecommerce is on")
})

app.use("/api/v1/auth", authRouter)

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