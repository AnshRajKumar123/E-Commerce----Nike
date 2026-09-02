import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "../styles/CustomerProfile.css";

const ProfilePage = () => {
    const { userProfile, saveProfile, logoutAuthUser } = useShop();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(userProfile);
    const [savedToast, setSavedToast] = useState(false);
    const [saving, setSaving] = useState(false);

    // Sync inputs whenever the context updates from MongoDB
    useEffect(() => {
        setFormData(userProfile);
    }, [userProfile]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await saveProfile(formData);
            setSavedToast(true);
            setTimeout(() => setSavedToast(false), 3000);
        } catch (err) {
            alert("Failed to save profile to database. Please check your connection.");
        } finally {
            setSaving(false);
        }
    };

    const handleSignOut = () => {
        if (window.confirm("Are you sure you want to sign out of your Nike Member account?")) {
            logoutAuthUser();
            navigate("/login");
        }
    };

    return (
        <main className="ProfilePageWrapper">
            {savedToast && (
                <div className="ProfileToast">
                    <i className="bx bxs-check-circle"></i>
                    <span>Delivery details saved to your account!</span>
                </div>
            )}

            <div className="ProfileHeaderDeck">
                <span className="SectionCategoryTag">MEMBER ACCOUNT</span>
                <h1 className="ProfileHeading">Saved Delivery Details</h1>
                <p>Save your address once to speed through future checkout orders.</p>
            </div>

            <div className="ProfileContainerGrid">
                <div className="ProfileSidebar">
                    <div className="ProfileBadgeCard">
                        <div className="AvatarCircle">
                            <i className="bx bx-user"></i>
                        </div>
                        <h3>{formData.fullName || "Nike Member"}</h3>
                        <p>{formData.email || "No email registered"}</p>
                        <span className="StatusTag">Verified Athlete</span>
                    </div>

                    <div className="FastLinksCard">
                        <Link to="/orders" className="SideActionLink">
                            <i className="bx bx-package"></i> Order History
                        </Link>
                        <Link to="/cart" className="SideActionLink">
                            <i className="bx bx-shopping-bag"></i> My Bag
                        </Link>
                        <Link to="/wishlist" className="SideActionLink">
                            <i className="bx bx-heart"></i> Saved Favorites
                        </Link>
                        <Link to="/checkout" className="SideActionLink">
                            <i className="bx bx-credit-card"></i> Proceed to Checkout
                        </Link>

                        <div className="SidebarDivider"></div>

                        <button
                            type="button"
                            className="SideActionLink SignOutActionBtn"
                            onClick={handleSignOut}
                        >
                            <i className="bx bx-log-out"></i>
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>

                <div className="ProfileFormCard">
                    <h3>Shipping & Contact Information</h3>
                    <form onSubmit={handleSubmit} className="CustomerForm">
                        <div className="FormRowDouble">
                            <div className="FieldGroup">
                                <label>Full Legal Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="e.g. Ansh Kumar"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="FieldGroup">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="e.g. athlete@nike.com"
                                    value={formData.email}
                                    disabled
                                    title="Email cannot be changed directly"
                                    style={{ opacity: 0.7, cursor: "not-allowed" }}
                                />
                            </div>
                        </div>

                        <div className="FormRowDouble">
                            <div className="FieldGroup">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="FieldGroup">
                                <label>Postal / PIN Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="e.g. 560001"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="FieldGroup FullWidth">
                            <label>Street Address</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="House / Flat No, Landmark, Street"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="FieldGroup">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="e.g. Bangalore"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="SaveProfileBtn" disabled={saving}>
                            <span>{saving ? "Saving to Database..." : "Save Delivery Profile"}</span>
                            <i className="bx bx-save"></i>
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;