import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { allProductsData } from "../assets/assets";
import { useShop } from "../context/ShopContext";
import "../styles/NikeSections.css";

const CategoryPage = () => {
    const { categoryType = "new" } = useParams();
    const navigate = useNavigate();
    const { addToCart, toggleWishlist, isInWishlist } = useShop();

    const activeProducts =
        categoryType.toLowerCase() === "new"
            ? allProductsData
            : allProductsData.filter(
                (p) => p.category.toLowerCase() === categoryType.toLowerCase()
            );

    const titles = {
        new: "New & Featured Releases",
        men: "Men's Footwear Collection",
        women: "Women's Footwear & Styles",
        kids: "Kids' Active & Play Footwear",
        sale: "Limited-Time Offers & End of Season Sale",
        snkrs: "SNKRS Exclusives & Shock Drops"
    };

    return (
        <main className="CategoryPageWrapper">
            <div className="CategoryHeroBanner">
                <span className="CategoryPillTag">{categoryType.toUpperCase()} COLLECTION</span>
                <h1>{titles[categoryType.toLowerCase()] || "Nike Catalog"}</h1>
                <p>Explore high-performance running, basketball heritage, and everyday lifestyle silhouettes ({activeProducts.length} items available).</p>
            </div>

            <div className="CategoryCatalogGrid">
                {activeProducts.map((item) => (
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
                                <div className="PriceStack">
                                    <strong className="ShoePrice">₹{item.price.toLocaleString("en-IN")}</strong>
                                    {item.originalPrice && (
                                        <span className="OriginalPrice">₹{item.originalPrice.toLocaleString("en-IN")}</span>
                                    )}
                                </div>
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
        </main>
    );
};

export default CategoryPage;