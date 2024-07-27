/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },

        totalPrice: {
            type: Number,
            required: true,
        },
        clientSecret: {
            type: String,
            required: true,
        },
        paymentIntent: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        products: [{
            productId: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true
            }
        }],

    },
    {
        timestamps: true,
    }
);

export const Order = model<TOrder>("Order", orderSchema);
