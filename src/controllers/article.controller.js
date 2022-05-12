const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

exports.allArticles = (req, res) => {
    const judul = req.query.judul;
    let condition = judul ? { judul: { [Op.iLike]: `%${judul}%` } } : null;

    Article.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};

exports.articleById = (req, res) => {
    const id = req.params.id_artikel;
  
    Article.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: 
            err.message || "Error retrieving Article with id=" + id
        });
      });
  };
