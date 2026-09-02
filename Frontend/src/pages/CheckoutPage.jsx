import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "../styles/CheckoutPage.css";
import { nikeGeneral } from "../assets/assets";

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, clearCart, userProfile, placeOrder } = useShop();

    // Active checkout ledger state
    const [activeCheckoutData, setActiveCheckoutData] = useState(
        location.state || {
            cartItems: cartItems.length > 0 ? cartItems : [],
            subtotal: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
            discount: 0,
            taxAmount: 0,
            tip: 0,
            deliveryFee: 0,
            grandTotal: 0,
        }
    );

    // Snapshot state dedicated to the thermal receipt
    const [receiptSnapshot, setReceiptSnapshot] = useState(null);

    // Form inputs state (defaults to saved profile if available, else empty)
    const [shippingInfo, setShippingInfo] = useState({
        fullName: userProfile?.fullName || "",
        email: userProfile?.email || "",
        phone: userProfile?.phone || "",
        address: userProfile?.address || "",
        city: userProfile?.city || "",
        postalCode: userProfile?.postalCode || "",
        paymentMethod: "Card",
    });

    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptTorn, setReceiptTorn] = useState(false);

    const handleInputChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handleProcessPayment = (e) => {
        e.preventDefault();

        // 1. Snapshot order details for the thermal receipt
        const snapshot = {
            ...activeCheckoutData,
            clientName: shippingInfo.fullName || "GUEST",
        };
        setReceiptSnapshot(snapshot);

        // 2. Persist order into global order history (with random 4-7 days dynamic tracking)
        if (placeOrder) {
            placeOrder({
                cartItems: activeCheckoutData.cartItems,
                shippingInfo,
                financials: activeCheckoutData,
            });
        }

        // 3. Clear global cart & storage
        clearCart();

        // 4. Reset checkout form inputs
        setShippingInfo({
            fullName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            postalCode: "",
            paymentMethod: "Card",
        });

        // 5. Reset checkout summary ledger
        setActiveCheckoutData({
            cartItems: [],
            subtotal: 0,
            discount: 0,
            taxAmount: 0,
            tip: 0,
            deliveryFee: 0,
            grandTotal: 0,
        });

        // 6. Open thermal receipt modal
        setShowReceipt(true);
    };

    const handleTearReceipt = () => {
        setReceiptTorn(true);
    };

    const handleCopyReceipt = () => {
        if (!receiptSnapshot) return;
        const text = `NIKE DIGITAL OFFICIAL RECEIPT\nClient: ${receiptSnapshot.clientName}\nTotal: ₹${receiptSnapshot.grandTotal.toLocaleString("en-IN")}\nTXN-7451188122-BM`;
        navigator.clipboard.writeText(text);
        alert("Receipt details copied to clipboard!");
    };

    const currentDate = new Date()
        .toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        .toUpperCase();

    return (
        <main className="CheckoutPageWrapper">
            <div className="CheckoutContainer">
                {/* LEFT: SHIPPING & BILLING FORM */}
                <div className="CheckoutFormColumn">
                    <div className="CheckoutCard">
                        <div className="StepHeader">
                            <span className="StepNumber">1</span>
                            <h3>Delivery Destination</h3>
                        </div>

                        <form id="checkout-form" onSubmit={handleProcessPayment}>
                            <div className="FormGrid">
                                <div className="FormGroupSpan2">
                                    <label>Full Legal Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        value={shippingInfo.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label>Email Contact</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="name@example.com"
                                        value={shippingInfo.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label>Phone Line</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="+91 98765 43210"
                                        value={shippingInfo.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="FormGroupSpan2">
                                    <label>Street Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="House/Apartment, Street name, Landmark"
                                        value={shippingInfo.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="Enter City"
                                        value={shippingInfo.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label>Postal / PIN Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        placeholder="e.g. 560001"
                                        value={shippingInfo.postalCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="CheckoutCard">
                        <div className="StepHeader">
                            <span className="StepNumber">2</span>
                            <h3>Payment Method</h3>
                        </div>

                        <div className="PaymentMethodsGrid">
                            {["Card", "UPI / QR", "Apple Pay", "NetBanking"].map((method) => (
                                <button
                                    type="button"
                                    key={method}
                                    className={`PaymentMethodPill ${shippingInfo.paymentMethod === method ? "selected" : ""
                                        }`}
                                    onClick={() =>
                                        setShippingInfo({ ...shippingInfo, paymentMethod: method })
                                    }
                                >
                                    <i
                                        className={`bx ${method === "Card"
                                                ? "bx-credit-card"
                                                : method === "UPI / QR"
                                                    ? "bx-qr-scan"
                                                    : "bx-wallet"
                                            }`}
                                    ></i>
                                    <span>{method}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: ORDER SUMMARY */}
                <div className="CheckoutSummaryColumn">
                    <div className="CheckoutSummaryCard">
                        <h3>Review Order ({activeCheckoutData.cartItems.length})</h3>

                        <div className="OrderMiniItemsList">
                            {activeCheckoutData.cartItems.length === 0 ? (
                                <p style={{ color: "var(--text-muted)", fontSize: "13.5px", margin: "1rem 0" }}>
                                    No items in queue.
                                </p>
                            ) : (
                                activeCheckoutData.cartItems.map((item) => (
                                    <div
                                        key={`${item.id}-${item.selectedSize}`}
                                        className="MiniItemRow"
                                    >
                                        <img
                                            src={item.images?.[0] || item.image}
                                            alt={item.title}
                                        />
                                        <div className="MiniItemMeta">
                                            <strong>{item.title}</strong>
                                            <small>
                                                Qty: {item.quantity} | UK {item.selectedSize}
                                            </small>
                                        </div>
                                        <span>
                                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="SummaryDivider"></div>

                        <div className="LedgerBreakdown">
                            <div className="BreakdownRow">
                                <span>Subtotal</span>
                                <span>₹{activeCheckoutData.subtotal.toLocaleString("en-IN")}</span>
                            </div>
                            {activeCheckoutData.discount > 0 && (
                                <div className="BreakdownRow DiscountText">
                                    <span>Discount (Promo)</span>
                                    <span>
                                        -₹{activeCheckoutData.discount.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            )}
                            <div className="BreakdownRow">
                                <span>Gratuity (Tip)</span>
                                <span>+₹{activeCheckoutData.tip}</span>
                            </div>
                            <div className="BreakdownRow">
                                <span>Tax (5% GST)</span>
                                <span>
                                    ₹{Math.round(activeCheckoutData.taxAmount).toLocaleString("en-IN")}
                                </span>
                            </div>
                            <div className="BreakdownRow">
                                <span>Delivery</span>
                                <span>
                                    {activeCheckoutData.deliveryFee === 0
                                        ? "FREE"
                                        : `₹${activeCheckoutData.deliveryFee}`}
                                </span>
                            </div>

                            <div className="SummaryDivider"></div>

                            <div className="GrandTotalRow">
                                <span>GRAND TOTAL</span>
                                <span className="FinalAmount">
                                    ₹{activeCheckoutData.grandTotal.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            className="PayNowButton"
                            disabled={activeCheckoutData.grandTotal === 0 && !showReceipt}
                        >
                            <span>
                                Authorize & Pay ₹
                                {activeCheckoutData.grandTotal.toLocaleString("en-IN")}
                            </span>
                            <i className="bx bx-check-shield"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* POS DISPENSER PRINTER THERMAL RECEIPT MODAL */}
            {showReceipt && receiptSnapshot && (
                <div className="ReceiptOverlayBackdrop">
                    <div className="POSReceiptStage">
                        <div className="POSPrinterDispenserCap">
                            <div className="PrinterSlit"></div>
                        </div>

                        <div className={`POSThermalReceiptPaper ${receiptTorn ? "torn-effect" : ""}`}>
                            <div className="ReceiptHeaderSection">
                                <div className="ReceiptBrandText">
                                    <h2>NIKE SPORTSWEAR</h2>
                                    <p>DIGITAL OFFICIAL RECEIPT</p>
                                </div>
                                <div className="ReceiptBrandLogo">
                                    <img src={nikeGeneral.WebLogo} alt="Nike Logo" />
                                </div>
                            </div>

                            <div className="ReceiptClientAndStamp">
                                <div className="ClientMeta">
                                    <span className="ClientTag">
                                        CLIENT: {receiptSnapshot.clientName.toUpperCase()}
                                    </span>
                                    <div className="CardNumberMask">Visa-•••• 8842</div>
                                </div>

                                <div className="PaidStampBadge">
                                    <span className="StampTitle">PAID</span>
                                    <span className="StampDate">{currentDate}</span>
                                </div>
                            </div>

                            <div className="ReceiptHeroPrice">
                                <h1>₹{receiptSnapshot.grandTotal.toLocaleString("en-IN")}</h1>
                                <p>{currentDate} | INVOICE PAID</p>
                            </div>

                            <div className="ReceiptDottedLine"></div>

                            <div className="ReceiptItemsBlock">
                                {receiptSnapshot.cartItems.map((item) => (
                                    <div
                                        key={`${item.id}-${item.selectedSize}`}
                                        className="ReceiptItemRow"
                                    >
                                        <span className="ItemQtyAndTitle">
                                            {item.quantity}X {item.title} (UK {item.selectedSize})
                                        </span>
                                        <span className="ItemPriceFigures">
                                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="ReceiptDottedLine"></div>

                            <div className="ReceiptFinancialLedger">
                                <div className="FinRow">
                                    <span>Subtotal</span>
                                    <span>₹{receiptSnapshot.subtotal.toLocaleString("en-IN")}</span>
                                </div>
                                {receiptSnapshot.discount > 0 && (
                                    <div className="FinRow">
                                        <span>Discount (Promo)</span>
                                        <span>
                                            -₹{receiptSnapshot.discount.toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                )}
                                <div className="FinRow">
                                    <span>Gratuity (Tip)</span>
                                    <span>+₹{receiptSnapshot.tip}</span>
                                </div>
                                <div className="FinRow">
                                    <span>Tax (5%)</span>
                                    <span>
                                        ₹{Math.round(receiptSnapshot.taxAmount).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>

                            <div className="ReceiptSolidLine"></div>

                            <div className="ReceiptGrandTotalRow">
                                <span>GRAND TOTAL</span>
                                <strong>
                                    ₹{receiptSnapshot.grandTotal.toLocaleString("en-IN")}
                                </strong>
                            </div>

                            <p className="ReceiptAppreciationText">
                                THANK YOU FOR PARTNERING WITH NIKE ATHLETICS!
                            </p>

                            <div className="ReceiptBarcodeContainer">
                                <div className="BarcodeLines">
                                    <span></span><span></span><span></span><span></span>
                                    <span></span><span></span><span></span><span></span>
                                    <span></span><span></span><span></span><span></span>
                                    <span></span><span></span><span></span><span></span>
                                    <span></span><span></span><span></span><span></span>
                                    <span></span><span></span><span></span><span></span>
                                </div>
                                <span className="BarcodeCodeNumber">TXN-7451188122-BM</span>
                            </div>
                        </div>

                        <div className="ReceiptBottomControls">
                            <h2>Payment Successful</h2>
                            <p>You're all set—now let the receipt roll!</p>

                            <div className="ReceiptActionDeck">
                                <button
                                    type="button"
                                    className="PosActionBtn"
                                    onClick={() => window.print()}
                                >
                                    <i className="bx bx-printer"></i>
                                    <span>Re-print receipt</span>
                                </button>

                                <button
                                    type="button"
                                    className="PosActionBtn"
                                    onClick={handleTearReceipt}
                                >
                                    <i className="bx bx-receipt"></i>
                                    <span>Tear receipt</span>
                                </button>

                                <button
                                    type="button"
                                    className="PosActionBtn"
                                    onClick={handleCopyReceipt}
                                >
                                    <i className="bx bx-copy"></i>
                                    <span>Copy</span>
                                </button>
                            </div>

                            <button
                                type="button"
                                className="DoneShoppingBtn"
                                onClick={() => {
                                    setShowReceipt(false);
                                    navigate("/");
                                }}
                            >
                                Return to Store Home
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default CheckoutPage;