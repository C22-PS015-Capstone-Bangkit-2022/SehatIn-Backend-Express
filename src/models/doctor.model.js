module.exports = (sequelize, Sequelize) => {
    const doctor = sequelize.define("doctor", {
      id_doctor : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        unique: true,
        autoIncrement: true
      },
      name : {
        type : Sequelize.STRING
      },
      strNumber: {
        type: Sequelize.STRING
      },
      specialist: {
        type: Sequelize.STRING
      },
      experience_year: {
        type: Sequelize.INTEGER
      },
      alumnus: {
        type: Sequelize.STRING,
        get() {
          const value = this.getDataValue("alumnus");
          return value === null ? null : JSON.parse(value);
        },
        set(val) {
          this.setDataValue("alumnus", JSON.stringify(val ?? ""));
        },
      },
      practice_at: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      imageUrl: {
          type : Sequelize.STRING
      }
    },
    {
      createdAt: false,
      updatedAt: false
    }
    );
    
    return Disease;
};
