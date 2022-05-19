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
                message: err.message || "Some error occured while create the sport."
        });
      });
};

exports.getAllSports = (req, res) => {
    Sport.findAll({
      attributes: ['id_sport', 'category', 'activity', 'energy', 'avg_duration']
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving sports."
        });
      });
  };

  exports.getSportById = (req, res) => {
    const id = req.params.id;
  
    Sport.findByPk(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retrieving Article with id=" + id,
        });
      });
  };