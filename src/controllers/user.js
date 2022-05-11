const db = require('../models');
const query = db.user;


exports.findAll = (req, res) => {
    const id = req.params.id;
  
    query.findAll({
        attributes : ['id_user','nama', 'email', 'jenis_kelamin', 'tgl_lahir','id_image']
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