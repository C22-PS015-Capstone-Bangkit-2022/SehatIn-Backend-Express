const db = require("../models");
const disease = db.disease;
const Food = db.foods;
const foodGoodFor = db.foodGoodFor;
const Op = db.Sequelize.Op;


exports.addFood = (req, res)=>{
  if(!req.body.nama_makanan) {
    res.status(400).send({
      message: "Name can not be empty"
    });
    return;
  }

  const food = {nama_makanan, energy, avg_portion, tipe_makanan, good_for, bad_for, fat, protein, carbs} = req.body;

  // create food
  Food.create(food)
    .then(data=> {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occured while create the food."
      });
    });
}

exports.searchFoods = (req, res) => {
  const {disease} = req.query;
  let condition = disease ? {[Op.or]: [{good_for: {[Op.like]:`%${disease}%`}}, {bad_for: {[Op.like]:`%${disease}%`}}]} : null;

  Food.findAll({where: condition})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving foods."
    });

  });
};

exports.allFood = (req, res) => {
  disease.findAll({
    include : {
      model : foodGoodFor, 
      attributes : ["id_food", "id_disease"],
      include: {
        model: Food,
        attributes: ["id_makanan", "nama_makanan"]
      }
    },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving disease."
      });
    });
}

// exports.getAllFoodsByDiseases = (req, res) => {
//   Food.findAll({where: condition})
//   .then(data => {
//     res.send(data);
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while retrieving foods."
//     });

//   });
// }

exports.deleteFood = (req, res) => {
  const id = req.params.id;

  Food.destroy({
    where: { id_makanan: id}
  })
    .then(num => {
      if (num == 1){
        res.status(200).send({
          message: "Food successfully deleted!"
        });
      } else {
        res.status(404).send({
          message: "Food not found!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred!"
      })
    })
};

exports.updateFood = (req, res) => {
  const id = req.params.id;

  Food.update(req.body, {
    where: { id_makanan: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Food successfully updated!",
        });
      } else {
        res.status(404).send({
          message: "Food not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred!",
      });
    });
};