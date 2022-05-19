require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const expressFileUpload = require("express-fileupload");
//Firebase middleware
const { initializeApp, applicationDefault } = require("firebase-admin/app");
initializeApp({ credential: applicationDefault() });
const { getAuth } = require("firebase-admin/auth");
const firebaseAuth = getAuth();

const db = require("./models/");
const dbConfig = require("./config/db.config");
const cors = require("cors");
const Article = db.articles;
global.__basedir = "./";
const app = express();
const authMiddleWare = require("firebase-auth-express-middleware");
const API_VERSION = "1.01";
const PORT = process.env.PORT || 3300;
const { swaggerDocs: V1SwaggerDocs } = require("./swagger"); //documentation

let corsOptions = {
  origin: ["*"],
};

require("dotenv").config();

//use cors
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/form-data
app.use(expressFileUpload());

db.sequelize.sync({force: true});

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
  res.send(`<h2>SehatIn API v${API_VERSION}</h2>`);
});

//Testing middleware firebase
app.get(
  "/data/:organisationID",
  // Add authorization middleware to ensure users can only access data of their own organization.
  // Checks that the specified organizationID in the URL matches user's own organizationID value in their token.
  authMiddleWare.authz((token, req) => token.org === req.params.organisationID),

  // This route handler will only run if the predicate above returns true!
  (req, res) => {
    console.log("Decoded token: ", req.authenticatedUser);

    res.status(200).end();
  }
);

require("./routes/routes")(app);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
