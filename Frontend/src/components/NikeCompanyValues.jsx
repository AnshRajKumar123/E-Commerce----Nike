import React from "react";
import { companyValues } from "../assets/assets";
import "../styles/NikeSections.css";

const NikeCompanyValues = () => {
    return (
        <section className="CompanyValuesWrapper">
            <div className="TechHeader">
                <span className="SectionCategoryTag">THE IMPACT</span>
                <h2 className="SectionTitle">More Than Just Footwear</h2>
            </div>

            <div className="ValuesGrid">
                {companyValues.map((val) => (
                    <div key={val.title} className="ValueCard">
                        <span className="ValueBadge">{val.tag}</span>
                        <h3 className="ValueTitle">{val.title}</h3>
                        <p className="ValueDesc">{val.desc}</p>
                        <a href={val.link} className="ValueLink">
                            <span>Read Chapter</span>
                            <i className="bx bx-chevron-right"></i>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NikeCompanyValues;