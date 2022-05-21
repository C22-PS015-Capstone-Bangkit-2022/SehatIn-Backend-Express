module.exports = (sequelize, Sequelize) => {
    const Food = sequelize.define("food", {
        nama_makanan: {
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
        tipe_makanan: {
            type: Sequelize.STRING
        },
        id_makanan: {
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