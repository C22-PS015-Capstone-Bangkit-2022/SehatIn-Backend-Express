module.exports = (sequelize, Sequelize) => {
    const sportBadFor = sequelize.define("sportBadFor", {
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

    return sportBadFor;
};
