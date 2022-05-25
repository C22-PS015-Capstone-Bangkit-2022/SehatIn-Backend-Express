module.exports = (sequelize, Sequelize) => {
    const Food = sequelize.define("food", {
        name: {
            type: Sequelize.STRING
        },
        energy: {
            type: Sequelize.FLOAT
        },
        avg_portion: {
            type: Sequelize.FLOAT
        },
        fat:{
            type: Sequelize.FLOAT
        },
        protein: {
            type: Sequelize.FLOAT
        },
        carbs: {
            type: Sequelize.FLOAT
        },
        type_food: {
            type: Sequelize.STRING
        },
        id_food: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
    },
        {
            createdAt: false,
            updatedAt: false
        });
    return Food;
};