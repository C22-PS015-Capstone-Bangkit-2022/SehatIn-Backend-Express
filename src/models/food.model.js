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
        nutrisi: {
            type: Sequelize.STRING
        }, 
        tipe_makanan: {
            type: Sequelize.STRING
        },
        good_for: {
            type: Sequelize.INTEGER
        }, 
        bad_for: {
            type: Sequelize.INTEGER
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