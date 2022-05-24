module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define(
    "article",
    {
      
      id_artikel: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      judul: {
        type: Sequelize.STRING,
      },
      isi_artikel: {
        type: Sequelize.TEXT,
      },
      thumbnail_image: {
        type: Sequelize.STRING,
      },
      source: {
        type: Sequelize.STRING,
      },
      source_name: {
        type: Sequelize.STRING,
      },
      tag: {
        type: Sequelize.STRING,
        get() {
          const value = this.getDataValue("tag");
          return value === null ? null : JSON.parse(value);
        },
        set(val) {
          this.setDataValue("tag", JSON.stringify(val ?? ""));
        },
      },
      created_at: {
        type: Sequelize.STRING
      },
    },
    {
      timestamps: false
    }
  );
  return Article;
};
