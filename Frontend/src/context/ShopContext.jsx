import React, { createContext, useContext, useState, useEffect } from "react";
import { allProductsData } from "../assets/assets";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    // --- Cart State ---
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("nike_cart");
        return saved ? JSON.parse(saved) : [];
    });

    // --- Wishlist State ---
    const [wishlistItems, setWishlistItems] = useState(() => {
        const saved = localStorage.getItem("nike_wishlist");
        return saved ? JSON.parse(saved) : [allProductsData[0], allProductsData[1]];
    });

    // --- User Profile State ---
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem("nike_user_profile");
        return saved
            ? JSON.parse(saved)
            : { fullName: "", email: "", phone: "", address: "", city: "", postalCode: "" };
    });

    // --- JWT Auth Token State ---
    const [authToken, setAuthToken] = useState(() => {
        return localStorage.getItem("nike_auth_token") || "";
    });

    // --- Order History State ---
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem("nike_orders");
        return saved ? JSON.parse(saved) : [];
    });

    // --- LocalStorage Sync Effects ---
    useEffect(() => {
        localStorage.setItem("nike_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("nike_wishlist", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    useEffect(() => {
        localStorage.setItem("nike_user_profile", JSON.stringify(userProfile));
    }, [userProfile]);

    useEffect(() => {
        localStorage.setItem("nike_orders", JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        if (authToken) {
            localStorage.setItem("nike_auth_token", authToken);
        } else {
            localStorage.removeItem("nike_auth_token");
        }
    }, [authToken]);

    // --- Authentication Handlers ---
    const loginAuthUser = (userData, token) => {
        const formattedProfile = {
            fullName: userData.name || userData.fullName || "",
            email: userData.email || "",
            phone: userData.phone || "",
            address: userData.address || "",
            city: userData.city || "",
            postalCode: userData.postalCode || "",
        };
        setUserProfile(formattedProfile);
        setAuthToken(token);
        localStorage.setItem("nike_user_profile", JSON.stringify(formattedProfile));
        localStorage.setItem("nike_auth_token", token);
    };

    const logoutAuthUser = () => {
        setUserProfile({
            fullName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            postalCode: "",
        });
        setAuthToken("");
        localStorage.removeItem("nike_user_profile");
        localStorage.removeItem("nike_auth_token");
    };

    const saveProfile = (details) => setUserProfile(details);

    // --- Cart Handlers ---
    const addToCart = (product, size = 8, qty = 1) => {
        setCartItems((prev) => {
            const existing = prev.find(
                (item) => item.id === product.id && item.selectedSize === size
            );
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id && item.selectedSize === size
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            return [...prev, { ...product, quantity: qty, selectedSize: size }];
        });
    };

    const updateQuantity = (id, size, newQty) => {
        if (newQty < 1) {
            removeFromCart(id, size);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.selectedSize === size
                    ? { ...item, quantity: newQty }
                    : item
            )
        );
    };

    const removeFromCart = (id, size) => {
        setCartItems((prev) =>
            prev.filter((item) => !(item.id === id && item.selectedSize === size))
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("nike_cart");
    };

    // --- Wishlist Handlers ---
    const toggleWishlist = (product) => {
        setWishlistItems((prev) => {
            const exists = prev.some((item) => item.id === product.id);
            return exists
                ? prev.filter((item) => item.id !== product.id)
                : [...prev, product];
        });
    };

    const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

    // --- Order History & Real-Time Math Tracking Handlers ---
    const placeOrder = (orderData) => {
        const now = Date.now();
        // Random days delivery window between 4 and 7 days
        const randomDays = Math.floor(Math.random() * 4) + 4;
        const estimatedDeliveryTime = now + randomDays * 24 * 60 * 60 * 1000;

        const newOrder = {
            orderId: "NK-" + Math.floor(100000 + Math.random() * 900000),
            createdAt: now,
            totalDays: randomDays,
            estimatedDeliveryTime,
            shippingInfo: orderData.shippingInfo,
            financials: orderData.financials,
            items: orderData.cartItems.map((item) => ({
                ...item,
                status: "Confirmed", // "Confirmed" | "Shipped" | "Delivered" | "Cancelled"
            })),
        };

        setOrders((prev) => [newOrder, ...prev]);
        return newOrder;
    };

    const cancelOrderItem = (orderId, itemId, itemSize) => {
        setOrders((prev) =>
            prev.map((ord) => {
                if (ord.orderId !== orderId) return ord;
                return {
                    ...ord,
                    items: ord.items.map((item) => {
                        if (item.id === itemId && item.selectedSize === itemSize) {
                            return { ...item, status: "Cancelled" };
                        }
                        return item;
                    }),
                };
            })
        );
    };

    // --- Aggregated Financials ---
    const cartTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <ShopContext.Provider
            value={{
                // Cart
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                cartTotal,
                cartCount,
                // Wishlist
                wishlistItems,
                toggleWishlist,
                isInWishlist,
                // Authentication & Profile
                authToken,
                userProfile,
                loginAuthUser,
                logoutAuthUser,
                saveProfile,
                // Orders
                orders,
                placeOrder,
                cancelOrderItem,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);