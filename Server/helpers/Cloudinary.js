import { v2 as cloudinary } from 'cloudinary';



cloudinary.config({
    cloud_name: "dwevkihj4",
    api_key: "142212646114425",
    api_secret: "NPU5_xZauqCkQsgV3xU2aadS_io",
    timeout : 60000
})

const uploadCloudinaryUtil = async (file) => {

 

        const result = await cloudinary.uploader.upload(file, {
            chunk_size: 6000000,
            resource_type: "auto",
        })
        return result;
    }

export default uploadCloudinaryUtil;








