import React, { createContext, useContext, useState, useEffect } from "react";
import { allProductsData } from "../assets/assets";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("nike_cart");
        return saved ? JSON.parse(saved) : [];
    });

    const [wishlistItems, setWishlistItems] = useState(() => {
        const saved = localStorage.getItem("nike_wishlist");
        return saved ? JSON.parse(saved) : [allProductsData[0], allProductsData[1]];
    });

    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem("nike_user_profile");
        return saved
            ? JSON.parse(saved)
            : { fullName: "", email: "", phone: "", address: "", city: "", postalCode: "" };
    });

    // Orders History State
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem("nike_orders");
        return saved ? JSON.parse(saved) : [];
    });

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

    const saveProfile = (details) => setUserProfile(details);

    const addToCart = (product, size = 8, qty = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
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
                item.id === id && item.selectedSize === size ? { ...item, quantity: newQty } : item
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

    const toggleWishlist = (product) => {
        setWishlistItems((prev) => {
            const exists = prev.some((item) => item.id === product.id);
            return exists ? prev.filter((item) => item.id !== product.id) : [...prev, product];
        });
    };

    const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

    // 🌟 Order Creation with Random 4-7 Days Delivery Math
    const placeOrder = (orderData) => {
        const now = Date.now();
        // Random days between 4 and 7
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

    // 🌟 Cancel Individual Product Inside an Order
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

    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <ShopContext.Provider
            value={{
                cartItems,
                wishlistItems,
                userProfile,
                orders,
                saveProfile,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                toggleWishlist,
                isInWishlist,
                placeOrder,
                cancelOrderItem,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);