module.exports = (sequelize, Sequelize) => {
    const foodBadFor = sequelize.define("foodBadFor", {
            id : {
                type : Sequelize.INTEGER,
                primaryKey : true,
                autoIncrement: true
            },
            id_food : {
                type : Sequelize.INTEGER
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

    return foodBadFor;
};
