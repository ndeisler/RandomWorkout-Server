var express = require("express");
var router = express.Router();
var validateSession = require("../middleware/validate-session");
var sequelize = require("../db");
var Workout = sequelize.import("../models/workoutModel");

// Workout.sync({force: true})



router.get("/getall", validateSession, (req, res) => {
    let userid = req.user.id;
    Workout.findAll({
        where: {owner: userid}
    }).then(function findAllSuccess(data) {
        res.json(data);
    }, function findAllError(err) {
        res.send(500, err.message)
    })
});

router.get("/get/:id", validateSession, (req, res) => {
    // let userid = req.user.id
    let data = req.params.id
    Workout.findOne({
        where: {id: data}
    }).then(workout => res.status(200).json(workout))
    .catch(err => res.status(500).json({error: err}))
})

router.post("/save", validateSession, (req, res) => {
    if(!req.error) {
        const workout = {
            workouts: req.body.workouts,//Supposed to be an array of random data pulled from 
            time: req.body.time,
            comments: req.body.comments,
            owner: req.user.id
        }
        
      Workout.create(workout)
      .then(workout => res.status(200).json(workout))
      .catch(err => res.json(req.errors))      
    }
})//create/post workout
router.put("/update/:id", validateSession, (req, res) => {
    let data = req.params.id;
    Workout.update(req.body, {where: {id: data}})
    .then(
        function updateSucess(updateLog) {
            res.json({
                time: req.body.time,
                comments: req.body.comments
            });
        }, function updateError(err) {
            res.send(500, err.message);
        }
    )
});

router.delete("/delete/:id", validateSession, (req, res) => {
    let data = req.params.id;
    let userid = req.user.id;

    Workout.destroy({
        where: {id: data, owner: userid}
    }).then(
        function deleteLogSuccess(data) {
            res.send("you are removed a dog");
        },
        function deleteLogError(err) {
            res.send(500, err.message);
        }
    )
})

module.exports = router;