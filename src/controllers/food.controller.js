const db = require("../models");
const Food = db.foods;


exports.addFood = (req, res)=>{
  if(!req.body.nama_makanan || !req.body.nutrisi) {
    res.status(400).send({
      message: "name or nutrition can not be empty"
    });
    return;
  }

  const food = {nama_makanan, nutrisi, tipe_makanan, good_for, bad_for} = req.body;

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