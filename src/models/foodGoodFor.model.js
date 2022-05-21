module.exports = (sequelize, Sequelize) => {
    const foodGoodFor = sequelize.define("foodGoodFor", {
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

    return foodGoodFor;
};
