const { screening_question } = require("../models");
const db = require("../models");
const foodGoodFor = db.foodGoodFor;
const foodBadFor = db.foodBadFor;
const query = db.disease;
const admin = require("firebase-admin");
const array = require("lodash/array");

exports.findAllWithScreening = (req, res) => {
  query
    .findAll({
      include: {
        model: screening_question,
        attributes: ["id_pertanyaan", "pertanyaan"],
        required: true,
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while retrieving disease.",
      });
    });
};

exports.findAll = (req, res) => {
  query
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

exports.searchById = (req, res) => {
  const id = req.body.id_penyakit;
  if (id) {
    query
      .findAll({
        where: {
          id_penyakit: id,
        },
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some error occurred while retrieving disease.",
        });
      });
  } else {
    return res.send([]);
  }
  console.log(id);
};

exports.findDiseaseById = (req, res) => {
  const id = req.params.id;
  query
    .findByPk(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving disease with id=" + id,
      });
    });
};

exports.findDiseaseWithScreeningByID = (req, res) => {
  const id = req.params.id;
  query
    .findByPk(id, {
      include: {
        model: screening_question,
        attributes: ["id_pertanyaan", "pertanyaan"],
      },
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving disease with id=" + id,
      });
    });
};

exports.getAllGoodFood = (req, res) => {
  foodGoodFor
    .findAll({
      include: ["goodFoods"],
    })
    .then((data) => {
      res.send(data.map((food) => food.goodFoods));
    })
    .catch((err) => {
      console.log("Get All Good Food Error : ", err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving disease.",
      });
    });
};
exports.getAllBadFood = (req, res) => {
  foodBadFor
    .findAll({
      include: ["badFoods"],
    })
    .then((data) => {
      res.send(data.map((food) => food.badFoods));
    })
    .catch((err) => {
      console.log("Get All Good Food Error : ", err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving disease.",
      });
    });
};

exports.getMyGoodFood = (req, res) => {
  admin
    .firestore()
    .collection("User")
    .doc(req.authenticatedUser.uid)
    .get()
    .then((docSnap) => {
      if (docSnap.exists) {
        console.log(docSnap.data());
        if (docSnap.data().diseases === null) {
          foodGoodFor
            .findAll({
              include: ["goodFoods"],
            })
            .then((data) => {
              res.send({
                message: "Success",
                error: null,
                ok: true,
                food: data.map((food) => food.foods),
              });
            })
            .catch((err) => {
              console.log("Get My Good Food Error : ", err);
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while retrieving good food for user disease.",
                error:
                  "Error retrieving data from database [User don't have diseases]",
                ok: false,
              });
            });
        } else {
          foodGoodFor
            .findAll({
              where: {
                id_disease: docSnap.data().diseases, // find all good from from all user diseases
              },
              include: ["goodFoods"],
            })
            .then((data) => {
              foodBadFor
                .findAll({
                  where: {
                    id_disease: docSnap.data().diseases, // find all good from from all user diseases
                  },
                  include: ["badFoods"],
                })
                .then((data2) => {
                  res.send({
                    message: "Success",
                    error: null,
                    ok: true,
                    food: array.differenceBy(
                      data.map((food) => food.goodFoods),
                      data2.map((food) => food.badFoods),
                      "id_food"
                    ),
                  });
                });
            })
            .catch((err) => {
              console.log("Get my Good Food Error : ", err);
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
