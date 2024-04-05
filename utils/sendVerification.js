const sendEmail = require('./sendEmail')
const sendVerification = async ({name, email, verificationToken, origin}) => {

    const link = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`
    const message = `<h2>Hello ${name}</h2> <br> <p>please confirm your email by clicking the link: <a href="${link}">Here</a></p>`
    sendEmail({
        to: email,
        subject: name,
        html: message
    })
}

module.exports = sendVerification;