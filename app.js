require("dotenv").config();

var express = require("express");
var app = express();

var user = require("./controllers/userController");
var log = require("./controllers/authController");
var exer = require("./controllers/exerciseController");


var bodyParser = require("body-parser");

var sequelize = require("./db");


sequelize.sync();

app.use(require("./middleware/headers"))

app.use(bodyParser.json());

app.use("/admin", exer);

app.use("/user", user);

// app.use(require("./middleware/validate-session"));

app.use("/log", log);

app.listen(process.env.PORT, () => {
    console.log(`App is listening on ${process.env.PORT}`);
})