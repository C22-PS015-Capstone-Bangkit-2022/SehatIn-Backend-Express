const { articles } = require("../models");
const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

//Change format time
const time = (date)=>{
  return require('moment')(date).format()
}
exports.addArticle = (req, res) => {
  console.log(req.body);
  if (!req.body.judul || !req.body.isi_artikel) {
    res.status(400).send({
      message: "Title or content of article can not be empty!",
    });
    return;
  }

  const created_at = time(req.body.created_at);

  const artikel = { 
    judul: req.body.judul, 
    isi_artikel: req.body.isi_artikel, 
    thumbnail_image: req.body.thumbnail_image, 
    tag: req.body.tag, 
    source_link: req.body.source_link, 
    source_name: req.body.source_name,
    created_at
  }


  // create article
  Article.create(artikel)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while create the article.",
      });
    });
};

exports.updateArticle = (req, res) => {
  const id = req.params.id;

  Article.update(req.body, {
    where: { id_artikel: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Article successfully updated!",
        });
      } else {
        res.status(404).send({
          message: "article not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred!",
      });
    });
};

exports.deleteArticle = (req, res) => {
  const id = req.params.id;

  Article.destroy({
    where: { id_artikel: id },
  })
    .then((num) => {
      if (num === 1) {
        res.status(200).send({
          message: "Article successfully deleted!",
        });
      } else {
        res.status(404).send({
          message: "Article not found!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred!",
      });
    });
};

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

exports.getAllArticles = (req, res) => {
  const { page, size, title } = req.query;
  let condition = title ? { judul: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Article.findAndCountAll({ where: condition, limit, offset, order: [['id_artikel', 'DESC']] })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles.",
      });
    });
};

exports.getArticleById = (req, res) => {
  const id = req.params.id;

  Article.findByPk(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Article with id=" + id,
      });
    });
};
