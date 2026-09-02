import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nikeNavData } from "../assets/assets";
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
                    <svg className="NikeSwooshIcon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.707 5.293c-.201-.201-.482-.284-.758-.225l-16 3.5c-.381.083-.667.404-.698.793-.031.39.199.749.563.882l5.772 2.108-2.88 5.76c-.19.381-.097.844.225 1.122.321.278.789.297 1.132.046l12-8.5c.307-.217.439-.617.324-.972-.115-.355-.443-.604-.816-.604h-.008l-7.394.09 9.289-3.251c.321-.112.545-.399.569-.738.024-.34-.143-.655-.42-.811z" />
                    </svg>
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