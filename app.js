require("dotenv").config()
require("express-async-errors")

const express = require("express")
const connectDB = require("./DB/connect")
const app = express()
const connectDB = require("./DB/connect")

const PORT = process.env.PORT || 4000

//connection
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, `server is well listening on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
}

start()