import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { nikeGeneral, nikeNavData } from "../assets/assets";
import { useShop } from "../context/ShopContext";
import "../styles/NikeNavbar.css";

const NikeNavbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { cartCount, wishlistItems, orders } = useShop();
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    return (
        <header className="NikeNavWrapper">
            <div className="NikeUtilityBar">
                <div className="UtilityBrandMarks">
                    <span>Jordan</span>
                    <span className="UtilityDot">•</span>
                    <span>Converse</span>
                </div>

                <div className="UtilityLinksGroup">
                    {nikeNavData.utilityLinks.map((item, index) => (
                        <React.Fragment key={item.label}>
                            <Link to={item.path}>{item.label}</Link>
                            {index < nikeNavData.utilityLinks.length - 1 && <span className="UtilityDivider">|</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <nav className="NikeMainBar">
                <Link to="/" className="NikeLogoAnchor">
                    <img src={nikeGeneral.WebLogo} alt="Nike Logo" />
                </Link>

                <ul className={`NikeNavLinksList ${mobileMenuOpen ? "mobile-open" : ""}`}>
                    {nikeNavData.navLinks.map((link) => (
                        <li key={link.label}>
                            <Link
                                to={link.path}
                                className={`${link.isSale ? "SaleLink" : ""} ${link.isSnkrs ? "SnkrsPill" : ""}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="NikeRightActions">
                    <div className={`NikeSearchBox ${searchFocused ? "focused" : ""}`}>
                        <i className="bx bx-search"></i>
                        <input
                            type="text"
                            placeholder="Search shoes..."
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                    </div>

                    {/* Cart Bag Icon */}
                    <Link to="/cart" className="ActionIconBtn BagIconBtn" title="Shopping Bag">
                        <i className="bx bx-shopping-bag"></i>
                        {cartCount > 0 && <span className="Badge ActiveBadge">{cartCount}</span>}
                    </Link>

                    {/* User Profile */}
                    <Link to="/profile" className="ActionIconBtn" title="Member Profile">
                        <i className="bx bx-user"></i>
                    </Link>

                    {/* 🌟 TRIPLE-DOT BARS BUTTON DROPDOWN */}
                    <div className="NavbarDropdownHub" ref={dropdownRef}>
                        <button
                            type="button"
                            className={`ActionIconBtn TripleDotBtn ${dropdownOpen ? "active-menu" : ""}`}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            title="More Actions"
                        >
                            <i className="bx bx-dots-vertical-rounded"></i>
                        </button>

                        {dropdownOpen && (
                            <div className="DropdownFlyoutMenu">
                                <Link
                                    to="/orders"
                                    className="DropdownMenuItem"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <i className="bx bx-package"></i>
                                    <span>Order History</span>
                                    {orders.length > 0 && <span className="MenuCountPill">{orders.length}</span>}
                                </Link>

                                <Link
                                    to="/wishlist"
                                    className="DropdownMenuItem"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <i className="bx bx-heart"></i>
                                    <span>Wishlist</span>
                                    {wishlistItems.length > 0 && (
                                        <span className="MenuCountPill">{wishlistItems.length}</span>
                                    )}
                                </Link>

                                <Link
                                    to="/profile"
                                    className="DropdownMenuItem"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <i className="bx bx-user-circle"></i>
                                    <span>Account & Addresses</span>
                                </Link>

                                <div className="DropdownDivider"></div>

                                <Link
                                    to="/help"
                                    className="DropdownMenuItem"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <i className="bx bx-help-circle"></i>
                                    <span>Support & FAQ</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    <button
                        className="MobileNavToggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <i className={`bx ${mobileMenuOpen ? "bx-x" : "bx-menu"}`}></i>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default NikeNavbar;