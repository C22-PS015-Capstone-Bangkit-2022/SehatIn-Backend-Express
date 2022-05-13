const user = require('../controllers/user.controller');
const disease = require('../controllers/disease.controller');
const articles = require("../controllers/article.controller");
const screening_question = require("../controllers/screening_question.controller");

module.exports = app => {
    var router = require("express").Router();

    /* DISEASE */
    router.get("/disease", disease.findAll)

    /* USER */
    router.get("/user", user.findAll);

    /* SCREEENING_QUESTION */
    router.get("/screening-question", screening_question.findAll);
  
    /* ARTICLE*/
    // Retrieve all Articles with id
    router.get("/articles", articles.allArticles);

    // Retrieve a single Article with id
    router.get("/articles/:id", articles.articleById);

    app.use("/api/sehatin", router);
}
