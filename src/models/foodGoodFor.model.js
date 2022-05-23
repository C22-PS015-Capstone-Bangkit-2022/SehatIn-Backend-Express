const { disease, foods } = require(".");

module.exports = (sequelize, Sequelize) => {
    const foodGoodFor = sequelize.define("foodGoodFor", {
            id_food : {
                type : Sequelize.INTEGER,
                primaryKey : true,
                autoIncrement: true
            },
            id_disease: {
                type : Sequelize.INTEGER
            },
        },
        {
            createdAt: false,
            updatedAt: false
        },
    );

    return foodGoodFor;
};
