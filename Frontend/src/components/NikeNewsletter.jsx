import React, { useState } from "react";
import "../styles/NikeNewsletter.css";

const NikeNewsletter = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail("");
        }
    };

    return (
        <section className="NewsletterSectionWrapper">
            <div className="NewsletterContainer">
                <div className="NewsletterLeft">
                    <span className="NewsletterTag">BE THE FIRST TO KNOW</span>
                    <h2>Never Miss a SNKRS Drop</h2>
                    <p>Subscribe to receive early access to shock drops, athlete stories, and member-only promotions.</p>
                </div>

                <div className="NewsletterRight">
                    {subscribed ? (
                        <div className="SubscriptionSuccess">
                            <i className="bx bxs-check-circle"></i>
                            <span>You're in! Check your inbox for your 10% welcome pass.</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="NewsletterForm">
                            <div className="EmailInputBox">
                                <i className="bx bx-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="SubscribeBtn">
                                <span>Join Us</span>
                                <i className="bx bx-right-arrow-alt"></i>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NikeNewsletter;