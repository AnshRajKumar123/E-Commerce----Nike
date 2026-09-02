import React from "react";
import { Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import ScrollToTop from "./components/ScrollToTop";
import NikeNavbar from "./components/NikeNavbar";
import NikeHero from "./components/NikeHero";
import NikeSpotlight from "./components/NikeSpotlight";
import NikeAboutTech from "./components/NikeAboutTech";
import NikeCompanyValues from "./components/NikeCompanyValues";
import NikeNewsletter from "./components/NikeNewsletter";
import NikeFooter from "./components/NikeFooter";
import CategoryPage from "./pages/CategoryPage";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";

const HomeLanding = () => (
    <>
        <NikeHero />
        <NikeSpotlight />
        <NikeAboutTech />
        <NikeCompanyValues />
    </>
);

function App() {
    return (
        <ShopProvider>
            <div className="NikeApp">
                <ScrollToTop />
                <NikeNavbar />

                <Routes>
                    <Route path="/" element={<HomeLanding />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/product/:productId" element={<SingleProductPage />} />
                    <Route path="/:categoryType" element={<CategoryPage />} />
                </Routes>

                <NikeNewsletter />
                <NikeFooter />
            </div>
        </ShopProvider>
    );
}

export default App;