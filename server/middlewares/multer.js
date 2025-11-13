import multer from "multer";

//to help cloudinary to upload img
const upload = multer({storage: multer.diskStorage({})})

export default upload;