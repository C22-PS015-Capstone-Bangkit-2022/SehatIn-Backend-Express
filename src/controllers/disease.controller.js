const { screening_question } = require('../models');
const db = require('../models');
const query = db.disease;

exports.findAllWithScreening = (req, res) => {
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
          console.log(err)
        res.status(500).send({
          message: "Some error occurred while retrieving disease."
        });
      });
  };

exports.findAll = (req, res) => {
    query.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while retrieving disease."
            });
        });
};

exports.findDiseaseById = (req, res) => {
    const id = req.params.id;

    query.findByPk(id)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving disease with id=" + id,
            });
        });
};


exports.findDiseaseWithScreeningByID = (req, res) => {
    const id = req.params.id;

    query.findByPk(id,{
        include : {
            model : screening_question,
            attributes : ["id_pertanyaan", "pertanyaan"],
        },
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving disease with id=" + id,
            });
        });
};




