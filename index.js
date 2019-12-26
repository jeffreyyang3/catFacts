const nodemailer = require("nodemailer");
const cat = require("./cat");
const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8081;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.post("/register", (req, res) => {
  console.log(req.body);
  res.json({
    asdf: "asdf"
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jeffreyhasmail@gmail.com",
    pass: process.env["EMAILPASS"]
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

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

// transporter.sendMail(mailOptions, (err, info) => {
//   if (err) console.log(err);
//   else console.log(info);
// });
