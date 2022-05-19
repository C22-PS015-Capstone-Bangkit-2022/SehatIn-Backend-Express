const user = require("../controllers/user.controller");
const disease = require("../controllers/disease.controller");
const articles = require("../controllers/article.controller");
const foods = require("../controllers/food.controller");
const sports = require("../controllers/sport.controller");
const screening_question = require("../controllers/screening_question.controller");
const images = require("../controllers/image.controller");
const upload = require("../middleware/upload");

module.exports = (app) => {
  const router = require("express").Router();

  /* DISEASE */
  router.get("/disease", disease.findAll);

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
  router.post("/articles/new", articles.addArticle);

  // Update an Article
  router.put("/articles/:id", articles.updateArticle);

  // Delete an Article
  router.delete("/articles/delete/:id", articles.deleteArticle);

  /*FOOD*/
  // Create a food
  router.post("/food/new", foods.addFood);

  // Get All food
  router.get("/food", foods.getAllFoodsByDiseases);

  // Get food by search
  router.get("/food/search", foods.searchFoods);

  // delete a food
  router.delete("/food/delete/:id", foods.deleteFood);

  // upload images
  router.post("/upload", images.multer.single("file"), images.uploadFile);
  
  /* SPORT */
  // create a sport
  router.post("/sports/new", sports.addSport);

  // Retrieve all sport
  router.get("/sports", sports.getAllSports);

  app.use("/v1/", router);
};
