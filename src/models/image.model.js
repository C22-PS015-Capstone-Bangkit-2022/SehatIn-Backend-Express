module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("image", {
      id_image: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      data: {
        type: Sequelize.BLOB("long"),
      },
    });
  
    return Image;
  };