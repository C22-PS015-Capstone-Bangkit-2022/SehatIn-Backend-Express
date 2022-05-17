const { screening_question } = require('../models');
const db = require('../models');
const query = db.disease;

exports.findAll = (req, res) => {
    query.findAll({
      include : {
        model : screening_question, 
        attributes : ["id_pertanyaan", "pertanyaan"],
        required: true 
      },
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Some error occurred while retrieving disease."
        });
      });
  };