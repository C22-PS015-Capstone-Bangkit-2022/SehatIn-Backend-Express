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
            type: Sequelize.STRING,
            get(){
                const value = this.getDataValue('good_for');
                return value === null? null : JSON.parse(value);
            }
        }, 
        bad_for: {
            type: Sequelize.STRING,
            get(){
                const value = this.getDataValue('bad_for');
                return value === null? null : JSON.parse(value);
            }
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