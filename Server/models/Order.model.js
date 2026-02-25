import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  orderNumber: {
    type: String,
    required: true,
    unique: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },

      title: String,

      price: Number,

      quantity: Number,

      subtotal: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)