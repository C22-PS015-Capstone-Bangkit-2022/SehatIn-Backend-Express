module.exports = (sequelize, Sequelize) => {
    const Sport = sequelize.define("sport", {
        id_sport: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: Sequelize.STRING
        },
        activity: {
            type: Sequelize.STRING
        }, 
        energy: {
            type: Sequelize.FLOAT
        },
        thumbnail_image: {
            type: Sequelize.STRING
        }
    },
    {
        createdAt: false,
        updatedAt: false
    });
    return Sport;
}