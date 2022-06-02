module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define("tag", {
        id_tag: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nama_tag: {
            type: Sequelize.STRING
        }
    },
    {
        createdAt: false,
        updatedAt: false
    });
    return Tag;
}