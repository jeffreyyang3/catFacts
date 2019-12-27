const nodemailer = require("nodemailer");
const app = require("express")();
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

const port = 8081;
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.post(
  "/register",
  (
    req: {
      body: {
        userName: string;
        phoneNumber: string;
        provider: string;
      };
    },
    res
  ) => {
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
  }
);

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

const getMailOptions = (
  phoneNumber: string,
  cellProvider: string,
  text: string
) => {
  const providerToEmail = {
    Verizon: "vtext.com",
    "T-Mobile": "tmomail.net"
  };

  return {
    from: "jeffreyhasmail@gmail.com",
    to: `${phoneNumber}@${providerToEmail[cellProvider]}`,
    subject: "Cat facts",
    html: `<h1>${text}</h1>`
  };
};
interface factQueryResult {
  rows: Array<{ fact: string }>;
}

interface userQueryResult {
  rows: Array<{
    cellprovider: string;
    phonenumber: string;
    username: string;
    userid: number;
  }>;
}
/*
pool.query("select * from users", async (error, results: userQueryResult) => {
  if (error) console.log(error);
  else {
    const users = results.rows;
    console.log(users);
    pool.query("select fact from facts", (error: Error, results: factQueryResult) => {
      if (error) throw error;
      const facts = results.rows.map(obj => obj.fact);
      users.forEach((user, idx) => {
        transporter.sendMail(
          getMailOptions(user.phonenumber, user.cellprovider, facts[idx]),
          (err: Error, info) => {
            if (err) throw err;
            else console.log(info);
          }
        );
      });
    });
  }
});
*/
const sendTexts = async () => {
  const queryResult: userQueryResult = await pool.query("select * from users");
  const users = queryResult.rows;
  console.log(users);
  // const factResult = await pool.query("select getNewFact(1)");
  //console.log(factResult.rows);
  for await (const user of users) {
    const { username, phonenumber, cellprovider, userid } = user;
    // transporter.sendMail(
    //   getMailOptions(
    //     phonenumber,
    //     cellprovider,
    //     await pool.query(`select getNewFact(${userid})`)
    //   )
    // );
    const row: { rows: Array<{ getnewfact: string }> } = await pool.query(
      `select getNewFact(${userid})`
    );
    console.log(row.rows[0].getnewfact);

    transporter.sendMail(
      getMailOptions(phonenumber, cellprovider, row.rows[0].getnewfact),
      (err, info) => {
        if (err) throw err;
        else console.log(info);
      }
    );
  }
};

sendTexts();
// app.listen(port, () => {
//   console.log(`listening on ${port}`);
// });
// setInterval(() => {
//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) console.log(err);
//     else console.log(info);
//   });
// }, 10000);
