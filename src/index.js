const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;
let corsOptions = {
    origin: ['*']
};

//use cors
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

pool.sequelize.sync();

// For testing purposes
app.get("/", (req, res) => {
    res.send("<h2>It's Working!</h2>");
});

require("./routes/article.routes")(app);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});