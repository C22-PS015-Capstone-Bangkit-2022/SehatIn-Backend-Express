const db = require("../models");
const tag = db.tag

exports.findAll = (req, res) => {
    tag
      .findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some error occurred while retrieving disease.",
        });
      });
  };