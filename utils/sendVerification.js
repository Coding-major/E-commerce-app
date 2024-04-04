const sendEmail = require('./sendEmail')
const sendVerification = async (name, email, verificationToken, origin) => {
    const message = `Dear ${name} <p>please confirm your email by clicking the link: ${verificationToken}</p>`
    sendEmail({
        to: email,
        subject: name,
        verificationToken: message
    })
}

module.exports = sendVerification;