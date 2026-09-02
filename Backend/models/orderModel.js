import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderId: {
            type: String,
            required: true,
            unique: true,
        },
        items: [
            {
                id: String,
                name: String,
                price: Number,
                selectedSize: Number,
                quantity: Number,
                image: String,
                status: {
                    type: String,
                    default: "Confirmed",
                    enum: ["Confirmed", "Shipped", "Delivered", "Cancelled"],
                },
            },
        ],
        shippingInfo: {
            fullName: String,
            email: String,
            phone: String,
            address: String,
            city: String,
            postalCode: String,
        },
        financials: {
            subtotal: Number,
            shipping: Number,
            tax: Number,
            total: Number,
        },
        totalDays: {
            type: Number,
            default: 5,
        },
        estimatedDeliveryTime: {
            type: Number,
            required: true,
        },
        paymentDetails: {
            razorpayOrderId: String,
            razorpayPaymentId: String,
            razorpaySignature: String,
            status: {
                type: String,
                default: "Paid",
            },
        },
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;