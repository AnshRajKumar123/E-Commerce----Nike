import React, { createContext, useContext, useState, useEffect } from "react";
import { allProductsData } from "../assets/assets";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [userProfile, setUserProfile] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
    });

    const [authToken, setAuthToken] = useState(() => {
        return localStorage.getItem("nike_auth_token") || "";
    });

    // 1. On Mount or Login: Fetch user profile, cart, wishlist, and orders from MongoDB
    useEffect(() => {
        const loadUserData = async () => {
            if (!authToken) return;

            try {
                // Fetch Profile & initial Cart/Wishlist
                const profileRes = await fetch("/api/users/profile", {
                    headers: { Authorization: `Bearer ${authToken}` },
                });

                if (profileRes.ok) {
                    const pData = await profileRes.json();
                    if (pData.user) {
                        setUserProfile({
                            fullName: pData.user.name || "",
                            email: pData.user.email || "",
                            phone: pData.user.phone || "",
                            address: pData.user.address || "",
                            city: pData.user.city || "",
                            postalCode: pData.user.postalCode || "",
                        });
                        setCartItems(pData.user.cart || []);
                        setWishlistItems(
                            pData.user.wishlist?.length > 0
                                ? pData.user.wishlist
                                : [allProductsData[0], allProductsData[1]]
                        );
                    }
                }

                // Fetch Orders from DB
                const ordersRes = await fetch("/api/orders/my-orders", {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                if (ordersRes.ok) {
                    const oData = await ordersRes.json();
                    setOrders(oData.orders || []);
                }
            } catch (err) {
                console.error("Failed to load user data from database:", err);
            }
        };

        loadUserData();
    }, [authToken]);

    // 2. Debounced sync of Cart and Wishlist to MongoDB whenever they change
    useEffect(() => {
        if (!authToken) return;

        const timer = setTimeout(async () => {
            try {
                await fetch("/api/users/sync-state", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({ cart: cartItems, wishlist: wishlistItems }),
                });
            } catch (err) {
                console.error("Cart/Wishlist sync error:", err);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [cartItems, wishlistItems, authToken]);

    const loginAuthUser = (userData, token) => {
        setUserProfile({
            fullName: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            address: userData.address || "",
            city: userData.city || "",
            postalCode: userData.postalCode || "",
        });
        setAuthToken(token);
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
        setCartItems([]);
        setWishlistItems([]);
        setOrders([]);
        localStorage.removeItem("nike_auth_token");
    };

    const saveProfile = async (details) => {
        setUserProfile(details);
        if (!authToken) return;

        const response = await fetch("/api/users/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                name: details.fullName,
                phone: details.phone,
                address: details.address,
                city: details.city,
                postalCode: details.postalCode,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update profile");
        }
    };

    // Cart operations
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

    const clearCart = () => setCartItems([]);

    // Wishlist operations
    const toggleWishlist = (product) => {
        setWishlistItems((prev) => {
            const exists = prev.some((item) => item.id === product.id);
            return exists
                ? prev.filter((item) => item.id !== product.id)
                : [...prev, product];
        });
    };

    const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

    // Cancel item in MongoDB order
    const cancelOrderItem = async (orderId, itemId, itemSize) => {
        try {
            const res = await fetch("/api/orders/cancel-item", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ orderId, itemId, itemSize }),
            });

            if (res.ok) {
                setOrders((prev) =>
                    prev.map((ord) => {
                        if (ord.orderId !== orderId) return ord;
                        return {
                            ...ord,
                            items: ord.items.map((item) =>
                                item.id === itemId && item.selectedSize === itemSize
                                    ? { ...item, status: "Cancelled" }
                                    : item
                            ),
                        };
                    })
                );
            }
        } catch (err) {
            console.error("Failed to cancel order item:", err);
        }
    };

    const appendNewOrder = (order) => {
        setOrders((prev) => [order, ...prev]);
    };

    const cartTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <ShopContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                cartTotal,
                cartCount,
                wishlistItems,
                toggleWishlist,
                isInWishlist,
                authToken,
                userProfile,
                loginAuthUser,
                logoutAuthUser,
                saveProfile,
                orders,
                appendNewOrder,
                cancelOrderItem,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);