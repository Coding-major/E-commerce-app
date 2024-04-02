const nodemailer = require('nodemailer')
const sendEmail = async() => {

    let testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        
    });

    const info = await transporter.sendMail({
        from: '"shehu mustey 👻" <shehumustapham@gmail.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "omo, hello✔", // Subject line
        //text: "Hello world?", // plain text body
        html: "<h2>Sending email with nodejs/h2>", // html body
      });

}

module.exports = sendEmail;