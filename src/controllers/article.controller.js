const { articles } = require("../models");
const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;


exports.addArticle = (req, res)=>{
  if(!req.body.judul || !req.body.isi_artikel) {
    res.status(400).send({
      message: "Title or content of article can not be empty!"
    });
    return;
  }

  const artikel = {judul, isi_artikel, id_image, source, tag} = req.body;

  // create article
  Article.create(artikel)
    .then(data=> {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occured while create the article."
      });
    });
}

exports.updateArticle = (req, res) => {
  const id = req.params.id;

  Article.update(req.body, {
    where: {id_artikel: id}
  })
    .then(num => {
      if(num == 1){
        res.send({
          message: "Article successfully updated!"
        });
      } else {
        res.send({
          message: `Cannot update Article`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating"
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
  var condition = title ? { judul: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Article.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};

exports.getArticleById = (req, res) => {
    const id = req.params.id;
  
    Article.findByPk(id)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: 
            err.message || "Error retrieving Article with id=" + id
        });
      });
  };
