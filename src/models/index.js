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
db.articles = require("./article.model")(sequelize, Sequelize);
db.screening_question = require("./screening_question.model")(sequelize, Sequelize);

db.disease.hasMany(db.screening_question,{
    foreignKey : "id_penyakit"
});

db.screening_question.belongsTo(db.disease);

module.exports = db;
