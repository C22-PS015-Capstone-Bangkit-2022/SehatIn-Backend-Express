module.exports = (sequelize, Sequelize) => {
    const Screening_question = sequelize.define("screening_question", {
      id_pertanyaan : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
      },
      pertanyaan : {
          type : Sequelize.STRING
      },
      untuk_penyakit : {
          type : Sequelize.INTEGER
      }
    },
    {
      createdAt: false,
      updatedAt: false
    });
  
    return Screening_question;
};