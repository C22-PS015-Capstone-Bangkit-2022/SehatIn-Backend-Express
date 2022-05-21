module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define(
    "article",
    {
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
      id_artikel: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: Sequelize.STRING
      },
    },
  );
  return Article;
};
