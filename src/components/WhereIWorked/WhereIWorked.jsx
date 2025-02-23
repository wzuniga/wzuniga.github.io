import React from "react";
import { useState } from "react";
import "./WhereIWorked.css";

function WhereIWorked() {

  const [workIndex, setWorkIndex] = useState(0);

  const workInfoDict = [
    {
      company: "Scanntech",
      position: "Java-Angular Full-Stack Developer (SSR Advanced)",
      place: "Montevideo, Uruguay",
      from: "April 2023",
      to: "Present",
      specifications: [
        "Lead the design, development, and maintenance of scalable web applications, focusing on both frontend and backend optimizations.",
        "Implement new features and improvements while conducting thorough code reviews and ensuring adherence to industry best practices.",
        "Work closely with cross-functional teams in an Agile environment, designing intuitive user interfaces in Figma and ensuring seamless integration with development.",
        "Utilize GitLab for continuous integration and deployment, Docker for containerization, and Postman for comprehensive API testing.",
        "Mentor junior developers and contribute to architectural decision-making."
      ],
      tools: ["Java Spring Boot", "Angular (TypeScript)", "GitLab", "Docker", "Postman", "Figma", "SCRUM"]
    },
    {
      company: "Zoluxiones (Scotiabank)",
      position: "Java-ReactJS Full-Stack Developer (Senior)",
      place: "Santiago, Chile",
      from: "February 2022",
      to: "April 2023",
      specifications: [
        "Developed and migrated microservices for Scotiabank Chile, ensuring secure authentication and seamless inter-service communication.",
        "Architected and implemented RESTful APIs, driving technical decisions and establishing coding standards across the team.",
        "Coordinated cross-functional teams and mentored developers, ensuring timely delivery and high-quality code in an Agile environment."
      ],
      tools: ["Java Spring Boot", "ReactJS (TypeScript)", "Docker", "JIRA", "Swagger", "Postman"]
    },
    {
      company: "Infobox (Nubedian)",
      position: "Java-ReactJS Full-Stack Developer (SSR)",
      place: "Karlsruhe, Germany",
      from: "February 2021",
      to: "February 2022",
      specifications: [
        "Developed integration systems for health institutions in Germany and a pilot ICU bed management system for the Peruvian Ministry of Health.",
        "Contributed to system design, implementation, and maintenance, performing rigorous code reviews and debugging as part of a semi-senior role.",
        "Collaborated with cross-functional teams to ensure seamless integration between frontend and backend services."
      ],
      tools: ["Java 13", "Spring Boot", "ReactJS", "MariaDB", "Material Design", "Docker", "Postman", "GitLab CI/CD"]
    },
    {
      company: "ANFA",
      position: "Python Full-Stack Developer",
      place: "Arequipa, Perú",
      from: "October 2020",
      to: "February 2021",
      specifications: [
        "Developed a system to automate invoice submissions to SUNAT via SAP Business One, integrating RESTful APIs and leveraging GitHub for version control."
      ],
      tools: ["ODOO v12", "JavaEE v8", "QWeb", "PostgreSQL", "Bootstrap"]
    },
    {
      company: "Fundação Getulio Vargas (FGV)",
      position: "Data Scientist",
      place: "Rio de Janeiro, Brazil",
      from: "June 2019",
      to: "October 2020",
      specifications: [
        "Created an interactive visualization platform for detecting spatio-temporal anomalies in data, enhancing decision-making processes."
      ],
      tools: ["Django", "Django REST Framework", "ReactJS", "D3.js", "Deck.gl", "react-map-gl", "Bootstrap", "pandas", "numpy", "numba", "altair", "plotly"]
    },
    {
      company: "InkaLabs",
      position: "Python-ReactJS Full-Stack Developer",
      place: "Arequipa, Perú",
      from: "June 2020",
      to: "September 2020",
      specifications: [
        "Designed and implemented an online sales system with an integrated payment gateway and investment control module, following SCRUM methodologies."
      ],
      tools: ["ReactJS (TypeScript/JavaScript)", "Django", "Django REST Framework", "GraphQL"]
    },
    {
      company: "Art Atlas",
      position: "Python Full-Stack Developer",
      place: "Arequipa, Perú",
      from: "March 2016",
      to: "April 2018",
      specifications: [
        "Developed ERP systems for internal control of products and production management, integrating SAP Business One via web services.",
        "Managed version control with GitHub and generated detailed operational reports."
      ],
      tools: ["ODOO v8", "Java 7/8", "JavaEE v8", "SOAP", "QWeb", "GitHub"]
    }
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
