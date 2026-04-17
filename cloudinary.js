import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const fileUplodeOnCloudnary = async(filepath) => {

    try {
        if (!filepath) return null;

       const response = await cloudinary.uploader.upload(filepath, { resource_type:"auto" });


        console.log(`response:- ${response}`)
        return response
    } catch (error) {
        console.log(`File Uploading Error:-${error}`);
        return null;
    }
    
}

export default fileUplodeOnCloudnary;