// const client = require("../config/database");
const user = require('../controllers/user');
const desease = require('../controllers/desease');
const articles = require("../controllers/article.controller");

module.exports = app => {
    var router = require("express").Router();

    // router.get("/artikel", (req, res) => {
    //     client.query("select * from artikel", (err, result) => {
    //         if (!err){
    //             res.send(result.rows)
    //         }
    //     })
    // })
    router.get('/desease', desease.findAll)
    router.get('/user', user.findAll);
  
    /* ARTICLE*/
    // Retrieve all Articles with id
    router.get("/articles", articles.allArticles);

    // Retrieve a single Article with id
    router.get("/articles/:id", articles.articleById);

    app.use("/api/sehatin", router);
}
