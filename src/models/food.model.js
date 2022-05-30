module.exports = (sequelize, Sequelize) => {
    const Food = sequelize.define("food", {
        id_food: {
            type : Sequelize.INTEGER,
            primaryKey : true,
            unique: true,
            autoIncrement: true
        },
        nameId: {
            type: Sequelize.STRING
        },
        nameEn: {
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
        thumbnail_image: {
            type: Sequelize.STRING,
        }
    },
        {
            createdAt: false,
            updatedAt: false
        });
    return Food;
};