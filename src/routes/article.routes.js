module.exports = app => {
    const articles = require("../controllers/article.controller");

    let router = require("express").Router();

    router.get("/articles", articles.allArticles);

    // Retrieve a single Tutorial with izd
    router.get("/articles/:id_artikel", articles.articleById);

    app.use("/api/sehatin", router);
}