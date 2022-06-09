const db = require("../models");
const Sport = db.sport;
const sportGoodFor = db.sportGoodFor;
const sportBadFor = db.sportBadFor;
const diseases = db.disease;
const Op = db.Sequelize.Op;
const admin = require("firebase-admin");
const array = require("lodash/array");

exports.addSport = (req, res)=>{
    if(!req.body.activity) {
        res.status(400).send({
        message: "Name of activity can not be empty"
      });
      return;
    }
    const sport = {category, activity, energy} = req.body;
  
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
      attributes: ['id_sport', 'category', 'activity', 'energy']
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

 exports.deleteSport = (req, res) => {
    const id = req.params.id;
  
    Sport.destroy({
      where: { id_sport: id}
    })
      .then(num => {
        if (num == 1){
          res.status(200).send({
            message: "Sport successfully deleted!"
          });
        } else {
          res.status(404).send({
            message: "Sport not found!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred!"
        })
      })
  }

  exports.updateSport = (req, res) => {
    const id = req.params.id;
  
    Sport.update(req.body, {
      where: { id_sport: id },
    })
      .then((num) => {
        if (num == 1) {
          res.status(200).send({
            message: "Sport successfully updated!",
          });
        } else {
          res.status(404).send({
            message: "sport not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred!",
        });
      });
  };


exports.getAllGoodSport = (req, res) => {
  sportGoodFor
    .findAll({
      include: ["goodSports"],
    })
    .then((data) => {
      res.send(data.map((sport) => sport.goodSports));
    })
    .catch((err) => {
      console.log("Get All Good Sport Error : ", err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving disease.",
      });
    });
};
  
// exports.getAllBadSport = (req, res) => {
//   sportBadFor
//     .findAll({
//       include: ["badSports"],
//     })
//     .then((data) => {
//       res.send(data.map((sport) => sport.badSports));
//     })
//     .catch((err) => {
//       console.log("Get All Good Sport Error : ", err);
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving disease.",
//       });
//     });
// };
  
exports.getMyGoodSport = (req, res) => {
  admin
    .firestore()
    .collection("User")
    .doc(req.authenticatedUser.uid)
    .get()
    .then((docSnap) => {
      if (docSnap.exists) {
        console.log(docSnap.data());
        if (
          docSnap.data().diseases === null ||
          !docSnap.data().diseases?.length
        ) {
          sportGoodFor
            .findAll({
              include: ["goodSports"],
            })
            .then((data) => {
              res.send({
                message: "Success",
                error: null,
                ok: true,
                sport: data.map((sport) => sport.goodSports),
              });
            })
            .catch((err) => {
              console.log("Get My Good Sport Error : ", err);
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while retrieving good sport for user disease.",
                error:
                  "Error retrieving data from database [User don't have diseases]",
                ok: false,
              });
            });
          } else {
          sportGoodFor
            .findAll({
              where: {
                id_disease: docSnap.data().diseases, // find all good from from all user diseases
              },
              include: ["goodSports"],
            })
            .then((data) => {
              sportBadFor
                .findAll({
                  where: {
                    id_disease: docSnap.data().diseases, // find all good from from all user diseases
                  },
                  include: ["badSports"],
                })
                .then((data2) => {
                  res.send({
                    message: "Success",
                    error: null,
                    ok: true,
                    sport: array.differenceBy(
                      data.map((sport) => sport.goodSports),
                      data2.map((sport) => sport.badSports),
                      "id_sport"
                    ),
                  });
                });
            })
            .catch((err) => {
              console.log("Get my Good Sport Error : ", err);
              res.status(500).send({
                ok: false,
                message:
                  err.message ||
                  "Some error occurred while retrieving disease.",
                error:
                  "Error retrieving data from database [User have diseases]",
              });
            });
        }
      }
    });
};  