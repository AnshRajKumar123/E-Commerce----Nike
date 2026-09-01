import React, { createContext, useContext, useState, useEffect } from "react";
import { allProductsData } from "../assets/assets";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    // Pre-fill with a couple of items so your UI renders active items immediately
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("nike_cart");
        return saved
            ? JSON.parse(saved)
            : [
                { ...allProductsData[0], quantity: 1, selectedSize: 8 },
                { ...allProductsData[1], quantity: 2, selectedSize: 9 }
            ];
    });

    const [wishlistItems, setWishlistItems] = useState(() => {
        const saved = localStorage.getItem("nike_wishlist");
        return saved
            ? JSON.parse(saved)
            : [allProductsData[2], allProductsData[3]];
    });

    useEffect(() => {
        localStorage.setItem("nike_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("nike_wishlist", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // Cart Handlers
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

    // Wishlist Handlers
    const toggleWishlist = (product) => {
        setWishlistItems((prev) => {
            const exists = prev.some((item) => item.id === product.id);
            if (exists) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

    const cartTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <ShopContext.Provider
            value={{
                cartItems,
                wishlistItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                toggleWishlist,
                isInWishlist,
                cartTotal,
                cartCount
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);