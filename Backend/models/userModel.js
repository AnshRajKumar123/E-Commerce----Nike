import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },

        phone: { type: String, default: "" },

        address: { type: String, default: "" },

        city: { type: String, default: "" },

        postalCode: { type: String, default: "" },
        
        cart: {
            type: Array,
            default: [],
        },
        wishlist: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;