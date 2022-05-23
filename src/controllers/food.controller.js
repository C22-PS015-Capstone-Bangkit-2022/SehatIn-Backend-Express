const db = require("../models");
const disease = db.disease;
const Food = db.foods;
const foodGoodFor = db.foodGoodFor;
const foodBadFor = db.foodBadFor;
const Op = db.Sequelize.Op;


exports.addFood = (req, res)=>{
  if(!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty"
    });
    return;
  }

  const food = {name, energy, avg_portion, tipe_makanan, fat, protein, carbs} = req.body;

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

exports.allFoodByDisease = (req, res) => {
  disease.findAll({
    include : [{
      model : foodGoodFor,
      include: ["foods"]
    },{
      model: foodBadFor,
      include: ["foods"]
    }]
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
    where: { id_food: id}
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
    where: { id_food: id },
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