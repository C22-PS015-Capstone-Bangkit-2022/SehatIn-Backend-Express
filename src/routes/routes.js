// const client = require("../config/database");
const user = require('../controllers/user');
const desease = require('../controllers/desease');

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
    app.use("/api/v1", router);
}

