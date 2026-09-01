import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { heroSneakersData, topSilhouettesData } from "../assets/assets";
import { useShop } from "../context/ShopContext";
import "../styles/NikeHero.css";

const NikeHero = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const activeShoe = heroSneakersData[activeIdx];
    const navigate = useNavigate();
    const { addToCart, toggleWishlist, isInWishlist } = useShop();

    return (
        <div className="NikeHeroWrapper">
            {/* 🌟 HERO 3D BILLBOARD */}
            <section className="NikeHeroBillboard" style={{ "--glow-accent": "rgba(56, 189, 248, 0.45)" }}>
                <div className="HeroWatermark">JUST DO IT</div>
                <div className="HeroAmbientOrb"></div>

                <div className="HeroBillboardContent">
                    <div className="HeroLeftDeck">
                        <span className="HeroPillTag">
                            <span className="PulseIndicator" style={{ backgroundColor: "#0284c7" }}></span>
                            {activeShoe.badge || "NEW RELEASE"}
                        </span>

                        <h1 className="HeroMainHeading">{activeShoe.title || activeShoe.name}</h1>
                        <h3 className="HeroSubHeading">{activeShoe.categoryLabel || "Street Velocity"}</h3>
                        <p className="HeroStoryText">{activeShoe.description || activeShoe.story}</p>

                        <div className="HeroPriceCtaRow">
                            <div className="PriceTagBlock">
                                <span className="PriceLabel">MRP INCL. TAXES</span>
                                <strong className="PriceVal">₹{activeShoe.price.toLocaleString("en-IN")}</strong>
                            </div>

                            <button
                                className="HeroPrimaryBtn"
                                onClick={() => navigate(`/product/${activeShoe.id}`)}
                            >
                                <span>Shop Product</span>
                                <i className="bx bx-right-arrow-alt"></i>
                            </button>

                            <button
                                className="HeroFavBtn"
                                title="Save to Favorites"
                                onClick={() => toggleWishlist(activeShoe)}
                            >
                                <i
                                    className={`bx ${isInWishlist(activeShoe.id) ? "bxs-heart" : "bx-heart"}`}
                                    style={{ color: isInWishlist(activeShoe.id) ? "#ef4444" : "" }}
                                ></i>
                            </button>
                        </div>

                        {/* Edition Switcher */}
                        <div className="EditionSelectorGroup">
                            <span className="SelectorTitle">Featured Editions:</span>
                            <div className="EditionsRow">
                                {heroSneakersData.map((shoe, idx) => (
                                    <button
                                        key={shoe.id}
                                        className={`EditionPill ${activeIdx === idx ? "active" : ""}`}
                                        onClick={() => setActiveIdx(idx)}
                                    >
                                        <span className="ColorDot" style={{ backgroundColor: idx === 0 ? "#0284c7" : idx === 1 ? "#0c1e3d" : "#06b6d4" }}></span>
                                        <span>{shoe.title.replace("Nike ", "")}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        className="HeroRightDisplay"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/product/${activeShoe.id}`)}
                    >
                        <div className="SneakerStage">
                            <img
                                key={activeShoe.id}
                                src={activeShoe.images?.[0] || activeShoe.image}
                                alt={activeShoe.title}
                                className="HeroSneaker3D"
                            />
                        </div>

                        <div className="FloatBadge TopBadge">
                            <i className="bx bx-wind"></i>
                            <div>
                                <strong>Air Sole Matrix</strong>
                                <small>Impact Absorption</small>
                            </div>
                        </div>

                        <div className="FloatBadge BottomBadge">
                            <i className="bx bx-check-shield"></i>
                            <div>
                                <strong>Official Verified</strong>
                                <small>100% Genuine Nike Pair</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🌟 TOP PICKS / BEST SELLERS SECTION */}
            <section className="NikeTopPicksSection">
                <div className="SectionHeadingFlex">
                    <div>
                        <span className="SectionCategoryTag">MUST-HAVE SILHOUETTES</span>
                        <h2 className="SectionTitle">Featured Best Sellers</h2>
                    </div>

                    <div className="CarouselArrows">
                        <button className="ArrowBtn" onClick={() => navigate("/men")}><i className="bx bx-chevron-left"></i></button>
                        <button className="ArrowBtn" onClick={() => navigate("/new")}><i className="bx bx-chevron-right"></i></button>
                    </div>
                </div>

                <div className="TopPicksGrid">
                    {topSilhouettesData.map((item) => (
                        <div
                            key={item.id}
                            className="ShoeCard"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/product/${item.id}`)}
                        >
                            <div className="ShoeCardMedia">
                                <span className="CardBadge">{item.badge}</span>
                                <button
                                    className="CardHeartBtn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleWishlist(item);
                                    }}
                                >
                                    <i
                                        className={`bx ${isInWishlist(item.id) ? "bxs-heart" : "bx-heart"}`}
                                        style={{ color: isInWishlist(item.id) ? "#ef4444" : "" }}
                                    ></i>
                                </button>
                                <img
                                    src={item.images?.[0] || item.image}
                                    alt={item.title}
                                    className="ShoeThumb"
                                />
                            </div>

                            <div className="ShoeCardBody">
                                <div className="CardCategoryRow">
                                    <span className="CategoryName">{item.categoryLabel || item.category}</span>
                                    <span className="RatingScore">
                                        <i className="bx bxs-star"></i> {item.rating}
                                    </span>
                                </div>

                                <h4 className="ShoeTitle">{item.title}</h4>

                                <div className="CardPriceRow">
                                    <strong className="ShoePrice">₹{item.price.toLocaleString("en-IN")}</strong>
                                    <button
                                        className="BagAddBtn"
                                        title="Add to Bag"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(item, 8, 1);
                                        }}
                                    >
                                        <i className="bx bx-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default NikeHero;