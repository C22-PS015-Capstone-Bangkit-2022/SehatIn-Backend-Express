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
            type: Sequelize.STRING,
            get(){
                const value = this.getDataValue('tag');
                return value === null? null : JSON.parse(value);
            }
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