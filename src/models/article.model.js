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
            allowNull: true,
            get() {
                return this.getDataValue('good_for').split(';')
            },
            set(val) {
               this.setDataValue('good_for',val.join(';'));
            },
        }, 
        bad_for: {
            type: Sequelize.STRING,
            allowNull: true,
            get() {
                return this.getDataValue('bad_for').split(';')
            },
            set(val) {
               this.setDataValue('bad_for',val.join(';'));
            },
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