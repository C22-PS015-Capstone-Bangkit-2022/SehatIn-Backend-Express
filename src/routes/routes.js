module.exports = app => {
    const articles = require("../controllers/article.controller");

    let router = require("express").Router();

    // Retrieve all Articles with id
    router.get("/articles", articles.allArticles);

    // Retrieve a single Article with id
    router.get("/articles/:id", articles.articleById);

    app.use("/api/sehatin", router);
}