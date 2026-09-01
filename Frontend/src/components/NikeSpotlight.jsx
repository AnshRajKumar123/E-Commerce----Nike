import React from "react";
import { spotlightData } from "../assets/assets";
import "../styles/NikeSections.css";

const NikeSpotlight = () => {
    return (
        <section className="NikeSpotlightWrapper">
            <div className="SpotlightCard">
                <div className="SpotlightGlow"></div>

                <div className="SpotlightContent">
                    <span className="SpotlightTag">{spotlightData.tagline}</span>
                    <h2 className="SpotlightHeading">{spotlightData.headline}</h2>
                    <p className="SpotlightDesc">{spotlightData.description}</p>

                    <div className="SpotlightStatsGrid">
                        {spotlightData.stats.map((stat) => (
                            <div key={stat.label} className="StatBox">
                                <strong>{stat.value}</strong>
                                <span>{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    <button className="SpotlightCTA">
                        <span>{spotlightData.ctaText}</span>
                        <i className="bx bx-right-arrow-alt"></i>
                    </button>
                </div>

                <div className="SpotlightVisual">
                    <img src={spotlightData.heroImage} alt={spotlightData.headline} />
                </div>
            </div>
        </section>
    );
};

export default NikeSpotlight;