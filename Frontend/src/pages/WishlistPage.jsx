import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "../styles/WishlistPage.css";

const WishlistPage = () => {
    const { wishlistItems, toggleWishlist, addToCart } = useShop();
    const navigate = useNavigate();

    return (
        <main className="WishlistPageWrapper">
            <div className="WishlistHeaderRow">
                <div>
                    <span className="SectionCategoryTag">SAVED SILHOUETTES</span>
                    <h1 className="WishlistHeading">Your Favorites ({wishlistItems.length})</h1>
                </div>
                <Link to="/new" className="ContinueShoppingLink">
                    <i className="bx bx-arrow-back"></i> Discover More
                </Link>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="EmptyWishlistState">
                    <div className="EmptyHeartCircle">
                        <i className="bx bx-heart"></i>
                    </div>
                    <h2>Your Wishlist is Empty</h2>
                    <p>Explore our catalog, hit the heart icon on any shoe, and save your most wanted pairs right here.</p>
                    <button className="ExploreDropsBtn" onClick={() => navigate("/new")}>
                        <span>Explore Drops</span>
                        <i className="bx bx-right-arrow-alt"></i>
                    </button>
                </div>
            ) : (
                <div className="WishlistGrid">
                    {wishlistItems.map((item) => (
                        <div
                            key={item.id}
                            className="WishlistCard"
                            onClick={() => navigate(`/product/${item.id}`)}
                        >
                            <div className="WishlistMedia">
                                <span className="CardBadge">{item.badge}</span>
                                <button
                                    className="WishlistRemoveBtn"
                                    title="Remove from favorites"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleWishlist(item);
                                    }}
                                >
                                    <i className="bx bxs-heart"></i>
                                </button>
                                <img
                                    src={item.images?.[0] || item.image}
                                    alt={item.title}
                                    className="ShoeThumb"
                                />
                            </div>

                            <div className="WishlistBody">
                                <span className="CategoryName">{item.categoryLabel || item.category}</span>
                                <h3 className="ShoeTitle">{item.title}</h3>

                                <div className="WishlistFooterRow">
                                    <strong className="ShoePrice">₹{item.price.toLocaleString("en-IN")}</strong>
                                    <button
                                        className="MoveToBagBtn"
                                        title="Add to Bag"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(item, 8, 1);
                                        }}
                                    >
                                        <i className="bx bx-shopping-bag"></i>
                                        <span>Add to Bag</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default WishlistPage;