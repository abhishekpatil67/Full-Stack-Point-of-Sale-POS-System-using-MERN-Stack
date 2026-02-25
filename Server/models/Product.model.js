import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["male", "female", "kids"],
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price:
    {
        type: Number,
        required: true,
    },
    salesPrice:
    {
        type: Number,
        required: true,
    },
    totalStock: {
        type : Number,
        required: true,
    },
},
    {
        timestamps: true
    }

)

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema)