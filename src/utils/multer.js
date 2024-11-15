import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const multerHandler = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        // Handle other errors
        return res.status(500).json({ error: "Something went wrong during file upload" });
      }
      next();
    });
  };
};

export default multerHandler;
