const { process_params } = require("express/lib/router");
const jwt = require("jsonwebtoken")

const createJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })

    return token;
}

const verifyJWT = (token) => {
    const verify = jwt.verify(token, process.env.JWT_SECRET)
}

const attachCookiesToResponse = (res, user) => {
    const token = createJWT(user)

    const oneDay = 1000 * 60 * 60 * 24

    res.cookie('my_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true
    })


}

module.exports = {
    verifyJWT,
    attachCookiesToResponse
}