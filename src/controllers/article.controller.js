const { articles } = require("../models");
const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: articles } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, articles, totalPages, currentPage };
};

exports.allArticles = (req, res) => {
  const { page, size, judul } = req.query;
  var condition = judul ? { judul: { [Op.like]: `%${judul}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Article.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};

exports.articleById = (req, res) => {
    const id = req.params.id;
  
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
