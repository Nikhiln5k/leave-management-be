import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config";

// dynamic folder
const createStorage = (folder: string) => {
  return new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder: `uploads/${folder}`,
        resource_type: "auto", // supports images, pdf, etc.
        public_id: Date.now() + "-" + file.originalname.split(".")[0],
      };
    },
  });
};

export const uploadToCloud = (folder: string) =>
  multer({
    storage: createStorage(folder),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  });