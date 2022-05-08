import path from "path";
import express from "express";
import multer from "multer";
import asyncHandler from "express-async-handler";
const router = express.Router();

import pkg from "cloudinary";
const cloudinary = pkg;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|webp|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// const multi_upload = multer({
//     storage,
//     limits: { fileSize: 4 * 1024 * 1024 }, // 4MB
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ||file.mimetype == "image/webp") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             const err = new Error('Only .png, .jpg and .jpeg format allowed!')
//             err.name = 'ExtensionError'
//             return cb(err);
//         }
//     },
// }).array('uploadedImages', 6)

const multi_upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
router.post(
  "/",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const uploadPhoto = await cloudinary.uploader.upload(`${req.file.path}`);
    console.log(uploadPhoto);
    console.log(uploadPhoto.url);
    res.send(uploadPhoto.url);
  })
);

// router.post("/upload-images", upload.array("uploadedImages", 6), (req, res) => {
//   res.send(req.files);
// });
// let User = require('../models/User');
router.post(
  "/upload-images",
  multi_upload.array("uploadedImages", 6),
  asyncHandler(async (req, res) => {
    const reqFiles = [];
    // const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      const uploadPhoto = await cloudinary.uploader.upload(
        `${req.files[i].path}`
      );
      console.log(uploadPhoto);
      const obj = {
        img:uploadPhoto.url,
      };
      reqFiles.push(obj);
    }

    res.json(reqFiles);
  })
);

// router.post(
//   "/upload-images",
//   multi_upload.array("uploadedImages", 6),
//   (req, res) => {
//     const reqFiles = [];
//     // const url = req.protocol + "://" + req.get("host");
//     for (var i = 0; i < req.files.length; i++) {
//       const obj = {
//         img: '/uploads/' + req.files[i].filename
//       }
//       reqFiles.push(obj);
//     }


//     res.json(reqFiles);

//   }
// );

export default router;
