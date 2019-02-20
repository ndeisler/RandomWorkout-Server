var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var USER = sequelize.import("../models/usermodel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// USER.sync({force: true}) //deletes all users table


router.post("/signup", (req, res) => {
    // res.send("This is the CREATEUSER route");
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let pass = req.body.password;

    USER.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(pass, 10)
    }).then(createSuccess = (user) => {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24});

        res.json({
            user: user, 
            message: "created",
            sessionToken: token
        });
    },
    createError = (err) => {
        res.send(500, err.message);
    });
});

router.post("/login", (req, res) => {
    USER.findOne( {where: {email: req.body.email}})
    .then((user) => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if(matches) {
                    var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                    res.json({
                        user: user,
                        message: "successfully authenticated",
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({
                        error: "NOT AUTHENTICATED"
                    });
                }
            });
        } else {
            res.status(500).send( {error: "failed to authenticated"});
        }
    },
    (err) => {
        res.status(501).send({error: "you failed this time"});
    })
})


module.exports = router;