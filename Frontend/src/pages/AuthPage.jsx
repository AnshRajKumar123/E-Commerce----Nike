import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { nikeGeneral } from "../assets/assets";
import "../styles/AuthPage.css";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const { loginAuthUser } = useShop();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.from || "/";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        const endpoint = isLogin ? "/api/users/login" : "/api/users/register";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Authentication failed");
            }

            // Save user & token to context & localStorage
            if (loginAuthUser) {
                loginAuthUser(data.user, data.token);
            }
            navigate(redirectPath);
        } catch (err) {
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="AuthPageWrapper">
            <div className="AuthCardBox">
                {/* Nike Brand Logo */}
                <div className="AuthLogoRow">
                    <Link to="/">
                        <img src={nikeGeneral?.WebLogo || "/logo.png"} alt="Nike" className="AuthBrandLogo" />
                    </Link>
                </div>

                <div className="AuthHeader">
                    <span className="SectionCategoryTag">NIKE MEMBERSHIP</span>
                    <h2>{isLogin ? "YOUR ACCOUNT FOR EVERYTHING NIKE" : "BECOME A NIKE MEMBER"}</h2>
                    <p>
                        {isLogin
                            ? "Sign in to access Member Exclusives, Saved Drops, and faster checkout."
                            : "Create your member profile and get first access to the very best of Nike products, inspiration, and community."}
                    </p>
                </div>

                {errorMsg && (
                    <div className="AuthErrorBanner">
                        <i className="bx bx-error-circle"></i>
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="AuthForm">
                    {!isLogin && (
                        <div className="AuthInputGroup">
                            <label>Full Legal Name</label>
                            <div className="InputWrapper">
                                <i className="bx bx-user"></i>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="AuthInputGroup">
                        <label>Email Address</label>
                        <div className="InputWrapper">
                            <i className="bx bx-envelope"></i>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="AuthInputGroup">
                        <label>Password</label>
                        <div className="InputWrapper">
                            <i className="bx bx-lock-alt"></i>
                            <input
                                type="password"
                                name="password"
                                placeholder="Minimum 6 characters"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="AuthAgreementRow">
                        <input type="checkbox" id="auth-agree" required />
                        <label htmlFor="auth-agree">
                            By continuing, I agree to Nike's <strong>Privacy Policy</strong> and <strong>Terms of Use</strong>.
                        </label>
                    </div>

                    <button type="submit" className="AuthSubmitBtn" disabled={loading}>
                        <span>{loading ? "Processing..." : isLogin ? "Sign In" : "Join Us"}</span>
                        <i className="bx bx-right-arrow-alt"></i>
                    </button>
                </form>

                <div className="AuthToggleDeck">
                    <span>{isLogin ? "Not a Member yet?" : "Already registered?"}</span>
                    <button
                        type="button"
                        className="ToggleLinkBtn"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setErrorMsg("");
                        }}
                    >
                        {isLogin ? "Join Us." : "Sign In."}
                    </button>
                </div>
            </div>
        </main>
    );
};

export default AuthPage;