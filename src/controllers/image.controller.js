// const fs = require("fs");

// const db = require("../models");
// const Image = db.images

// exports.uploadImage = async (req, res) => {
//   try {
//     console.log(req.file);

//     Image.create({
//       type: req.file.mimetype,
//       name: req.file.originalname,
//       data: fs.readFileSync(
//         __basedir + "/assets/image/" + req.file.filename
//       ),
//     }).then((image) => {
//       fs.writeFileSync(
//         __basedir + "/assets/tmp/" + image.name,
//         image.data
//       );
//       return res.send('upload successfully');
//     });
//   } catch (error) {
//     console.log(error);
//     return res.send(`Error when trying upload images: ${error}`);
//   }
// };
const express = require("express");
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const app = express();

const DIR_NAME = "ARTICLE_IMAGE";

let googleKeyFile = "";
if (process.env.NODE_ENV === "production") {
  googleKeyFile = "./google-credentials.json";
} else {
  //your own location on your dev machine
  googleKeyFile = process.env.GOOGLE_PRIVATE_KEY_IMG;
}
// firebase init
const storage = new Storage({
  projectId: "sehatin-eab72",
  keyFilename: googleKeyFile,
});
const bucket = storage.bucket("gs://sehatin-eab72.appspot.com");

// multer
exports.multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// upload image to storage function
const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No image file");
    }
    let newFileName = `${Date.now()}_${file.originalname.replace(/ /g, "_")}`;

    let fileUpload = bucket.file(DIR_NAME + "/" + newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      reject(error);
    });

    blobStream.on("finish", async () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      let result = { image: url };
      try {
        // Make the file public
        await bucket.file(DIR_NAME + "/" + newFileName).makePublic();
        resolve(result);
      } catch {
        result = {
          message: `Uploaded the file successfully: ${newFileName}, but public access is denied!`,
          image: url,
        };
        reject(result);
      }
    });

    blobStream.end(file.buffer);
  });
};

exports.uploadFile = (req, res) => {
  let file = req.file;
  if (file) {
    uploadImageToStorage(file)
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((error) => {
        return res.status(500).send({
          error: error,
        });
        // return console.log(error);
      });
  } else {
    return res.status(422).send({
      error: "file is required",
    });
  }
};
