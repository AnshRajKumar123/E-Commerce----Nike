import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nikeGeneral, nikeNavData } from "../assets/assets";
import { useShop } from "../context/ShopContext";
import "../styles/NikeNavbar.css";

const NikeNavbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const { cartCount, wishlistItems } = useShop();

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
                    <img src={nikeGeneral.WebLogo} />
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

                    <Link to="/wishlist" className="ActionIconBtn" title="Favorites">
                        <i className="bx bx-heart"></i>
                        {wishlistItems.length > 0 && <span className="Badge">{wishlistItems.length}</span>}
                    </Link>

                    <Link to="/cart" className="ActionIconBtn BagIconBtn" title="Shopping Bag">
                        <i className="bx bx-shopping-bag"></i>
                        {cartCount > 0 && <span className="Badge ActiveBadge">{cartCount}</span>}
                    </Link>

                    {/* 🌟 USER PROFILE NAVLINK BUTTON */}
                    <Link to="/profile" className="ActionIconBtn" title="Member Profile">
                        <i className="bx bx-user"></i>
                    </Link>

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