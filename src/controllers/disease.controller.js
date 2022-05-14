const db = require('../models');
const query = db.disease;

exports.findAll = (req, res) => {
    query.findAll({
      attributes : ["id_penyakit", "nama_penyakit"]
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