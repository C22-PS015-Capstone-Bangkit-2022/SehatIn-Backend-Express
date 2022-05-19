module.exports = (sequelize, Sequelize) => {
    const Sport = sequelize.define("sport", {
        category: {
            type: Sequelize.STRING
        },
        Activity: {
            type: Sequelize.STRING
        }, 
        energy: {
            type: Sequelize.FLOAT
        },
        avg_duration: {
            type: Sequelize.INTEGER
        }
    })
}