import React, { createContext, useContext, useState, useEffect } from "react";
import { allProductsData } from "../assets/assets";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
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

    // User Profile State (empty default)
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem("nike_user_profile");
        return saved
            ? JSON.parse(saved)
            : {
                fullName: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                postalCode: ""
            };
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

    const saveProfile = (details) => {
        setUserProfile(details);
    };

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
                userProfile,
                saveProfile,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
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