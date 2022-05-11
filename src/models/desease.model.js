module.exports = (sequelize, Sequelize) => {
    const Desease = sequelize.define("desease", {
      nama_penyakit : {
        type : Sequelize.STRING
      },
    });
  
    return Desease;
};
