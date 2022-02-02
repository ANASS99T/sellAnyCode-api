const nodemailer = require("nodemailer");

async function mail(receiver, subject, text,html= "") {

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        // secure: false, 
        // requireTLS: true,
        auth: {
            user: 'pmp.trainingma@gmail.com',
            pass: 'PMP-Training@123'
        }
    });

    let mailDetails = {
        from: 'pmp.trainingma@gmail.com',
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