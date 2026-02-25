import mongoose from "mongoose"


const cartSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [{
        
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,

        },
        quantity: {
            type: Number,
            required : true,
            min : 1
        }
    }],
    isCompleted: {
        type : Boolean,
        default : false
    }

},

    {
        timestamps: true
    }

)


export const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema)