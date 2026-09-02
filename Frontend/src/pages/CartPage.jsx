import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "../styles/CartPage.css";

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, toggleWishlist } = useShop();
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [promoApplied, setPromoApplied] = useState(false);
    const [tip, setTip] = useState(50); // Default gratitude tip
    const [customTip, setCustomTip] = useState("");
    const navigate = useNavigate();

    const handleApplyPromo = (e) => {
        e.preventDefault();
        if (promoCode.trim().toUpperCase() === "NIKE10") {
            setDiscount(cartTotal * 0.1);
            setPromoApplied(true);
        } else {
            alert("Invalid code. Use 'NIKE10' for 10% off!");
        }
    };

    const handleCustomTipChange = (e) => {
        const val = Number(e.target.value);
        setCustomTip(e.target.value);
        setTip(val >= 0 ? val : 0);
    };

    const deliveryFee = cartTotal > 14000 || cartItems.length === 0 ? 0 : 750;
    const taxableAmount = Math.max(0, cartTotal - discount);
    const taxAmount = taxableAmount * 0.05; // 5% Tax
    const grandTotal = Math.round(taxableAmount + taxAmount + deliveryFee + Number(tip));

    const handleProceedToCheckout = () => {
        // Pass financial ledger state into checkout
        navigate("/checkout", {
            state: {
                cartItems,
                subtotal: cartTotal,
                discount,
                taxAmount,
                tip: Number(tip),
                deliveryFee,
                grandTotal
            }
        });
    };

    return (
        <main className="CartPageWrapper">
            <div className="CartHeaderRow">
                <div>
                    <span className="SectionCategoryTag">YOUR ORDER</span>
                    <h1 className="CartHeading">Shopping Bag ({cartItems.length} items)</h1>
                </div>
                <Link to="/new" className="ContinueShoppingLink">
                    <i className="bx bx-arrow-back"></i> Continue Shopping
                </Link>
            </div>

            {cartItems.length === 0 ? (
                <div className="EmptyCartState">
                    <div className="EmptyIconCircle">
                        <i className="bx bx-shopping-bag"></i>
                    </div>
                    <h2>Your Bag is Empty</h2>
                    <p>There are no items in your shopping bag. Explore our latest drops and find your next pair.</p>
                    <button className="ExploreDropsBtn" onClick={() => navigate("/new")}>
                        <span>Explore Drops</span>
                        <i className="bx bx-right-arrow-alt"></i>
                    </button>
                </div>
            ) : (
                <div className="CartGridContainer">
                    {/* LEFT: ITEMS LIST */}
                    <div className="CartItemsList">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.selectedSize}`} className="CartItemCard">
                                <div
                                    className="CartItemThumb"
                                    onClick={() => navigate(`/product/${item.id}`)}
                                >
                                    <img src={item.images?.[0] || item.image} alt={item.title} />
                                </div>

                                <div className="CartItemDetails">
                                    <div className="ItemHeader">
                                        <span className="ItemCategory">{item.categoryLabel || "Men's Footwear"}</span>
                                        <h3
                                            className="ItemTitle"
                                            onClick={() => navigate(`/product/${item.id}`)}
                                        >
                                            {item.title}
                                        </h3>
                                    </div>

                                    <div className="ItemSpecs">
                                        <span className="SpecTag">Size: <strong>UK {item.selectedSize}</strong></span>
                                        <span className="SpecTag">Colorway: <strong>Original Edition</strong></span>
                                    </div>

                                    <div className="ItemControlsRow">
                                        <div className="ItemQtyStepper">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.selectedSize, item.quantity - 1)
                                                }
                                            >
                                                <i className="bx bx-minus"></i>
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.selectedSize, item.quantity + 1)
                                                }
                                            >
                                                <i className="bx bx-plus"></i>
                                            </button>
                                        </div>

                                        <div className="ItemActionIcons">
                                            <button
                                                className="ActionLinkBtn"
                                                title="Move to Wishlist"
                                                onClick={() => {
                                                    toggleWishlist(item);
                                                    removeFromCart(item.id, item.selectedSize);
                                                }}
                                            >
                                                <i className="bx bx-heart"></i>
                                                <span>Save for later</span>
                                            </button>

                                            <button
                                                className="ActionLinkBtn DeleteBtn"
                                                title="Remove"
                                                onClick={() => removeFromCart(item.id, item.selectedSize)}
                                            >
                                                <i className="bx bx-trash"></i>
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="CartItemPrice">
                                    <strong>₹{(item.price * item.quantity).toLocaleString("en-IN")}</strong>
                                    {item.quantity > 1 && (
                                        <small>₹{item.price.toLocaleString("en-IN")} each</small>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: TIP BOX & ORDER SUMMARY */}
                    <div className="CartSummarySidebar">

                        {/* 🌟 DELIVERY GRATITUDE TIP BOX (PLACED ABOVE SUMMARY) */}
                        <div className="GratitudeTipCard">
                            <div className="TipHeaderRow">
                                <div className="TipTitleBlock">
                                    <i className="bx bx-cycling TipRiderIcon"></i>
                                    <div>
                                        <h4>Delivery Partner Tip</h4>
                                        <p>Show appreciation for quick dispatch</p>
                                    </div>
                                </div>
                                {tip > 0 && <span className="ActiveTipPill">₹{tip} added</span>}
                            </div>

                            <div className="TipPresetsGrid">
                                {[30, 50, 100, 150].map((amount) => (
                                    <button
                                        key={amount}
                                        type="button"
                                        className={`TipPresetBtn ${tip === amount && customTip === "" ? "selected" : ""}`}
                                        onClick={() => {
                                            setTip(amount);
                                            setCustomTip("");
                                        }}
                                    >
                                        ₹{amount}
                                    </button>
                                ))}
                            </div>

                            <div className="CustomTipSlot">
                                <input
                                    type="number"
                                    placeholder="Custom tip amount (₹)"
                                    value={customTip}
                                    onChange={handleCustomTipChange}
                                    min="0"
                                />
                                {tip > 0 && (
                                    <button
                                        type="button"
                                        className="ClearTipBtn"
                                        onClick={() => {
                                            setTip(0);
                                            setCustomTip("");
                                        }}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* ORDER SUMMARY CARD */}
                        <div className="SummaryCard">
                            <h2 className="SummaryTitle">Order Summary</h2>

                            <div className="SummaryRow">
                                <span>Bag Subtotal</span>
                                <strong>₹{cartTotal.toLocaleString("en-IN")}</strong>
                            </div>

                            {promoApplied && (
                                <div className="SummaryRow DiscountRow">
                                    <span>Promo Code (NIKE10)</span>
                                    <strong>-₹{discount.toLocaleString("en-IN")}</strong>
                                </div>
                            )}

                            <div className="SummaryRow">
                                <span>Standard Delivery</span>
                                <strong>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</strong>
                            </div>

                            <div className="SummaryRow">
                                <span>Gratitude Tip</span>
                                <strong>{tip > 0 ? `₹${tip}` : "₹0"}</strong>
                            </div>

                            {/* 🌟 5% TAX LEDGER */}
                            <div className="SummaryRow">
                                <span>GST / Taxes (5%)</span>
                                <strong>₹{taxAmount.toLocaleString("en-IN")}</strong>
                            </div>

                            <div className="SummaryDivider"></div>

                            <div className="SummaryRow TotalRow">
                                <span>Grand Total</span>
                                <span className="TotalFigure">₹{grandTotal.toLocaleString("en-IN")}</span>
                            </div>

                            {/* Promo Form */}
                            <form className="PromoInputGroup" onSubmit={handleApplyPromo}>
                                <input
                                    type="text"
                                    placeholder="Promo code (NIKE10)"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <button type="submit">Apply</button>
                            </form>

                            <button className="CheckoutButton" onClick={handleProceedToCheckout}>
                                <span>Proceed to Checkout</span>
                                <i className="bx bx-right-arrow-alt"></i>
                            </button>

                            <div className="SecurityAssurances">
                                <div className="AssuranceItem">
                                    <i className="bx bx-check-shield"></i>
                                    <span>256-Bit Encrypted Secure Payment</span>
                                </div>
                                <div className="AssuranceItem">
                                    <i className="bx bx-package"></i>
                                    <span>Official Verified Nike Dispatch</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </main>
    );
};

export default CartPage;