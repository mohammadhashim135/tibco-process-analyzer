import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.originalname.endsWith(".process")) {
      cb(null, true);
    } else {
      cb(new Error("Only .process files are allowed"));
    }
  },
});