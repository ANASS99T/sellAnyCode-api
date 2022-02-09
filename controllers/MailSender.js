const nodemailer = require('nodemailer');

async function mail(receiver, subject, text, html = '') {
  const data = {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASSWORD,
  };
  console.log(data);

  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    // secure: false,
    // requireTLS: true,
    auth: data,
  });

//   var mailTransporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "4d48f69c1d8d9d",
//       pass: "f4a4568c698bf7"
//     }
//   });


  let mailDetails = {
    from: process.env.EMAIL,
    to: receiver,
    subject: subject, // Subject line
    text: text, // plain text body
    html: html,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log('Une erreur est produite', err);
    } else {
      console.log('Email envoye avec success', data);
    }
  });
}

module.exports = mail;
