const db = require("../models");
const Doctor = db.doctor;
const Op = db.Sequelize.Op;

exports.getAllDoctors = (req, res) => {
    Doctor.findAll({
        attributes : ['id_doctor', 'name', 'strNumber', 'specialist', 'experience_year', 'alumnus', 'practice_at', 'price', 'imageUrl']
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving doctors.",
        });
      });
  };
  
//   exports.getDoctorById = (req, res) => {
//     const id = req.params.id;
  
//     Article.findByPk(id)
//       .then((data) => {
//         res.status(200).send(data);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: err.message || "Error retrieving Article with id=" + id,
//         });
//       });
//   };