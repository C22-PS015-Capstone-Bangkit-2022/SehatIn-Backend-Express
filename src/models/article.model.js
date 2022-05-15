module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("artikel", {
        judul: {
            type: Sequelize.STRING
        }, 
        isi_artikel: {
            type: Sequelize.TEXT
        }, 
        id_image: {
            type: Sequelize.INTEGER
        },
        source: {
            type: Sequelize.STRING
        }, 
        tag: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: null
        },
        id_artikel: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            allowNull: true,
            type: "TIMESTAMP"
        }
    }, 
    {
        updatedAt: false
    });
    return Article;
};