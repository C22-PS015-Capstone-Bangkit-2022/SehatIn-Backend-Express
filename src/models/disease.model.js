module.exports = (sequelize, Sequelize) => {
    const Disease = sequelize.define("disease", {
      id_penyakit : {
        type : Sequelize.INTEGER,
        primaryKey : true,
         autoIncrement: true
      },
      nama_penyakit : {
        type : Sequelize.STRING
      },
    },
    {
      createdAt: false,
      updatedAt: false
    }
    );
    
    return Disease;
};
