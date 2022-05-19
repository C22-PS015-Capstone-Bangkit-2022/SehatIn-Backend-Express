const db = require("../models");
const Sport = db.sport;
const Op = db.Sequelize.Op;

exports.addSport = (req, res)=>{
    if(!req.body.activity) {
      res.status(400).send({
        message: "Name of activity can not be empty"
      });
      return;
    }
  
    const sport = {category, activity, energy, avg_duration} = req.body;
  
    // create sport
    Sport.create(sport)
      .then(data=> {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occured while create the sport."
        });
      });
  }