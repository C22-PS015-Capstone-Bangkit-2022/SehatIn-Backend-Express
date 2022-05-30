module.exports = (sequelize, Sequelize) => {
    const sportGoodFor = sequelize.define("sportGoodFor", {
            id : {
                type : Sequelize.INTEGER,
                primaryKey : true,
                unique: true,
                autoIncrement: true
            },
            id_sport : {
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

    return sportGoodFor;
};
