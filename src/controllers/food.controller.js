const db = require("../models");
const Disease = db.disease;
const Food = db.foods;
const foodGoodFor = db.foodGoodFor;
const foodBadFor = db.foodBadFor;
const Op = db.Sequelize.Op;

exports.addFood = (req, res) => {
  if (!req.body.nameId) {
    res.status(400).send({
      message: "Name can not be empty",
    });
    return;
  }

  const food = ({
    nameId,
    nameEn,
    energy,
    avg_portion,
    tipe_makanan,
    fat,
    protein,
    carbs,
  } = req.body);

  // create food
  Food.create(food)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while create the food.",
      });
    });
};

exports.allFoods = (req, res) => {
  Food.findAll({
    include: [
      {
        model: foodGoodFor,
        include: ["foodsGoodFor"],
      },
      {
        model: foodBadFor,
        include: ["foodsBadFor"],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving disease.",
      });
    });
};

exports.searchFood = (req, res) => {
  const { food, lang } = req.query;
  if (lang === "id") {
    Food.findAll({
      where: { nameId: { [Op.iLike]: `%${food}` } },
      include: [
        {
          model: foodGoodFor,
          include: ["foodsGoodFor"],
        },
        {
          model: foodBadFor,
          include: ["foodsBadFor"],
        },
      ],
    })
      .then((data) => {
        res.send({
          message: "Success",
          error: null,
          ok: true,
          food: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          ok: false,
          message: err.message || "Some error occurred while retrieving food.",
          error: "Error retrieving data for find food",
        });
      });
  } else if (lang === "en") {
    Food.findAll({
      where: { nameEn: { [Op.iLike]: `%${food}` } },
      include: [
        {
          model: foodGoodFor,
          include: ["foodsGoodFor"],
        },
        {
          model: foodBadFor,
          include: ["foodsBadFor"],
        },
      ],
    })
      .then((data) => {
        res.send({
          message: "Success",
          error: null,
          ok: true,
          food: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          ok: false,
          message: err.message || "Some error occurred while retrieving food.",
          error: "Error retrieving data for find food",
        });
      });
  } else if (lang === "both") {
    Food.findAll({
      where: {
        [Op.or]: [
          { nameEn: { [Op.iLike]: `%${food}` } },
          { nameId: { [Op.iLike]: `%${food}` } },
        ],
      },
      include: [
        {
          model: foodGoodFor,
          include: ["foodsGoodFor"],
        },
        {
          model: foodBadFor,
          include: ["foodsBadFor"],
        },
      ],
    })
      .then((data) => {
        res.send({
          message: "Success",
          error: null,
          ok: true,
          food: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          ok: false,
          message: err.message || "Some error occurred while retrieving food.",
          error: "Error retrieving data for find food",
        });
      });
  } else {
    res.status(500).send({
      message: "Language unknown!",
    });
  }
};
exports.deleteFood = (req, res) => {
  const id = req.params.id;

  Food.destroy({
    where: { id_food: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Food successfully deleted!",
        });
      } else {
        res.status(404).send({
          message: "Food not found!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred!",
      });
    });
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

exports.findFood = (req, res) => {
  const { lang, foods } = req.body;
  if (lang === "id") {
    Food.findAll({
      where: { nameId: { [Op.iLike]: { [Op.any]: foods } } },
      include: [
        {
          model: foodGoodFor,
          include: ["foodsGoodFor"],
        },
        {
          model: foodBadFor,
          include: ["foodsBadFor"],
        },
      ],
    })
      .then((data) => {
        res.send({
          message: "Success",
          error: null,
          ok: true,
          food: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          ok: false,
          message: err.message || "Some error occurred while retrieving food.",
          error: "Error retrieving data for find food",
        });
      });
  } else if (lang === "en") {
    Food.findAll({
      where: { nameEn: { [Op.iLike]: { [Op.any]: foods } } },
      include: [
        {
          model: foodGoodFor,
          include: ["foodsGoodFor"],
        },
        {
          model: foodBadFor,
          include: ["foodsBadFor"],
        },
      ],
    })
      .then((data) => {
        res.send({
          message: "Success",
          error: null,
          ok: true,
          food: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          ok: false,
          message: err.message || "Some error occurred while retrieving food.",
          error: "Error retrieving data for find food",
        });
      });
  } else if (lang === "both") {
    Food.findAll({
      where: {
        [Op.or]: [
          { nameEn: { [Op.iLike]: { [Op.any]: foods } } },
          { nameId: { [Op.iLike]: { [Op.any]: foods } } },
        ],
      },
      include: [
        {
          model: foodGoodFor,
          include: ["foodsGoodFor"],
        },
        {
          model: foodBadFor,
          include: ["foodsBadFor"],
        },
      ],
    })
      .then((data) => {
        res.send({
          message: "Success",
          error: null,
          ok: true,
          food: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          ok: false,
          message: err.message || "Some error occurred while retrieving food.",
          error: "Error retrieving data for find food",
        });
      });
  } else {
    res.status(500).send({
      message: "Language unknown!",
    });
  }
};
