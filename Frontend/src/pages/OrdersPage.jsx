import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "../styles/OrdersPage.css";

const OrdersPage = () => {
    const { orders, cancelOrderItem } = useShop();
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);

    // Sync real-time clock every 30s
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(Date.now()), 30000);
        return () => clearInterval(timer);
    }, []);

    // Calculate real-time delivery status based on elapsed percentage of 4-7 days
    const computeOrderStatus = (order) => {
        const totalDuration = order.estimatedDeliveryTime - order.createdAt;
        const elapsed = currentTime - order.createdAt;
        const progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

        let stage = 1; // 1: Order Confirmed, 2: Shipped, 3: Out for Delivery, 4: Delivered
        let statusLabel = "Order Confirmed & Processing";

        if (progressPercent >= 100) {
            stage = 4;
            statusLabel = "Delivered";
        } else if (progressPercent >= 65) {
            stage = 3;
            statusLabel = "Out for Delivery";
        } else if (progressPercent >= 30) {
            stage = 2;
            statusLabel = "In Transit / Shipped";
        }

        const remainingMs = Math.max(0, order.estimatedDeliveryTime - currentTime);
        const remainingDays = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));

        return { stage, statusLabel, progressPercent, remainingDays };
    };

    const handleCancel = (orderId, item) => {
        const confirm = window.confirm(`Cancel "${item.title}" from order #${orderId}?`);
        if (confirm) {
            cancelOrderItem(orderId, item.id, item.selectedSize);
        }
    };

    return (
        <main className="OrdersPageWrapper">
            <div className="OrdersHeaderRow">
                <div>
                    <span className="SectionCategoryTag">ORDER HISTORY</span>
                    <h1 className="OrdersHeading">Your Purchases & Live Tracking</h1>
                </div>
                <Link to="/new" className="ContinueShoppingLink">
                    <i className="bx bx-arrow-back"></i> Explore More Drops
                </Link>
            </div>

            {orders.length === 0 ? (
                <div className="EmptyOrdersCard">
                    <div className="EmptyOrdersIcon">
                        <i className="bx bx-package"></i>
                    </div>
                    <h2>No Orders Placed Yet</h2>
                    <p>You haven't ordered any pairs yet. Explore our latest drops and check out to view live tracking.</p>
                    <Link to="/new" className="ShopDropsCTA">
                        <span>Shop New Releases</span>
                        <i className="bx bx-right-arrow-alt"></i>
                    </Link>
                </div>
            ) : (
                <div className="OrdersStream">
                    {orders.map((order) => {
                        const { stage, statusLabel, remainingDays } = computeOrderStatus(order);

                        return (
                            <div key={order.orderId} className="OrderCardBlock">
                                {/* Order Summary Strip */}
                                <div className="OrderMetaStrip">
                                    <div className="OrderInfoCol">
                                        <span className="MetaLabel">ORDER PLACED</span>
                                        <strong>{new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</strong>
                                    </div>

                                    <div className="OrderInfoCol">
                                        <span className="MetaLabel">TOTAL AMOUNT</span>
                                        <strong>₹{order.financials?.grandTotal?.toLocaleString("en-IN") || "0"}</strong>
                                    </div>

                                    <div className="OrderInfoCol">
                                        <span className="MetaLabel">SHIP TO</span>
                                        <strong>{order.shippingInfo?.fullName || "Valued Customer"}</strong>
                                    </div>

                                    <div className="OrderInfoCol RightCol">
                                        <span className="MetaLabel">ORDER # {order.orderId}</span>
                                        <button
                                            type="button"
                                            className="TrackOrderCTA"
                                            onClick={() => setActiveTrackingOrder(order)}
                                        >
                                            <i className="bx bx-radar"></i>
                                            <span>Track Shipment</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Timeline Status Bar */}
                                <div className="OrderStatusProgressBanner">
                                    <div className="StatusBadgeIndicator">
                                        <span className={`StatusDot ${stage === 4 ? "Delivered" : "Active"}`}></span>
                                        <strong>{statusLabel}</strong>
                                    </div>

                                    <span className="DeliveryEstimateDate">
                                        {stage === 4
                                            ? "Order Delivered"
                                            : `Arriving in ${remainingDays} day${remainingDays > 1 ? "s" : ""} (Calculated: ${order.totalDays}-Day Express)`}
                                    </span>
                                </div>

                                {/* Itemized Products in Order */}
                                <div className="OrderItemsCollection">
                                    {order.items.map((item) => {
                                        const isCancelled = item.status === "Cancelled";

                                        return (
                                            <div key={`${item.id}-${item.selectedSize}`} className={`OrderItemUnit ${isCancelled ? "item-cancelled" : ""}`}>
                                                <img
                                                    src={item.images?.[0] || item.image}
                                                    alt={item.title}
                                                    className="OrderItemThumb"
                                                />

                                                <div className="ItemDataDeck">
                                                    <h4 className="ItemName">{item.title}</h4>
                                                    <span className="ItemSubData">
                                                        Category: {item.categoryLabel || "Footwear"} | Size: UK {item.selectedSize} | Qty: {item.quantity}
                                                    </span>
                                                    <strong className="ItemPricePoint">
                                                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                                    </strong>
                                                </div>

                                                {/* Actions for Item */}
                                                <div className="ItemActionsDeck">
                                                    {isCancelled ? (
                                                        <span className="CancelledBadge">
                                                            <i className="bx bx-x-circle"></i> Item Cancelled
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <button
                                                                type="button"
                                                                className="CancelProductBtn"
                                                                disabled={stage >= 3}
                                                                onClick={() => handleCancel(order.orderId, item)}
                                                                title={stage >= 3 ? "Cannot cancel once out for delivery" : "Cancel Item"}
                                                            >
                                                                <i className="bx bx-block"></i>
                                                                <span>Cancel Item</span>
                                                            </button>

                                                            <Link to={`/product/${item.id}`} className="ViewProductAgain">
                                                                Buy Again
                                                            </Link>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* 🌟 MODAL: REAL-TIME TRACKING TIMELINE */}
            {activeTrackingOrder && (
                <div className="TrackingModalBackdrop" onClick={() => setActiveTrackingOrder(null)}>
                    <div className="TrackingModalContent" onClick={(e) => e.stopPropagation()}>
                        <div className="TrackingModalHeader">
                            <div>
                                <h2>Package Tracking</h2>
                                <p>Tracking ID: <strong>{activeTrackingOrder.orderId}</strong></p>
                            </div>
                            <button
                                type="button"
                                className="CloseTrackBtn"
                                onClick={() => setActiveTrackingOrder(null)}
                            >
                                <i className="bx bx-x"></i>
                            </button>
                        </div>

                        {/* Stepper Node Visuals */}
                        {(() => {
                            const { stage, remainingDays, statusLabel } = computeOrderStatus(activeTrackingOrder);

                            return (
                                <div className="TrackingBody">
                                    <div className="EstimatedArrivalBanner">
                                        <i className="bx bx-time-five"></i>
                                        <div>
                                            <span>Estimated Arrival</span>
                                            <h4>
                                                {stage === 4
                                                    ? "Package Delivered Successfully"
                                                    : `${remainingDays} Days Remaining (${new Date(activeTrackingOrder.estimatedDeliveryTime).toLocaleDateString("en-GB", { day: "numeric", month: "short" })})`}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="TrackingTimelineStepper">
                                        {/* Step 1 */}
                                        <div className={`TimelineStep ${stage >= 1 ? "completed" : ""}`}>
                                            <div className="StepCircle"><i className="bx bx-check"></i></div>
                                            <div className="StepDetails">
                                                <strong>Order Confirmed</strong>
                                                <small>{new Date(activeTrackingOrder.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>
                                            </div>
                                        </div>

                                        <div className={`StepConnectorLine ${stage >= 2 ? "active" : ""}`}></div>

                                        {/* Step 2 */}
                                        <div className={`TimelineStep ${stage >= 2 ? "completed" : ""}`}>
                                            <div className="StepCircle">
                                                <i className={`bx ${stage >= 2 ? "bx-check" : "bx-package"}`}></i>
                                            </div>
                                            <div className="StepDetails">
                                                <strong>Shipped from Hub</strong>
                                                <small>Nike Logistics Hub</small>
                                            </div>
                                        </div>

                                        <div className={`StepConnectorLine ${stage >= 3 ? "active" : ""}`}></div>

                                        {/* Step 3 */}
                                        <div className={`TimelineStep ${stage >= 3 ? "completed" : ""}`}>
                                            <div className="StepCircle">
                                                <i className={`bx ${stage >= 3 ? "bx-check" : "bx-cycling"}`}></i>
                                            </div>
                                            <div className="StepDetails">
                                                <strong>Out for Delivery</strong>
                                                <small>Assigned Courier Rider</small>
                                            </div>
                                        </div>

                                        <div className={`StepConnectorLine ${stage >= 4 ? "active" : ""}`}></div>

                                        {/* Step 4 */}
                                        <div className={`TimelineStep ${stage >= 4 ? "completed" : ""}`}>
                                            <div className="StepCircle">
                                                <i className={`bx ${stage >= 4 ? "bx-check" : "bx-home"}`}></i>
                                            </div>
                                            <div className="StepDetails">
                                                <strong>Delivered</strong>
                                                <small>{activeTrackingOrder.shippingInfo?.city || "Destination"}</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="RecipientAddressCard">
                                        <i className="bx bx-map-pin"></i>
                                        <div>
                                            <strong>Delivery Destination:</strong>
                                            <p>{activeTrackingOrder.shippingInfo?.address}, {activeTrackingOrder.shippingInfo?.city} - {activeTrackingOrder.shippingInfo?.postalCode}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}
        </main>
    );
};

export default OrdersPage;