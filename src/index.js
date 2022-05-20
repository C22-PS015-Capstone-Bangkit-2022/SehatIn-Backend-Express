require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const expressFileUpload = require("express-fileupload");
//Firebase middleware
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const admin = require('firebase-admin');

let googleKeyFile = "";
if (process.env.NODE_ENV === "production") {
    googleKeyFile = "../google-credentials.json"
}else{
    //your own location on your dev machine
    googleKeyFile = process.env.GOOGLE_PRIVATE_KEY
}
const serviceAccount = require(googleKeyFile);
initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
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
    origin: "*"
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
  res.send(`<h2>SehatIn API v${API_VERSION}</h2>`);
});

//Testing middleware firebase
app.get(
  "/data/:organisationID",
    authMiddleWare.authn(firebaseAuth),

  // This route handler will only run if the predicate above returns true!
  (req, res) => {
    console.log("Decoded token: ", req.authenticatedUser);
    if(req.authenticatedUser.admin){
        res.status(200).send({
            message: "You are admin"
        });;
    }else{
        res.status(200).send({
            message: "You are not admin"
        });;
    }


  }
);

require("./routes/routes")(app);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
