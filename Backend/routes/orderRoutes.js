import express from "express";
import {
    createRazorpayOrder,
    verifyAndSaveOrder,
    getMyOrders,
    cancelItemInOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/razorpay-init", protect, createRazorpayOrder);
router.post("/verify-and-save", protect, verifyAndSaveOrder);
router.get("/my-orders", protect, getMyOrders);
router.put("/cancel-item", protect, cancelItemInOrder);

export default router;