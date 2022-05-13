const db = require('../models');
const query = db.screening_question;

exports.findAll = (req, res) => {
    query.findAll({
        attributes : ['id_pertanyaan', 'pertanyaan', 'untuk_penyakit']
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