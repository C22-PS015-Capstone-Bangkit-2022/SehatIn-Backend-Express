const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.disease = require("./disease.model")(sequelize, Sequelize);
db.foods = require("./food.model")(sequelize, Sequelize);
db.articles = require("./article.model")(sequelize, Sequelize);
db.screening_question = require("./screening_question.model")(
  sequelize,
  Sequelize
);
db.sport = require("./sport.model")(sequelize, Sequelize);
db.sportGoodFor = require("./sportGoodFor.model")(sequelize, Sequelize);
db.sportBadFor = require("./sportBadFor.model")(sequelize, Sequelize);
db.images = require("./image.model.js")(sequelize, Sequelize);
db.foodGoodFor = require("./foodGoodFor.model")(sequelize, Sequelize);
db.foodBadFor = require("./foodBadFor.model")(sequelize, Sequelize);

db.disease.hasMany(db.foodGoodFor, { foreignKey: "id_disease" });
db.foodGoodFor.belongsTo(db.foods, {
  foreignKey: "id_food",
  as: "goodFoods",
});

db.disease.hasMany(db.foodBadFor, { foreignKey: "id_disease" });
db.foodBadFor.belongsTo(db.foods, {
  foreignKey: "id_food",
  as: "badFoods",
});

db.foods.hasMany(db.foodBadFor, { foreignKey: "id_food" });
db.foodBadFor.belongsTo(db.disease, {
  foreignKey: "id_disease",
  as: "foodsBadFor",
});

db.foods.hasMany(db.foodGoodFor, { foreignKey: "id_food" });
db.foodGoodFor.belongsTo(db.disease, {
  foreignKey: "id_disease",
  as: "foodsGoodFor",
});


db.disease.hasMany(db.sportGoodFor, { foreignKey: "id_disease" });
db.sportGoodFor.belongsTo(db.sport, {
  foreignKey: "id_sport",
  as: "goodSports",
});


db.disease.hasMany(db.sportBadFor, { foreignKey: "id_disease" });
db.sportBadFor.belongsTo(db.sport, {
  foreignKey: "id_sport",
  as: "badSports",
});

//db.foodGoodFor.hasOne(db.foods, {foreignKey: 'id_food'})
//db.disease.hasMany(db.foodBadFor, {as:"badFor"})
// db.foodGoodFor.belongsTo(db.disease, {
//     foreignKey: "id_penyakit",
//     as: "disease",
// });
// db.foodBadFor.belongsTo(db.disease, {
//     foreignKey: "id_penyakit",
//     as: "disease",
// });
db.disease.hasMany(db.screening_question, {
  foreignKey: "untuk_penyakit",
});
//db.screening_question.belongsTo(db.disease,{foreignKey: "untuk_penyakit",as:"disease"})

// db.screening_question.belongsTo(db.disease);

module.exports = db;
