import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype === "application/msword" || file.mimetype.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      cb(null, true);
    } else {
      cb(new Error("Only .pdf, .doc, .docx files are allowed"));
    }
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default upload;
