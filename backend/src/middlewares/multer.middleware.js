import {multerUpload} from "../config/multer.config.js"
import { ApiError } from "../utils/responses/ApiError.js";

export const uploadSingleImage = (req, res, next) => {
    multerUpload.single("productImage")(req, res, (err) => {
        if(err){
            // Handling multer specific errors
            if (err.code === "LIMIT_FILE_SIZE"){
                throw new ApiError(400, "File size exceeds 5MB limit")
            }
            throw new ApiError(400, err.message || "File upload failed")
        }
        next();
    })
}

export const uploadMultipleImages = multerUpload.array("images", 5);