import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { nikeGeneral } from "../assets/assets";
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        cartItems,
        clearCart,
        userProfile,
        authToken,
        appendNewOrder,
    } = useShop();

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

    // Keep active checkout updated if user didn't pass state via navigate
    useEffect(() => {
        if (!location.state && cartItems.length > 0) {
            const sub = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const tax = Math.round(sub * 0.05);
            const delivery = sub > 1500 ? 0 : 150;
            setActiveCheckoutData({
                cartItems,
                subtotal: sub,
                discount: 0,
                taxAmount: tax,
                tip: 0,
                deliveryFee: delivery,
                grandTotal: sub + tax + delivery,
            });
        }
    }, [cartItems, location.state]);

    // Snapshot state dedicated to the thermal receipt
    const [receiptSnapshot, setReceiptSnapshot] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Form inputs state (pre-filled from MongoDB userProfile)
    const [shippingInfo, setShippingInfo] = useState({
        fullName: userProfile?.fullName || "",
        email: userProfile?.email || "",
        phone: userProfile?.phone || "",
        address: userProfile?.address || "",
        city: userProfile?.city || "",
        postalCode: userProfile?.postalCode || "",
        paymentMethod: "Card",
    });

    // Auto-sync whenever userProfile loads from MongoDB
    useEffect(() => {
        if (userProfile) {
            setShippingInfo((prev) => ({
                ...prev,
                fullName: userProfile.fullName || prev.fullName,
                email: userProfile.email || prev.email,
                phone: userProfile.phone || prev.phone,
                address: userProfile.address || prev.address,
                city: userProfile.city || prev.city,
                postalCode: userProfile.postalCode || prev.postalCode,
            }));
        }
    }, [userProfile]);

    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptTorn, setReceiptTorn] = useState(false);

    const handleInputChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    // 🌟 Razorpay Gateway Flow & MongoDB Order Persistence
    const handleProcessPayment = async (e) => {
        e.preventDefault();

        if (activeCheckoutData.cartItems.length === 0) {
            alert("Your shopping bag is empty!");
            return;
        }

        if (!window.Razorpay) {
            alert("Razorpay SDK failed to load. Please check your internet connection.");
            return;
        }

        setIsProcessing(true);

        const orderPayload = {
            cartItems: activeCheckoutData.cartItems,
            shippingInfo,
            financials: activeCheckoutData,
        };

        try {
            // 1. Create Razorpay order on backend
            const initRes = await fetch("/api/orders/razorpay-init", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ amount: activeCheckoutData.grandTotal }),
            });

            const initData = await initRes.json();
            if (!initRes.ok) {
                throw new Error(initData.message || "Could not initialize payment gateway");
            }

            // 2. Open Razorpay payment gateway
            const options = {
                key: initData.keyId,
                amount: initData.order.amount,
                currency: "INR",
                name: "NIKE SPORTSWEAR",
                description: "Order Checkout Payment",
                image: nikeGeneral?.WebLogo,
                order_id: initData.order.id,
                prefill: {
                    name: shippingInfo.fullName,
                    email: shippingInfo.email,
                    contact: shippingInfo.phone,
                },
                theme: { color: "#0c1e3d" },
                handler: async function (response) {
                    try {
                        // 3. Verify signature and save to MongoDB
                        const verifyRes = await fetch("/api/orders/verify-and-save", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${authToken}`,
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderData: orderPayload,
                            }),
                        });

                        const verifyData = await verifyRes.json();
                        if (!verifyRes.ok) {
                            throw new Error(verifyData.message || "Payment signature verification failed");
                        }

                        // 4. Update UI & App State
                        appendNewOrder(verifyData.order);
                        clearCart();

                        setReceiptSnapshot({
                            ...activeCheckoutData,
                            clientName: shippingInfo.fullName || "ATHLETE",
                            orderId: verifyData.order.orderId,
                            txnId: response.razorpay_payment_id,
                        });

                        setShowReceipt(true);
                    } catch (verifyErr) {
                        alert(verifyErr.message);
                    } finally {
                        setIsProcessing(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (resp) {
                alert(`Payment Failed: ${resp.error.description}`);
                setIsProcessing(false);
            });
            rzp.open();
        } catch (err) {
            alert(err.message || "Checkout transaction encountered an error.");
            setIsProcessing(false);
        }
    };

    const handleTearReceipt = () => {
        setReceiptTorn(true);
    };

    const handleCopyReceipt = () => {
        if (!receiptSnapshot) return;
        const text = `NIKE DIGITAL OFFICIAL RECEIPT\nClient: ${receiptSnapshot.clientName}\nOrder ID: ${receiptSnapshot.orderId}\nPayment ID: ${receiptSnapshot.txnId}\nTotal: ₹${receiptSnapshot.grandTotal.toLocaleString("en-IN")}`;
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
                            <h3>Select Gateway Preference</h3>
                        </div>

                        <div className="PaymentMethodsGrid">
                            {["Razorpay (Cards/UPI/NetBanking)", "Cash On Delivery"].map((method) => (
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
                                        className={`bx ${method.includes("Razorpay")
                                                ? "bx-credit-card-front"
                                                : "bx-money"
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
                                            alt={item.title || item.name}
                                        />
                                        <div className="MiniItemMeta">
                                            <strong>{item.title || item.name}</strong>
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
                            {activeCheckoutData.tip > 0 && (
                                <div className="BreakdownRow">
                                    <span>Gratuity (Tip)</span>
                                    <span>+₹{activeCheckoutData.tip}</span>
                                </div>
                            )}
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
                            disabled={
                                isProcessing ||
                                (activeCheckoutData.grandTotal === 0 && !showReceipt)
                            }
                        >
                            <span>
                                {isProcessing
                                    ? "Connecting Razorpay..."
                                    : `Pay ₹${activeCheckoutData.grandTotal.toLocaleString("en-IN")}`}
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
                                    <img src={nikeGeneral?.WebLogo || "/logo.png"} alt="Nike Logo" />
                                </div>
                            </div>

                            <div className="ReceiptClientAndStamp">
                                <div className="ClientMeta">
                                    <span className="ClientTag">
                                        CLIENT: {receiptSnapshot.clientName.toUpperCase()}
                                    </span>
                                    <div className="CardNumberMask">
                                        ORDER: {receiptSnapshot.orderId || "NK-OFFICIAL"}
                                    </div>
                                </div>

                                <div className="PaidStampBadge">
                                    <span className="StampTitle">PAID</span>
                                    <span className="StampDate">{currentDate}</span>
                                </div>
                            </div>

                            <div className="ReceiptHeroPrice">
                                <h1>₹{receiptSnapshot.grandTotal.toLocaleString("en-IN")}</h1>
                                <p>{currentDate} | INVOICE PAID VIA RAZORPAY</p>
                            </div>

                            <div className="ReceiptDottedLine"></div>

                            <div className="ReceiptItemsBlock">
                                {receiptSnapshot.cartItems.map((item) => (
                                    <div
                                        key={`${item.id}-${item.selectedSize}`}
                                        className="ReceiptItemRow"
                                    >
                                        <span className="ItemQtyAndTitle">
                                            {item.quantity}X {item.title || item.name} (UK {item.selectedSize})
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
                                        <span>Discount</span>
                                        <span>
                                            -₹{receiptSnapshot.discount.toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                )}
                                {receiptSnapshot.tip > 0 && (
                                    <div className="FinRow">
                                        <span>Gratuity (Tip)</span>
                                        <span>+₹{receiptSnapshot.tip}</span>
                                    </div>
                                )}
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
                                THANK YOU FOR SHOPPING WITH NIKE!
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
                                <span className="BarcodeCodeNumber">
                                    {receiptSnapshot.txnId || "TXN-7451188122-BM"}
                                </span>
                            </div>
                        </div>

                        <div className="ReceiptBottomControls">
                            <h2>Payment Successful</h2>
                            <p>Your order has been placed and saved to your account.</p>

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
                                    <span>Copy Info</span>
                                </button>
                            </div>

                            <button
                                type="button"
                                className="DoneShoppingBtn"
                                onClick={() => {
                                    setShowReceipt(false);
                                    navigate("/orders");
                                }}
                            >
                                View Order in Tracking Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default CheckoutPage;