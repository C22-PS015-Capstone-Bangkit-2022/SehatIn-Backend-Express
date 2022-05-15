module.exports = (sequelize, Sequelize) => {
    const Food = sequelize.define("makanan", {
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
        good_for: {
            type: Sequelize.ARRAY(Sequelize.STRING)
        }, 
        bad_for: {
            type: Sequelize.ARRAY(Sequelize.STRING)
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