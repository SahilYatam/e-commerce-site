import {multerUpload} from "../config/multer.config.js"

export const uploadSingleImage = multerUpload.single("productImage");
export const uploadMultipleImages = multerUpload.array("images", 5);