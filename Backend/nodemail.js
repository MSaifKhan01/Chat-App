const nodemailer = require("nodemailer");
require("dotenv").config()



// async..await is not allowed in global scope, must use a wrapper
async function main(useremail) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        auth: {

            user: 'msaifkhan5038@gmail.com',
            pass: "maxcwuwyvvzayelj"
        }
    });
    // send mail with defined transport object
    const info = transporter.sendMail({
        from: `msaifkhan5038@gmail.com`,
        to: `${useremail}`,
        subject: "Please Verify Email",

        html: '<a href="http://127.0.0.1:5500/Backend/index.html">Click Here To Verify Your Email</a>'
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Message sent: %s", info.to);

}

module.exports=main