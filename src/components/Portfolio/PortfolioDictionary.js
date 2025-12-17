import Caseform1 from "../../img/caseform_1.png";
import Caseform2 from "../../img/caseform_2.png";
import Caseform3 from "../../img/caseform_3.png";
import Caseform4 from "../../img/caseform_4.png";
import Andean1 from "../../img/andean_1.png";
import Andean2 from "../../img/andean_2.png";
import Andean3 from "../../img/andean_3.png";
import Andean4 from "../../img/andean_4.png";
import Andean5 from "../../img/andean_5.png";
import Incalpaca1 from "../../img/incalpaca_1.png";
import Incalpaca2 from "../../img/incalpaca_2.png";
import Incalpaca3 from "../../img/incalpaca_3.png";
import Incalpaca4 from "../../img/incalpaca_4.png";
import Incalpaca5 from "../../img/incalpaca_5.png";
import Remasur1 from "../../img/remasur_1.png";
import Remasur2 from "../../img/remasur_2.png";
import Remasur3 from "../../img/remasur_3.png";
import Remasur4 from "../../img/remasur_4.png";
import Remasur5 from "../../img/remasur_5.png";
import Scraping1 from "../../img/scraping_1.png";
import Scraping2 from "../../img/scraping_2.png";
import Scraping3 from "../../img/scraping_3.png";
import Scraping4 from "../../img/scraping_4.png";
import Scraping5 from "../../img/scraping_5.png";

const portfolioDict = [
  {
    name: "Advanced Web Scraping",
    specifications: [
      "Data extraction from US betting platforms like FanDuel and Caesars.",
      "Real estate data mining from sources like Realtor.com and Homes.com.",
      "Retrieving public government records and datasets.",
      "Bypassing complex anti-bot protections including CAPTCHA, WAFs, and behavioral detection."
    ],
    images: [
      { img: Scraping1 },
      { img: Scraping2 },
      { img: Scraping3 },
      { img: Scraping4 },
      { img: Scraping5 }
    ]
  },
  {
    name: "Caseform in Nubedian",
    specifications: [
      "Developed a comprehensive system connecting patients with hospitals, nursing homes, and rehabilitation centers across Germany.",
      "Adapted and deployed the platform for the Peruvian Ministry of Health to manage critical ICU bed availability.",
      "Engineered secure full-stack solutions ensuring data privacy and high availability."
    ],
    images: [
      { img: Caseform1 },
      { img: Caseform2 },
      { img: Caseform3 },
      { img: Caseform4 }
    ]
  },
  {
    name: "Andean - E-Commerce",
    specifications: [
      "Built a specialized e-commerce platform for high-end alpaca fiber clothing.",
      "Implemented robust user management and authentication workflows using Django.",
      "Integrated secure payment processing with SumUp for seamless credit card transactions.",
      "Delivered end-to-end full-stack development, optimizing both UI/UX and backend performance."
    ],
    images: [
      { img: Andean1 },
      { img: Andean2 },
      { img: Andean3 },
      { img: Andean4 },
      { img: Andean5 }
    ]
  },
  {
    name: "Incalpaca International Store",
    specifications: [
      "Developed a bilingual (English/Spanish) e-commerce solution for a premium global brand.",
      "Architected a scalable Django backend to handle complex inventory and user data.",
      "Integrated custom payment gateways and checkout flows using SumUp.",
      "Led full-stack development efforts to ensure a responsive and premium user experience."
    ],
    images: [
      { img: Incalpaca1 },
      { img: Incalpaca2 },
      { img: Incalpaca3 },
      { img: Incalpaca4 },
      { img: Incalpaca5 }
    ]
  },
  {
    name: "REMASUR Enterprise System",
    specifications: [
      "Built an enterprise invoicing system compliant with SUNAT (OSE) regulations for digital tax receipts.",
      "Customized Odoo v12 ERP to streamline resource planning and user management.",
      "Engineered a high-performance synchronization module connecting SAP with SQL Server for real-time data integrity."
    ],
    images: [
      { img: Remasur1 },
      { img: Remasur2 },
      { img: Remasur3 },
      { img: Remasur4 },
      { img: Remasur5 }
    ]
  }
];

export default portfolioDict;