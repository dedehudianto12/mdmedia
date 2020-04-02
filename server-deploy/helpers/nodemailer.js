"use strict"

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'projectapi908@gmail.com',
        pass: 'kudaliar'
    }
});

function sendEmail(email, val) {

    const mailOptions = {
        from: 'projectapi908@gmail.com',
        to: email,
        subject: '2 Factor Authentication',
        text: `Your validation code, ${val}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { sendEmail }