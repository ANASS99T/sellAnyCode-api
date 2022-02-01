const nodemailer = require("nodemailer");

async function mail(senderEmail, senderPassowrd, receiver, subject, text,html= "") {

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderEmail,
            pass: senderPassowrd
        }
    });

    let mailDetails = {
        from: senderEmail,
        to: receiver,
        subject: subject, // Subject line
        text: text, // plain text body
        html: html
        };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Une erreur est produite', err);
        } else {
            console.log('Email envoye avec success', data);
        }
    });
}

module.exports = mail