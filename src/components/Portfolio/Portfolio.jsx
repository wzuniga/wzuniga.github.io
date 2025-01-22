import React from "react";
import Project from "./Project";
import "./Portfolio.scss";
import portfolioDict from "./PortfolioDictionary";

function Portfolio() {

  return (
    <section className="portfolioContainer" id="portfolio">
      <h2 className="portfolio-heading">Portfolio</h2>
      {portfolioDict.map(
        (value, index) =>
          <Project
            projectDict={value}
            firstPortfolio={index === 0}
            position={index % 2 === 0}
            key={`portfolio-project-${index}`}
          />
      )}
    </section>
  )
}

export default Portfolio;