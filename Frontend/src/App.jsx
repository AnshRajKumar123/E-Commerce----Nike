import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ShopProvider, useShop } from "./context/ShopContext";
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
import AuthPage from "./pages/AuthPage";

const HomeLanding = () => (
    <>
        <NikeHero />
        <NikeSpotlight />
        <NikeAboutTech />
        <NikeCompanyValues />
    </>
);

// 🔒 Gatekeeper: Blocks unauthenticated users and sends them to /login
const ProtectedRoute = ({ children }) => {
    const { authToken } = useShop();
    const location = useLocation();

    if (!authToken) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;
};

// Inner App Content (allows useShop and useLocation inside ShopProvider)
const MainAppContent = () => {
    const { authToken } = useShop();
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <div className="NikeApp">
            <ScrollToTop />

            {/* Only show Navbar if logged in and not on login page */}
            {!isLoginPage && authToken && <NikeNavbar />}

            <Routes>
                {/* Public Login Route (redirects to Home if already authenticated) */}
                <Route
                    path="/login"
                    element={authToken ? <Navigate to="/" replace /> : <AuthPage />}
                />

                {/* 🔒 Protected Store Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomeLanding />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <CartPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <WishlistPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <CheckoutPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <OrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/product/:productId"
                    element={
                        <ProtectedRoute>
                            <SingleProductPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/:categoryType"
                    element={
                        <ProtectedRoute>
                            <CategoryPage />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Only show Footer & Newsletter when authenticated and outside of /login */}
            {!isLoginPage && authToken && (
                <>
                    <NikeNewsletter />
                    <NikeFooter />
                </>
            )}
        </div>
    );
};

function App() {
    return (
        <ShopProvider>
            <MainAppContent />
        </ShopProvider>
    );
}

export default App;