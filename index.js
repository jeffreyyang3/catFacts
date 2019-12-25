const nodemailer = require("nodemailer");
const cat = require('./cat');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jeffreyhasmail@gmail.com",
    pass: process.env['EMAILPASS']
  }
});

const mailOptions = {
  from: "jeffreyhasmail@gmail.com",
  to: "6268183111@vtext.com",
  subject: "Cat facts",
  html: "<h1>khajit have ware</h1>"
};
console.log(cat);
console.log(cat.getRandomFact());

// transporter.sendMail(mailOptions, (err, info) => {
//   if (err) console.log(err);
//   else console.log(info);
// });
