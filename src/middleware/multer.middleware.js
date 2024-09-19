import multer from "multer";
import fs from "fs";
import path from "path";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid"; // we can also use nanoid
import { ErrorClass, extensions } from "../utils/bootstrap.js";

export const multerMiddleware = ({
  filePath = "general",
  allowedExtensions = extensions.Images,
}) => {
  const destinationPath = path.resolve([`../uploads/${filePath}`]);

  // create the folder if it does not exist
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, destinationPath);
    },
    filename: (req, res, cb) => {
      const now = DateTime.now().toFormat("yyyy-MM-dd");
      const uniqueString = uuidv4();
      const uniqueFileName = `${now}_${uniqueString}_${file.originalname}`;
      cb(null, uniqueFileName);
    },
  });

  const fileFilter = (req, res, cb) => {
    if (allowedExtensions.includes(file.mimetype)) {
      return cb(null, true);
    }

    cb(
      new ErrorClass(
        `Invalid file type. Allowed File types: ${allowedExtensions.Images}`
      ),
      false
    );
  };

  return multer({ fileFilter, storage });
};

export const multerHost = ({ allowedExtensions = extensions.Images }) => {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    console.log(file);
    if (allowedExtensions.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new ErrorClass(
          `Invalid file type, only ${allowedExtensions} images are allowed`,
          400,

          `Invalid file type, only ${allowedExtensions} images are allowed`
        ),
        false
      );
    }
  }

  return multer({
    fileFilter,
    storage,
  });
};
