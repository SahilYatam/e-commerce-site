import fs from "fs";
import cloudinary from "../../config/cloudinary.config.js";
import { ApiError } from "../responses/ApiError.js"
import logger from "../logger/logger.js"

export const uploadToCloudinary = async (filePath, folder) => {
    try {
        if(!filePath){
            throw new ApiError(400, "File path missing");
        }
        if (!fs.existsSync(filePath)) {
            throw new ApiError(404, "File not found");
        }

        const result = await cloudinary.uploader.upload(
            filePath, {
            folder,
            transformation: [
                { width: 800, height: 800, crop: "limit" },
                { quality: "auto" },
                { fetch_format: "auto" }
            ],
            resource_type: "image"
        }
        );
        fs.unlinkSync(filePath) // delete local file after upload
        return result;
    } catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        console.error("CLOUDINARY FULL ERROR:", error);

        logger.error("Cloudinary upload failed", {
            name: error.name,
            message: error.message,
            http_code: error.http_code,
            api_error: error.error
        })

        throw new ApiError(
            error.http_code || 500,
            error.message || "Cloudinary upload failed"
        );
    }
}