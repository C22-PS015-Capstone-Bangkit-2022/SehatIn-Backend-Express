const user = require("../controllers/user.controller");
const disease = require("../controllers/disease.controller");
const articles = require("../controllers/article.controller");
const foods = require("../controllers/food.controller");
const sports = require("../controllers/sport.controller");
const doctors = require("../controllers/doctor.controller");
const screening_question = require("../controllers/screening_question.controller");
const images = require("../controllers/image.controller");
const upload = require("../middleware/upload");
const authMiddleWare = require("firebase-auth-express-middleware");
const { getAuth } = require("firebase-admin/auth");
const firebaseAuth = getAuth();
const tag = require("../controllers/tag.controller");

module.exports = (app) => {
  const router = require("express").Router();

  /* DISEASE */
  router.get("/disease/screening", disease.findAllWithScreening);
  router.get("/disease/all", disease.findAll);
  router.get("/disease/find/:id",disease.findDiseaseById);
  router.get("/disease/find/:id/screening",disease.findDiseaseWithScreeningByID);
  router.get("/disease/allGoodFood",disease.getAllGoodFood);
  router.get("/disease/allBadFood",disease.getAllBadFood);
  router.get("/disease/my/goodFood", authMiddleWare.authn(firebaseAuth),disease.getMyGoodFood);
  router.get("/disease/searchById", disease.searchById);

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
  router.put("/articles/edit/:id", articles.updateArticle);

  // Delete an Article
  router.delete("/articles/delete/:id", articles.deleteArticle);

  /*FOOD*/
  // Create a food
  router.post("/food/new", foods.addFood);

  // Get food
  router.get("/food/all", foods.allFoods);

  // delete a food
  router.delete("/food/delete/:id", foods.deleteFood);

  // edit a food
  router.put("/food/edit/:id", foods.updateFood);

  // upload images
  router.post("/upload", images.multer.single("file"), images.uploadFile);
  
  /* SPORT */
  // create a sport
  router.post("/sports/new", sports.addSport);

  // Retrieve all sports
  router.get("/sports", sports.getAllSports);

  // Retrieve my sports
  router.get("/sport/my/goodSport", authMiddleWare.authn(firebaseAuth),sports.getMyGoodSport);

  // Retrieve all good sports
  router.get("/sport/allGoodSport",sports.getAllGoodSport);

  // Retrieve all bad sports
  // router.get("/sport/allBadSport",sports.getAllBadSport);
  
  // Retrieve a sport by id
  router.get("/sports/:id", sports.getSportById);
  
  // Delete a sport by id
  router.delete("/sports/delete/:id", sports.deleteSport);
  
  // Update a sport by id
  router.put("/sports/edit/:id", sports.updateSport);

  //get tag
  router.get("/tag", tag.findAll)

  app.use("/v1/", router);
};
