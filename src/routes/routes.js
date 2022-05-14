const user = require('../controllers/user.controller');
const disease = require('../controllers/disease.controller');
const articles = require("../controllers/article.controller");
const foods = require("../controllers/food.controller");
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
    router.get("/articles", articles.getAllArticles);

    // Retrieve a single Article with id
    router.get("/articles/:id", articles.getArticleById);

    // Create a new article
    router.post("/articles", articles.addArticle);

    // Update an Article
    router.put("/articles/:id", articles.updateArticle)

    // Delete an Article
    router.delete("/articles/:id", articles.deleteArticle);

    /*FOOD*/
    // Create a food
    router.post("/food", foods.addFood);

    // Get All food
    router.get("/food", foods.getAllFoods);

    app.use("/v1/", router);
}
