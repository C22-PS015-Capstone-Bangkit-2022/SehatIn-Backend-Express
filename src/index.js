const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");

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

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


// For testing purposes
app.get("/", (req, res) => {
    res.send("<h2>It's Working!</h2>");
});

require("./routes/routes")(app);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});