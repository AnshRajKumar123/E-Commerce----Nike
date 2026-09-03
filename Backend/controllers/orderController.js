import dotenv from "dotenv";
dotenv.config();

import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/orderModel.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/orders/razorpay-init
export const createRazorpayOrder = async (req, res) => {
    const { amount } = req.body; // Amount in INR

    try {
        const options = {
            amount: Math.round(Number(amount) * 100), // convert to paise
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);
        res.status(200).json({
            success: true,
            order: razorpayOrder,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Verify Payment Signature & Save Order in DB
// @route   POST /api/orders/verify-and-save
export const verifyAndSaveOrder = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderData,
    } = req.body;

    try {
        // Cryptographic signature check
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        const now = Date.now();
        const randomDays = Math.floor(Math.random() * 4) + 4;
        const estimatedDeliveryTime = now + randomDays * 24 * 60 * 60 * 1000;

        const newOrder = await Order.create({
            user: req.user._id,
            orderId: "NK-" + Math.floor(100000 + Math.random() * 900000),
            items: orderData.cartItems.map((item) => ({
                ...item,
                status: "Confirmed",
            })),
            shippingInfo: orderData.shippingInfo,
            financials: orderData.financials,
            totalDays: randomDays,
            estimatedDeliveryTime,
            paymentDetails: {
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                status: "Paid",
            },
        });

        res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Authenticated User's Orders
// @route   GET /api/orders/my-orders
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Cancel Specific Item in an Order
// @route   PUT /api/orders/cancel-item
export const cancelItemInOrder = async (req, res) => {
    const { orderId, itemId, itemSize } = req.body;
    try {
        const order = await Order.findOne({ orderId, user: req.user._id });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.items = order.items.map((item) => {
            if (item.id === itemId && item.selectedSize === itemSize) {
                return { ...item, status: "Cancelled" };
            }
            return item;
        });

        await order.save();
        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};