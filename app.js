//jshint eversion:6

require('dotenv').config();

//Packages
const express = require("express");
const ejs = require("ejs");
const app = express();
var nodeMailer = require('nodemailer');
var bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

//Home route
app.get("/", function(req, res) {
  res.render("home");
});



app.post("/", function(req, res) {
  console.log(req.body.cityName);
  console.log(req.body.cityEmail);
  console.log(req.body.cityPhone);
  var email = req.body.cityEmail;
  var message = req.body.cityContent;
  var name = req.body.cityName;
  var telly = req.body.cityPhone

  console.log(process.env.PASSWORD);
  console.log(process.env.EMAIL);

  //Step 1
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure:true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  //Step 2
  let mailOptions = {
    from: 'blainemcmahonuml@gmail.com', // sender address
    to: 'blainemcmahonuml@gmail.com', // list of receivers
    subject: name, // Subject line
    text: message + 'email----->' + email + 'phone---->' + telly // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.render("error", {
        error: error
      });
    } else {
      res.render("success", {
        name: name
      });

    }
  });


});

//Start server on local port
app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started");
})
