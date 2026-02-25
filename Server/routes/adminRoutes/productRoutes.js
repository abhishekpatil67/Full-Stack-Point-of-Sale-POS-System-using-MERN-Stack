import express from "express"
import { uploadImageToCloudinary, addProductController, deleteProductController, editProductController, getProductController } from "../../controllers/adminControllers/product-controller.js"
import upload from "../../middleware/multer/multerMiddleware.js"
import { v2 as cloudinary } from 'cloudinary';



const router = express.Router()



router.post("/upload-image", upload.single("my-file"), uploadImageToCloudinary)
router.post("/create-product", addProductController)
router.get("/get-products", getProductController)
router.delete("/delete-product/:id", deleteProductController)
router.put("/edit-product/:id", editProductController)


export default router





