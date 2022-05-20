module.exports = (sequelize, Sequelize) => {
    const foodForDisease = sequelize.define("foodForDisease", {
            id : {
                type : Sequelize.INTEGER,
                primaryKey : true,
                autoIncrement: true
            },
            good_for : {
                type : Sequelize.INTEGER
            },
            bad_for: {
                type : Sequelize.INTEGER
            },
            type: {
                type : Sequelize.INTEGER //0 for bad food, 1 for good food
            }
        },
    );

    return foodForDisease;
};
