const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("./user.model.js")(sequelize, Sequelize);
db.disease = require("./disease.model")(sequelize, Sequelize);
db.foods = require("./food.model")(sequelize, Sequelize);
db.articles = require("./article.model")(sequelize, Sequelize);
db.screening_question = require("./screening_question.model")(sequelize, Sequelize);
db.sport = require("./sport.model")(sequelize, Sequelize);
db.images = require("./image.model.js")(sequelize, Sequelize);
db.foodGoodFor = require("./foodGoodFor.model")(sequelize, Sequelize);
db.foodBadFor = require("./foodBadFor.model")(sequelize, Sequelize);

db.disease.hasMany(db.foodGoodFor, {foreignKey: 'id_disease'})
db.foodGoodFor.hasOne(db.foods, {foreignKey: 'id_makanan'})
db.disease.hasMany(db.foodBadFor, {as:"badFor"})
// db.foodGoodFor.belongsTo(db.disease, {
//     foreignKey: "id_penyakit",
//     as: "disease",
// });
// db.foodBadFor.belongsTo(db.disease, {
//     foreignKey: "id_penyakit",
//     as: "disease",
// });
db.disease.hasMany(db.screening_question,{
    foreignKey : "untuk_penyakit"
});

// db.screening_question.belongsTo(db.disease);

module.exports = db;
