import React from "react";
import { shoeTechFeatures } from "../assets/assets";
import "../styles/NikeSections.css";

const NikeAboutTech = () => {
    return (
        <section className="NikeTechWrapper">
            <div className="TechHeader">
                <span className="SectionCategoryTag">ANATOMY OF PERFORMANCE</span>
                <h2 className="SectionTitle">Engineered for World Records</h2>
                <p className="TechSubheading">
                    Every layer is calculated down to the millimeter inside the Nike Sports Research Lab.
                </p>
            </div>

            <div className="TechFeaturesGrid">
                {shoeTechFeatures.map((tech) => (
                    <div key={tech.title} className="TechCard">
                        <div className="TechIconBox">
                            <i className={`bx ${tech.icon}`}></i>
                        </div>
                        <h3 className="TechTitle">{tech.title}</h3>
                        <p className="TechDesc">{tech.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NikeAboutTech;