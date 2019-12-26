const nodemailer = require("nodemailer");
const cat = require("./cat");
const app = require("express")();
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "cool",
  port: 5432
});

// pool.query("select * from users", (error, results) => {
//   if (error) throw error;
//   console.log(results.rows);
// });
const port = 8081;

// const readFacts = JSON.parse(fs.readFileSync("facts.json"));
// console.log(readFacts);

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.post("/register", (req, res) => {
  console.log(req.body);
  // userName: 'asdf', phoneNumber: 'fdf', provider: 'AT&T'
  pool.query(
    `insert into users (username, phonenumber, cellProvider)
  values ($1, $2, $3)`,
    [req.body.userName, req.body.phoneNumber, req.body.provider],
    (error, results) => {
      if (error) throw error;
      console.log("inserted");
    }
  );
  res.json({
    asdf: "success"
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
  to: "5109184345@vtext.com",
  subject: "Cat facts",
  html: "<h1>khajit have ware</h1>"
};

const getMailOptions = (phoneNumber, cellProvider, text) => {
  const providerToEmail = {
    Verizon: "vtext.com"
  };
  console.log("HTML IS ", text);

  return {
    from: "jeffreyhasmail@gmail.com",
    to: `${phoneNumber}@${providerToEmail[cellProvider]}`,
    subject: "Cat facts",
    html: text
  };
};

pool.query("select * from users", (error, results) => {
  if (error) console.log(error);
  else {
    users = results.rows;
    console.log(users);
    pool.query("select fact from facts", (error, results) => {
      if (error) throw error;
      facts = results.rows.map(obj => obj.fact);
      users.forEach((user, idx) => {
        transporter.sendMail(
          getMailOptions(user.phonenumber, user.cellprovider, facts[idx]),
          (err, info) => {
            if (err) console.log(err);
            else console.log(info);
          }
        );
      });
    });
  }
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
// setInterval(() => {
//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) console.log(err);
//     else console.log(info);
//   });
// }, 10000);
