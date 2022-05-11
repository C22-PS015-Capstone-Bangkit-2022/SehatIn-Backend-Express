// In src/index.js
const express = require("express");
const client = require("../database");

const app = express();
const PORT = process.env.PORT || 3000;


// For testing purposes
app.get("/", (req, res) => {
    res.send("<h2>It's Working!</h2>");
});

app.get("/artikel", (req, res) => {
    client.query("select * from artikel", (err, result) => {
        if (!err){
            res.send(result.rows)
        }
    })
})

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});