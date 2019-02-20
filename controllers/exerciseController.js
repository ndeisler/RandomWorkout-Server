var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Exercise = sequelize.import("../models/exerciseModel");

// Exercise.sync({force:true});

router.get("/", (req, res) => {
    Exercise.findAll().then(exercise => res.status(200).json(exercise))
    .catch(err => res.status(500).json({error: err}));
})


router.post("/createExercise", (req, res) => {
    if(!req.errors) {
        const exercise = {
            muscle_group: req.body.muscle_group,
            description: req.body.description,
            image_url: req.body.image_url
        }
        Exercise.create(exercise)
        .then(log => res.status(200).json(log))
        .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors);
    }
});

router.delete("/delete/:id", (req, res) => {
    let data = req.params.id;
    
    Exercise.destroy({
        where: {id: data}
    }).then(
        function deleteLogSuccess(data) {
            res.send("you removed a dog");
        },
        function deleteLogError(err) {
            res.send(500, err.message);
        }
    )

})

module.exports = router;