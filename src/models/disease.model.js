module.exports = (sequelize, Sequelize) => {
    const Disease = sequelize.define("disease", {
      id_penyakit : {
        type : Sequelize.INTEGER,
        primaryKey : true
      },
      nama_penyakit : {
        type : Sequelize.STRING
      },
    });
  
    return Disease;
};
