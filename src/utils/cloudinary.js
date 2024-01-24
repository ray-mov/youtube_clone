import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { fileURLToPath } from 'url';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {

    if (!localFilePath) return null
    const response = await cloudinary.uploader.upload(localFilePath,
      { resource_type: "auto" });

    console.log('file uploaded', response.url);
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath);  //remove local temp saved file as upload fail
    return null;
  }
}

export { uploadOnCloudinary }




