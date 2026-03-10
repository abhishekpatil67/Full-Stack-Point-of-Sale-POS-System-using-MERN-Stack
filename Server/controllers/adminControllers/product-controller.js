
import uploadCloudinaryUtil from "../../helpers/Cloudinary.js";
import { productSchema, editProductSchema } from "../../validators/ProductValidator.js";
import { Product } from "../../models/Product.model.js";

export const uploadImageToCloudinary = async (req, res) => {

    const file = await req.file;
    if (!file) {
        return (res.status(400).json({ success: false, message: "no file provided" }))
    }
    try {

        const b64 = Buffer.from(file.buffer).toString('base64');
        const url = "data:" + file.mimetype + ";base64," + b64;
        const result = await uploadCloudinaryUtil(url)

        return (res.status(200).json({ success: true, result }))

    } catch (error) {

        console.log(error, "error while uploading to the server")
        return (res.status(500).json({ success: false, message: "internal server while uploading the file" }))
    }
}



export const addProductController = async (req, res) => {

    console.log(req.body)


    
    const result = productSchema.safeParse(req.body)

    if (!result.success) {
        return (res.status(400).json({ success: false, message: "Invalid Credentials..." }))
    }

    try {

        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salesPrice,
            totalStock } = result.data


        const newlyCreatedProduct = await Product.create({
            image,
            title,
            description,
            category,
            brand,
            price,
            salesPrice,
            totalStock

        })

        await newlyCreatedProduct.save();


        return (res.status(201).json({ success: true, message: "Product Added Successfully" }))
    } catch (error) {

        console.log(error)

        return (res.status(500).json({ success: false, message: "Internal Server Error. Try after some time" }))

    }

}


export const getProductController = async (req, res) => {

    try {

        const productList = await Product.find({})
        return (res.status(200).json({ success: true, data: productList}))

    } catch (error) {
        console.log(error)
        return (res.status(500).json({ success: false, message: "internal server error." }))

    }


}


export const deleteProductController = async (req, res) => {

    const { id } = req.params

    if (!id) {

        return (res.status(401).json({ success: false, message: "Product Id is missing" }))
    }

    try {

        const isProduct = await Product.findByIdAndDelete({ _id: id })

        if (!isProduct) {

            return (res.status(401).json({ success: false, message: "product not found" }))

        }

        return (res.status(200).json({ success: true, message: "Product Deleted Sucessfully" }))

    } catch (error) {

        console.log(error)
        return (res.status(500).json({ success: false, message: "internal server error. try again later" }))

    }


}



export const editProductController = async (req, res) => {

    const { id } = req.params
    console.log(req.body)
    const {
        title,
        description,
        category,
        brand,
        price,
        salesPrice,
        totalStock
    } = req.body

    if (!id) {
        return (res.status(400).json({ success: false, message: "invalid credentials" }))
    }

    const isValidate = editProductSchema.safeParse(
        {
            title,
            description,
            category,
            brand,
            price,
            salesPrice,
            totalStock
        }
    )

    if (!isValidate.success) {
        console.log(isValidate)
        return (res.status(400).json({ success: false, message: "invalid credentials" }))
    }

    try {
        const result = await Product.findById(id)

        if (!result) {
            return (res.status(400).json({ success: false, message: "no product found with the given id" }))

        }

        result.title = title ? title : result.title
        result.description = description ? description : result.description
        result.category = category ? category : result.category
        result.brand = brand ? brand : result.brand
        result.price = price ? price : result.price
        result.salesPrice = salesPrice ? salesPrice : result.salesPrice
        result.totalStock = totalStock ? totalStock : result.totalStock

        await result.save();

        if (result) {
            return (res.status(200).json({ success: true, message: "Product edited  Sucessfully", editedProduct: result }))
        }


    } catch (error) {


        return (res.status(500).json({ success: false, message: "internal server error" }))




    }


}







