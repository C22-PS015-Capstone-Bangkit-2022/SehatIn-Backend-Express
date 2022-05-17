const db = require("../models");
const Food = db.foods;


exports.addFood = (req, res)=>{
  if(!req.body.nama_makanan) {
    res.status(400).send({
      message: "name or nutrition can not be empty"
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

exports.getAllFoods= (req, res) => {
  Food.findAll({ 
    attributes: ['id_makanan', 'nama_makanan', 'energy', 'avg_portion', 'nutrisi', 'tipe_makanan', 'good_for', 'bad_for']
   })
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
}