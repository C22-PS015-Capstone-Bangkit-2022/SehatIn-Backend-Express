require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models/");
const dbConfig = require("./config/db.config")
const cors = require("cors");
const Article = db.articles;

const app = express();
const API_VERSION ="1.01"
const PORT = process.env.PORT || 3300;
const { swaggerDocs: V1SwaggerDocs } = require("./swagger"); //documentation
let corsOptions = {
    origin: ['*']
};

require('dotenv').config()

//use cors
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
db.sequelize.sync();

// db.sequelize.sync({force: true}).then(() => {
//     for(let i = 1; i<= 25; i++){
//         const article = {
//             judul: `judul${i}`,
//             isi_artikel: `isi${i}`,
//             id_image:679897,
//             source:'google',
//             tag: 'kesehatan',
//         }
//         Article.create(article)
//     }
// })
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


// For testing purposes
app.get("/", (req, res) => {
    res.send(  `<h2>SehatIn API v${API_VERSION}</h2>`);
});

require("./routes/routes")(app);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
    V1SwaggerDocs(app, PORT);
});