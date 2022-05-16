const fs = require("fs");

const db = require("../models");
const Image = db.images

const uploadImage = async (req, res) => {
  try {
    console.log(req.file);

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/assets/image/" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/assets/tmp/" + image.name,
        image.data
      );
      return res.send('upload successfully');
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadImage,
};