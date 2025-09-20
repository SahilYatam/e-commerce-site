import fs from "fs";
import cloudinary from "../../config/cloudinary.config.js";
import {ApiError} from "../responses/ApiError.js"
import logger from "../logger/logger.js"

export const uploadToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(
            filePath, {
                folder,
                transformation: [
                    {width: 800, height: 800, crop: "limit"},
                    {quality: "auto"},
                    {fetch_format: "auto"}
                ]
            }
        );
        fs.unlinkSync(filePath) // delete local file after upload
        return result;
    } catch (error) {
        fs.unlinkSync(filePath); // still clean up in case of error
        logger.error("Error while uploading image on cloudinary", {message: error.message, stack: error.stack});

        throw new ApiError(500, "Error while uploading image on cloudinary", {message: error.message, stack: error.stack});        
    }
}