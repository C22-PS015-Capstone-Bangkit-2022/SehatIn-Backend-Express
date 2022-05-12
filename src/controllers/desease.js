const db = require('../models');
const query = db.desease;

exports.findAll = (req, res) => {
    query.findAll({
        attributes : ['nama_penyakit']
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };