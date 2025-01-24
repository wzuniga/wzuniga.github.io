import React from "react";
import { useState } from "react";
import "./WhereIWorked.css";

function WhereIWorked() {

  const [workIndex, setWorkIndex] = useState(0);

  const workInfoDict = [
    {
      company: "Scanntech",
      position: "Java-Angular Full-Stack Developer",
      place: "Montevideo, Uruguay",
      from: "April 2023",
      to: "Present",
      specifications: [
        "Development of web applications, implementation of features, application maintenance, performance improvement in frontend and backend",
        "Continuous deployment using Gitlab software",
        "Use of agile methodologies in development"
      ],
      tools: ["Java Spring Boot", "Angular (TypeScript)", "GIT", "SCRUM", "Figma"]
    },
    {
      company: "Zoluxiones (Scotiabank)",
      position: "Java-ReactJS Full-Stack Developer",
      place: "Santiago, Chile",
      from: "February 2022",
      to: "April 2023",
      specifications: [
        "Development and migration of microservices in Scotiabank Chile",
        "Management of microframeworks and REST queries",
        "Integration with security and authentication management between microservices and frontend"
      ],
      tools: ["Java Spring Boot", "ReactJS (JS y TypeScript)", "Canva", "Material Design", "GIT", "Microservices"]
    },
    {
      company: "Infobox Latinoamerica (Nubedian)",
      position: "Java | ReactJs FullStack Developer",
      place: "Karlsruhe, Alemania",
      from: "February 2021",
      to: "February 2022",
      specifications: [
        "Development of an integration system for different health institutions in Germany",
        "Development of the pilot ICU bed management system for the Peruvian Ministry of Health",
      ],
      tools: ["Java 13", "Spring", "Spring Boot", "ReactJS", "MariaDB", "Material Design"]
    },
    {
      company: "ANFA",
      position: "Python | Odoo Developer",
      place: "Arequipa, Perú",
      from: "October 2020",
      to: "February 2021",
      specifications: [
        "Development of a system for sending Invoices to SUNAT from SAP business one",
        "Consuming a REST API and version control on Github",
      ],
      tools: ["ODOO v12", "JavaEE v8", "QWeb", "PostgreSQL", "Bootstrap"]
    },
    {
      company: "Fundação Getulio Vargas (FGV)",
      position: "Vizualization | Data researcher",
      place: "Rio de Janeiro, Brazil",
      from: "June 2019",
      to: "October 2020",
      specifications: [
        "Development of an interactive visualization system for Anomalies in space-time data (Data Science)",
      ],
      tools: ["Django", "Django REST framework", "ReactJS", "D3.js", "Deck.gl", "react-map-gl", "Bootstrap", "pandas", "numpy", "numba", "altair", "plotly"]
    },
    {
      company: "InkaLabs",
      position: "Python Full-Stack Developer",
      place: "Arequipa, Perú",
      from: "June 2020",
      to: "September 2020",
      specifications: [
        "Development of online sales system, payment gateway and development of investment control system, SCRUM development methodology",
      ],
      tools: ["ReactJS (Typescript y JavaScript)", "Django", "Django REST framework", "GraphQL"]
    },
    {
      company: "Art Atlas Perú",
      position: "Python | Odoo Developer",
      place: "Arequipa, Perú",
      from: "March 2016",
      to: "April 2018",
      specifications: [
        "Development of ERP systems for internal control of products and production of the company",
        "Integration with SAP Business one through web service",
        "reports and version management on Github.",
      ],
      tools: ["ODOO v8", "Java 7", "Java 8", "JavaEE", "SOAP", "QWeb", "Github"]
    },
  ];

  return (
    <section className="workedContainer" id="whereWorked">
      <h2 className="numbered-heading">Where I've worked</h2>
      <div className="innerBox">
        <div>
          {workInfoDict.map((value, index) => 
            <button
              className={`buttonOption ${workIndex === index ? "activeButton" : ""}`}
              onClick={() => setWorkIndex(index)}
              key={`buttonOption-${index}`}
            >
              <span>{value.company}</span>
            </button>
          )}
        </div>
        <div className="infoContainer">
          <div>
            <h3 className="h3Info">
              <span>{workInfoDict[workIndex].position}</span>
              <span className="company">
                &nbsp;@&nbsp;{workInfoDict[workIndex].company}
              </span>
            </h3>
            <p>{workInfoDict[workIndex].place}</p>
            <p>{workInfoDict[workIndex].from} - {workInfoDict[workIndex].to}</p>
            
            <div className="listInfo">
              <ul>
                {workInfoDict[workIndex].specifications.map((value, index) => 
                  <li key={`listInfo-${index}`}>{value}</li>
                )}
              </ul>
            </div>
            <ul className="tools-list">
                {workInfoDict[workIndex].tools.map((value, index) => 
                  <li key={`tools-list-${index}`}>{value}</li>
                )}
            </ul>
          </div>
        </div> 
      </div>
    </section>
  )
}

export default WhereIWorked;
