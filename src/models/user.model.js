module.exports  = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      nama: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      id_image : {
          type : Sequelize.INTEGER
      },
      tgl_lahir : {
        type: Sequelize.STRING
      },
      id_user : {
          type : Sequelize.INTEGER
      },
      jenis_kelamin: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
    
    return User;
};

