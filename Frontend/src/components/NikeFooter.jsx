import React from "react";
import { Link } from "react-router-dom";
import "../styles/NikeFooter.css";

const NikeFooter = () => {
    return (
        <footer className="NikeMainFooter">
            <div className="FooterTopGrid">
                <div className="FooterCol PrimaryCol">
                    <h4>FIND A STORE</h4>
                    <h4>BECOME A MEMBER</h4>
                    <h4>SIGN UP FOR EMAIL</h4>
                    <h4>SEND US FEEDBACK</h4>
                    <h4>STUDENT DISCOUNTS</h4>
                </div>

                <div className="FooterCol">
                    <h5>GET HELP</h5>
                    <Link to="#">Order Status</Link>
                    <Link to="#">Delivery</Link>
                    <Link to="#">Returns</Link>
                    <Link to="#">Payment Options</Link>
                    <Link to="#">Contact Us</Link>
                </div>

                <div className="FooterCol">
                    <h5>ABOUT NIKE</h5>
                    <Link to="#">News</Link>
                    <Link to="#">Careers</Link>
                    <Link to="#">Investors</Link>
                    <Link to="#">Sustainability</Link>
                    <Link to="#">Nike Lab NSRL</Link>
                </div>

                <div className="FooterCol SocialCol">
                    <h5>CONNECT WITH US</h5>
                    <div className="SocialIconsRow">
                        <a href="#" aria-label="Twitter"><i className="bx bxl-twitter"></i></a>
                        <a href="#" aria-label="Facebook"><i className="bx bxl-facebook"></i></a>
                        <a href="#" aria-label="YouTube"><i className="bx bxl-youtube"></i></a>
                        <a href="#" aria-label="Instagram"><i className="bx bxl-instagram"></i></a>
                    </div>
                </div>
            </div>

            <div className="FooterBottomRow">
                <div className="FooterLocation">
                    <i className="bx bx-map-pin"></i>
                    <span>India</span>
                    <span className="Copyright">© 2026 Nike, Inc. All Rights Reserved</span>
                </div>

                <div className="FooterLegalLinks">
                    <Link to="#">Guides</Link>
                    <Link to="#">Terms of Sale</Link>
                    <Link to="#">Terms of Use</Link>
                    <Link to="#">Nike Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default NikeFooter;