import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { allProductsData } from "../assets/assets";
import { useShop } from "../context/ShopContext";
import "../styles/SingleProduct.css";

const SingleProductPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addToCart, toggleWishlist, isInWishlist } = useShop();

    const product = allProductsData.find((p) => p.id === productId) || allProductsData[0];
    const [selectedImg, setSelectedImg] = useState(product.images?.[0] || product.image);
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 8);
    const [quantity, setQuantity] = useState(1);
    const [toastMsg, setToastMsg] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedImg(product.images?.[0] || product.image);
        setSelectedSize(product.sizes?.[0] || 8);
        setQuantity(1);
    }, [productId, product]);

    const relatedProducts = allProductsData
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, selectedSize, quantity);
        setToastMsg(`Added ${quantity}x ${product.title} (UK ${selectedSize}) to Bag!`);
        setTimeout(() => setToastMsg(""), 3000);
    };

    const handleWishlistToggle = () => {
        toggleWishlist(product);
        setToastMsg(
            isInWishlist(product.id)
                ? `Removed ${product.title} from Wishlist`
                : `Added ${product.title} to Wishlist!`
        );
        setTimeout(() => setToastMsg(""), 3000);
    };

    const isFavorited = isInWishlist(product.id);

    return (
        <main className="SingleProductPageWrapper">
            {toastMsg && (
                <div className="CartNotificationToast">
                    <i className="bx bxs-check-circle"></i>
                    <span>{toastMsg}</span>
                </div>
            )}

            <div className="ProductBreadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to={`/${product.category}`}>{product.category.toUpperCase()}</Link>
                <span>/</span>
                <span className="CurrentTitle">{product.title}</span>
            </div>

            <div className="SingleProductGrid">
                <div className="ProductGallerySection">
                    <div className="ThumbnailTrack">
                        {(product.images || [product.image]).map((imgUrl, index) => (
                            <button
                                key={index}
                                className={`ThumbnailBtn ${selectedImg === imgUrl ? "active" : ""}`}
                                onClick={() => setSelectedImg(imgUrl)}
                            >
                                <img src={imgUrl} alt={`Thumbnail ${index + 1}`} />
                            </button>
                        ))}
                    </div>

                    <div className="MainDisplayFrame">
                        <span className="BigCardBadge">{product.badge}</span>
                        <img src={selectedImg} alt={product.title} className="MainLargeImage" />
                    </div>
                </div>

                <div className="ProductSpecsSection">
                    <span className="ProductSubCategory">{product.categoryLabel}</span>
                    <h1 className="ProductMainTitle">{product.title}</h1>

                    <div className="RatingAndReviewsRow">
                        <div className="StarBlock">
                            <i className="bx bxs-star"></i>
                            <span>{product.rating}</span>
                        </div>
                        <span className="ReviewCount">(124 Verified Athlete Reviews)</span>
                    </div>

                    <div className="ProductPriceBlock">
                        <span className="PriceMRP">MRP INCLUSIVE OF ALL TAXES</span>
                        <div className="PriceFlex">
                            <strong className="CurrentPrice">₹{product.price.toLocaleString("en-IN")}</strong>
                            {product.originalPrice && (
                                <span className="StrikedPrice">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                            )}
                        </div>
                    </div>

                    <p className="ProductDetailedDesc">{product.description}</p>

                    <div className="SizeSelectionBlock">
                        <div className="SizeHeader">
                            <span className="SizeTitle">Select Size (UK / India)</span>
                            <button className="SizeGuideBtn">Size Guide</button>
                        </div>
                        <div className="SizesGrid">
                            {(product.sizes || [7, 8, 9, 10, 11]).map((size) => (
                                <button
                                    key={size}
                                    className={`SizeChip ${selectedSize === size ? "selected" : ""}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    UK {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="QuantitySelectionRow">
                        <span className="QtyLabel">Quantity:</span>
                        <div className="Stepper">
                            <button onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}>
                                <i className="bx bx-minus"></i>
                            </button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity((q) => q + 1)}>
                                <i className="bx bx-plus"></i>
                            </button>
                        </div>
                    </div>

                    <div className="ActionsButtonDeck">
                        <button className="AddToCartBtn" onClick={handleAddToCart}>
                            <i className="bx bx-shopping-bag"></i> Add to Bag
                        </button>
                        <button
                            className={`WishlistBtn ${isFavorited ? "favorited" : ""}`}
                            onClick={handleWishlistToggle}
                        >
                            <i className={`bx ${isFavorited ? "bxs-heart" : "bx-heart"}`} style={{ color: isFavorited ? "#ef4444" : "" }}></i>
                            <span>{isFavorited ? "Saved in Wishlist" : "Favorite"}</span>
                        </button>
                    </div>

                    <div className="ShippingPerksList">
                        <div className="PerkItem">
                            <i className="bx bx-package"></i>
                            <div>
                                <strong>Free Standard Delivery</strong>
                                <p>Delivered within 3–5 business days.</p>
                            </div>
                        </div>
                        <div className="PerkItem">
                            <i className="bx bx-refresh"></i>
                            <div>
                                <strong>30-Day Return Guarantee</strong>
                                <p>Free returns on unworn merchandise.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <section className="RelatedProductsSection">
                    <div className="RelatedHeadingRow">
                        <div>
                            <span className="SectionCategoryTag">YOU MIGHT ALSO LIKE</span>
                            <h2 className="SectionTitle">More in this Category</h2>
                        </div>
                    </div>

                    <div className="RelatedProductsGrid">
                        {relatedProducts.map((item) => (
                            <div
                                key={item.id}
                                className="ShoeCard"
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
                                    <img src={item.images?.[0] || item.image} alt={item.title} className="ShoeThumb" />
                                </div>
                                <div className="ShoeCardBody">
                                    <span className="CategoryName">{item.categoryLabel}</span>
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
            )}
        </main>
    );
};

export default SingleProductPage;