import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            minLength: 2
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        hashedPass: {
            type: String,
            required: true,
            minLength: 6
        },
        role: {
            type: String,
            enum: ["admin"],
            default: "USER"
        },
        orders: {

            type: [Schema.Types.ObjectId],
            ref : "Order",
            default : undefined,
        },
        refreshToken: {
            type: String,
            default: undefined
        },
        resetPasswordToken: {
            type: String,
            default: undefined
        },
        resetPasswordExpires: {
            type: String,
            default: undefined
        },
        tokenVersion: {
            type: Number,
            default: 0
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true
    }
)

export default model("User", userSchema)