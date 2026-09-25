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

// Portfolio entries.
// - `images`: projects with public screenshots, shown as featured cards with a gallery.
// - `cover`: projects without screenshots (confidential or research) get a generated
//   illustration (see CoverArt.jsx) and are shown as case studies.
// - `categories`: ids of the filter chips; labels live in i18n/ui.js as `cat.<id>`.
// - `period`: [fromYear, toYear] — `null` means "present"; a single year is [year].
// - Text fields are { en, es, pt } objects resolved with `tr()`.

export const categories = ["backend", "data", "ecommerce", "erp", "automation"];

const portfolioDict = [
  {
    name: { en: "Caseform — Healthcare Coordination", es: "Caseform — Coordinación en Salud", pt: "Caseform — Coordenação em Saúde" },
    company: "Infobox (Nubedian)",
    country: "DE",
    period: [2021, 2022],
    categories: ["backend"],
    summary: {
      en: "A platform connecting patients with hospitals, nursing homes and rehabilitation centers across Germany — later adapted for Peru's Ministry of Health to manage critical ICU bed availability.",
      es: "Una plataforma que conecta pacientes con hospitales, residencias y centros de rehabilitación en toda Alemania — luego adaptada para que el Ministerio de Salud del Perú gestione la disponibilidad de camas UCI.",
      pt: "Uma plataforma que conecta pacientes a hospitais, casas de repouso e centros de reabilitação em toda a Alemanha — depois adaptada para o Ministério da Saúde do Peru gerenciar a disponibilidade de leitos de UTI."
    },
    specifications: [
      {
        en: "Backend services and business modules with Java 13, Spring Boot and MariaDB, following a modular, maintainable design.",
        es: "Servicios backend y módulos de negocio con Java 13, Spring Boot y MariaDB, con un diseño modular y mantenible.",
        pt: "Serviços backend e módulos de negócio com Java 13, Spring Boot e MariaDB, com um design modular e manutenível."
      },
      {
        en: "Frontend workflows and interfaces with React and Material UI, integrated with REST services.",
        es: "Flujos e interfaces con React y Material UI, integrados con servicios REST.",
        pt: "Fluxos e interfaces com React e Material UI, integrados a serviços REST."
      },
      {
        en: "Adapted and deployed the platform for a national public-health use case: ICU bed availability in Peru.",
        es: "Adaptación y despliegue de la plataforma para un caso de salud pública nacional: la disponibilidad de camas UCI en el Perú.",
        pt: "Adaptação e implantação da plataforma para um caso de saúde pública nacional: a disponibilidade de leitos de UTI no Peru."
      },
      {
        en: "Containerized with Docker and delivered through GitLab CI/CD, with a strong focus on data privacy and availability.",
        es: "Contenerizada con Docker y entregada con GitLab CI/CD, con fuerte foco en privacidad de datos y disponibilidad.",
        pt: "Conteinerizada com Docker e entregue via GitLab CI/CD, com forte foco em privacidade de dados e disponibilidade."
      }
    ],
    tools: ["Java 13", "Spring Boot", "React", "Material UI", "MariaDB", "Docker", "GitLab CI/CD"],
    images: [
      { img: Caseform1 },
      { img: Caseform2 },
      { img: Caseform3 },
      { img: Caseform4 }
    ]
  },
  {
    name: { en: "Advanced Web Scraping", es: "Web Scraping Avanzado", pt: "Web Scraping Avançado" },
    categories: ["automation", "data"],
    summary: {
      en: "Large-scale data extraction pipelines for sports-betting platforms, real-estate listings and public government datasets.",
      es: "Pipelines de extracción de datos a gran escala para plataformas de apuestas deportivas, listados inmobiliarios y datos públicos de gobierno.",
      pt: "Pipelines de extração de dados em larga escala para plataformas de apostas esportivas, anúncios imobiliários e dados públicos de governo."
    },
    specifications: [
      {
        en: "Data extraction from US betting platforms like FanDuel and Caesars.",
        es: "Extracción de datos de plataformas de apuestas de EE. UU. como FanDuel y Caesars.",
        pt: "Extração de dados de plataformas de apostas dos EUA como FanDuel e Caesars."
      },
      {
        en: "Real estate data mining from sources like Realtor.com and Homes.com.",
        es: "Minería de datos inmobiliarios de fuentes como Realtor.com y Homes.com.",
        pt: "Mineração de dados imobiliários de fontes como Realtor.com e Homes.com."
      },
      {
        en: "Retrieval of public government records and datasets.",
        es: "Obtención de registros y conjuntos de datos públicos de gobierno.",
        pt: "Obtenção de registros e conjuntos de dados públicos de governo."
      },
      {
        en: "Bypassing complex anti-bot protections including CAPTCHA, WAFs and behavioral detection.",
        es: "Sorteo de protecciones anti-bot complejas como CAPTCHA, WAFs y detección de comportamiento.",
        pt: "Contorno de proteções anti-bot complexas como CAPTCHA, WAFs e detecção comportamental."
      }
    ],
    tools: ["Web scraping", "Automation", "Anti-bot", "Data pipelines"],
    images: [
      { img: Scraping1 },
      { img: Scraping2 },
      { img: Scraping3 },
      { img: Scraping4 },
      { img: Scraping5 }
    ]
  },
  {
    name: { en: "REMASUR Enterprise System", es: "Sistema Empresarial REMASUR", pt: "Sistema Empresarial REMASUR" },
    country: "PE",
    categories: ["erp"],
    summary: {
      en: "Enterprise invoicing compliant with SUNAT (OSE) regulations for digital tax receipts, on a customized Odoo ERP.",
      es: "Facturación empresarial conforme a la normativa de la SUNAT (OSE) para comprobantes electrónicos, sobre un ERP Odoo personalizado.",
      pt: "Faturamento corporativo em conformidade com as normas da SUNAT (OSE) para comprovantes eletrônicos, sobre um ERP Odoo personalizado."
    },
    specifications: [
      {
        en: "Built an enterprise invoicing system compliant with SUNAT (OSE) regulations for digital tax receipts.",
        es: "Construí un sistema de facturación empresarial conforme a la normativa de la SUNAT (OSE) para comprobantes electrónicos.",
        pt: "Construí um sistema de faturamento corporativo em conformidade com as normas da SUNAT (OSE) para comprovantes eletrônicos."
      },
      {
        en: "Customized Odoo v12 ERP to streamline resource planning and user management.",
        es: "Personalicé el ERP Odoo v12 para optimizar la planificación de recursos y la gestión de usuarios.",
        pt: "Personalizei o ERP Odoo v12 para otimizar o planejamento de recursos e a gestão de usuários."
      },
      {
        en: "Engineered a high-performance synchronization module connecting SAP with SQL Server for real-time data integrity.",
        es: "Desarrollé un módulo de sincronización de alto rendimiento entre SAP y SQL Server para mantener la integridad de los datos en tiempo real.",
        pt: "Desenvolvi um módulo de sincronização de alto desempenho entre SAP e SQL Server para manter a integridade dos dados em tempo real."
      }
    ],
    tools: ["Odoo v12", "Python", "SAP", "SQL Server", "SUNAT OSE"],
    images: [
      { img: Remasur1 },
      { img: Remasur2 },
      { img: Remasur3 },
      { img: Remasur4 },
      { img: Remasur5 }
    ]
  },
  {
    name: { en: "Incalpaca International Store", es: "Tienda Internacional Incalpaca", pt: "Loja Internacional Incalpaca" },
    country: "PE",
    categories: ["ecommerce"],
    summary: {
      en: "A bilingual (English / Spanish) e-commerce solution for a premium global alpaca brand.",
      es: "Una solución de e-commerce bilingüe (inglés / español) para una marca global premium de alpaca.",
      pt: "Uma solução de e-commerce bilíngue (inglês / espanhol) para uma marca global premium de alpaca."
    },
    specifications: [
      {
        en: "Architected a scalable Django backend to handle complex inventory and user data.",
        es: "Diseñé un backend escalable en Django para manejar inventario y datos de usuarios complejos.",
        pt: "Projetei um backend escalável em Django para lidar com inventário e dados de usuários complexos."
      },
      {
        en: "Integrated custom payment gateways and checkout flows using SumUp.",
        es: "Integré pasarelas de pago y flujos de checkout personalizados con SumUp.",
        pt: "Integrei gateways de pagamento e fluxos de checkout personalizados com SumUp."
      },
      {
        en: "Led full-stack development to deliver a responsive, premium user experience.",
        es: "Lideré el desarrollo full-stack para ofrecer una experiencia de usuario responsive y premium.",
        pt: "Liderei o desenvolvimento full-stack para entregar uma experiência de usuário responsiva e premium."
      }
    ],
    tools: ["Django", "Python", "i18n (EN/ES)", "SumUp"],
    images: [
      { img: Incalpaca1 },
      { img: Incalpaca2 },
      { img: Incalpaca3 },
      { img: Incalpaca4 },
      { img: Incalpaca5 }
    ]
  },
  {
    name: { en: "Andean — Alpaca Fashion E-commerce", es: "Andean — E-commerce de Moda en Alpaca", pt: "Andean — E-commerce de Moda em Alpaca" },
    country: "PE",
    categories: ["ecommerce"],
    summary: {
      en: "A specialized online store for high-end alpaca fiber clothing, built end to end.",
      es: "Una tienda online especializada en prendas de fibra de alpaca de alta gama, construida de punta a punta.",
      pt: "Uma loja online especializada em roupas de fibra de alpaca de alto padrão, construída de ponta a ponta."
    },
    specifications: [
      {
        en: "Implemented robust user management and authentication workflows with Django.",
        es: "Implementé flujos robustos de gestión de usuarios y autenticación con Django.",
        pt: "Implementei fluxos robustos de gestão de usuários e autenticação com Django."
      },
      {
        en: "Integrated secure card payments through SumUp.",
        es: "Integré pagos seguros con tarjeta mediante SumUp.",
        pt: "Integrei pagamentos seguros com cartão via SumUp."
      },
      {
        en: "Delivered end-to-end full-stack development, optimizing both UI/UX and backend performance.",
        es: "Desarrollo full-stack de punta a punta, optimizando tanto la UI/UX como el rendimiento del backend.",
        pt: "Desenvolvimento full-stack de ponta a ponta, otimizando tanto a UI/UX quanto o desempenho do backend."
      }
    ],
    tools: ["Django", "Python", "SumUp", "UI / UX"],
    images: [
      { img: Andean1 },
      { img: Andean2 },
      { img: Andean3 },
      { img: Andean4 },
      { img: Andean5 }
    ]
  },

  // ---- Case studies (no public screenshots) ----
  {
    name: { en: "FIFA Anti-Doping Platform", es: "Plataforma Antidopaje de la FIFA", pt: "Plataforma Antidoping da FIFA" },
    company: "Coderland",
    country: "ES",
    period: [2026, null],
    confidential: true,
    cover: "services",
    categories: ["backend"],
    summary: {
      en: "Backend for a FIFA anti-doping platform, delivered end to end — architecture, APIs, security, deployment and production support.",
      es: "Backend de una plataforma antidopaje de la FIFA, entregado de punta a punta — arquitectura, APIs, seguridad, despliegue y soporte en producción.",
      pt: "Backend de uma plataforma antidoping da FIFA, entregue de ponta a ponta — arquitetura, APIs, segurança, deploy e suporte em produção."
    },
    specifications: [
      {
        en: "Around four Java 21 / Spring Boot microservices per project, with owned API contracts.",
        es: "Alrededor de cuatro microservicios Java 21 / Spring Boot por proyecto, con contratos de API propios.",
        pt: "Cerca de quatro microsserviços Java 21 / Spring Boot por projeto, com contratos de API próprios."
      },
      {
        en: "CSRF protection, session management and secure auth integrated with FIFA's login ecosystem.",
        es: "Protección CSRF, gestión de sesiones y autenticación segura integrada con el ecosistema de login de la FIFA.",
        pt: "Proteção CSRF, gerenciamento de sessões e autenticação segura integrada ao ecossistema de login da FIFA."
      },
      {
        en: "Redis caching, PostgreSQL data models and integrations with Jira and Jumio.",
        es: "Caché con Redis, modelos de datos en PostgreSQL e integraciones con Jira y Jumio.",
        pt: "Cache com Redis, modelos de dados em PostgreSQL e integrações com Jira e Jumio."
      },
      {
        en: "Docker, CI/CD and cloud deployments on AWS and Azure.",
        es: "Docker, CI/CD y despliegues en la nube con AWS y Azure.",
        pt: "Docker, CI/CD e deploys em nuvem na AWS e Azure."
      }
    ],
    tools: ["Java 21", "Spring Boot", "PostgreSQL", "Redis", "AWS", "Azure", "Docker"]
  },
  {
    name: { en: "Banking Microservices Modernization", es: "Modernización de Microservicios Bancarios", pt: "Modernização de Microsserviços Bancários" },
    company: "Zoluxiones · Scotiabank Chile",
    country: "CL",
    period: [2022, 2023],
    confidential: true,
    cover: "shield",
    categories: ["backend"],
    summary: {
      en: "Development and modernization of enterprise financial microservices in a regulated banking environment.",
      es: "Desarrollo y modernización de microservicios financieros empresariales en un entorno bancario regulado.",
      pt: "Desenvolvimento e modernização de microsserviços financeiros corporativos em um ambiente bancário regulado."
    },
    specifications: [
      {
        en: "Secure, interoperable REST APIs with Java and Spring Boot.",
        es: "APIs REST seguras e interoperables con Java y Spring Boot.",
        pt: "APIs REST seguras e interoperáveis com Java e Spring Boot."
      },
      {
        en: "Enterprise interfaces with React and TypeScript.",
        es: "Interfaces empresariales con React y TypeScript.",
        pt: "Interfaces corporativas com React e TypeScript."
      },
      {
        en: "Standards for API versioning, documentation, CI/CD and testing.",
        es: "Estándares de versionado de APIs, documentación, CI/CD y pruebas.",
        pt: "Padrões de versionamento de APIs, documentação, CI/CD e testes."
      }
    ],
    tools: ["Java", "Spring Boot", "React", "TypeScript", "Swagger / OpenAPI", "Docker"]
  },
  {
    name: { en: "Enterprise Retail-Tech Applications", es: "Aplicaciones Empresariales Retail-Tech", pt: "Aplicações Corporativas de Retail-Tech" },
    company: "Scanntech",
    country: "UY",
    period: [2023, 2026],
    confidential: true,
    cover: "dashboard",
    categories: ["backend"],
    summary: {
      en: "Microservices-based enterprise applications across backend and frontend, from architecture to production.",
      es: "Aplicaciones empresariales basadas en microservicios, en backend y frontend, desde la arquitectura hasta producción.",
      pt: "Aplicações corporativas baseadas em microsserviços, no backend e no frontend, da arquitetura à produção."
    },
    specifications: [
      {
        en: "REST APIs, authentication flows, caching and modular components built for scale.",
        es: "APIs REST, flujos de autenticación, caché y componentes modulares pensados para escalar.",
        pt: "APIs REST, fluxos de autenticação, cache e componentes modulares pensados para escalar."
      },
      {
        en: "GitLab CI/CD pipelines and Docker containerization.",
        es: "Pipelines de CI/CD con GitLab y contenerización con Docker.",
        pt: "Pipelines de CI/CD com GitLab e conteinerização com Docker."
      },
      {
        en: "Mentoring, code reviews and architecture decisions in Agile teams.",
        es: "Mentoría, revisiones de código y decisiones de arquitectura en equipos ágiles.",
        pt: "Mentoria, revisões de código e decisões de arquitetura em times ágeis."
      }
    ],
    tools: ["Java", "Spring Boot", "Hibernate", "Angular", "TypeScript", "GitLab CI/CD"]
  },
  {
    name: { en: "Electronic Invoicing: SAP ↔ SUNAT", es: "Facturación Electrónica: SAP ↔ SUNAT", pt: "Faturamento Eletrônico: SAP ↔ SUNAT" },
    company: "ANFA",
    country: "PE",
    period: [2020, 2021],
    cover: "invoice",
    categories: ["erp"],
    summary: {
      en: "Automated electronic invoicing connecting SAP Business One with SUNAT, Peru's tax authority.",
      es: "Facturación electrónica automatizada que conecta SAP Business One con la SUNAT, la autoridad tributaria del Perú.",
      pt: "Faturamento eletrônico automatizado conectando o SAP Business One à SUNAT, a autoridade tributária do Peru."
    },
    specifications: [
      {
        en: "RESTful integration between SAP Business One and SUNAT.",
        es: "Integración RESTful entre SAP Business One y la SUNAT.",
        pt: "Integração RESTful entre o SAP Business One e a SUNAT."
      },
      {
        en: "Business logic in Python and Odoo on PostgreSQL.",
        es: "Lógica de negocio en Python y Odoo sobre PostgreSQL.",
        pt: "Lógica de negócio em Python e Odoo sobre PostgreSQL."
      }
    ],
    tools: ["Python", "Odoo", "PostgreSQL", "SAP Business One", "REST"]
  },
  {
    name: { en: "Spatio-Temporal Anomaly Detection", es: "Detección de Anomalías Espacio-Temporales", pt: "Detecção de Anomalias Espaço-Temporais" },
    company: "Fundação Getulio Vargas",
    country: "BR",
    period: [2019, 2020],
    cover: "anomaly",
    categories: ["data"],
    summary: {
      en: "Interactive visualization for detecting anomalies in spatio-temporal traffic data, using statistical data-depth methods.",
      es: "Visualización interactiva para detectar anomalías en datos de tráfico espacio-temporales, usando métodos estadísticos de profundidad de datos.",
      pt: "Visualização interativa para detectar anomalias em dados de tráfego espaço-temporais, usando métodos estatísticos de profundidade de dados."
    },
    specifications: [
      {
        en: "Anomaly detection models based on statistical data depth.",
        es: "Modelos de detección de anomalías basados en profundidad estadística de datos.",
        pt: "Modelos de detecção de anomalias baseados em profundidade estatística de dados."
      },
      {
        en: "Map-based and exploratory visualizations with React, D3.js and Deck.gl.",
        es: "Visualizaciones exploratorias y sobre mapas con React, D3.js y Deck.gl.",
        pt: "Visualizações exploratórias e em mapas com React, D3.js e Deck.gl."
      },
      {
        en: "Data workflows with pandas and NumPy, served through Django REST Framework.",
        es: "Flujos de datos con pandas y NumPy, servidos mediante Django REST Framework.",
        pt: "Fluxos de dados com pandas e NumPy, servidos via Django REST Framework."
      }
    ],
    tools: ["Python", "pandas", "NumPy", "Django REST", "React", "D3.js", "Deck.gl"]
  },
  {
    name: { en: "Biomass Monitoring in the Peruvian Highlands", es: "Monitoreo de Biomasa en los Andes Peruanos", pt: "Monitoramento de Biomassa nos Andes Peruanos" },
    country: "PE",
    cover: "satellite",
    categories: ["data"],
    summary: {
      en: "Research on detecting biomass from satellite and drone imagery using NDVI analysis.",
      es: "Investigación sobre la detección de biomasa a partir de imágenes satelitales y de drones mediante análisis NDVI.",
      pt: "Pesquisa sobre a detecção de biomassa a partir de imagens de satélite e de drones usando análise NDVI."
    },
    specifications: [
      {
        en: "NDVI analysis over satellite and drone imagery.",
        es: "Análisis NDVI sobre imágenes satelitales y de drones.",
        pt: "Análise NDVI sobre imagens de satélite e de drones."
      },
      {
        en: "Image segmentation and neural-network-based classification.",
        es: "Segmentación de imágenes y clasificación con redes neuronales.",
        pt: "Segmentação de imagens e classificação com redes neurais."
      }
    ],
    tools: ["Remote sensing", "NDVI", "Image segmentation", "Neural networks"]
  },
  {
    name: { en: "E-commerce & Investment Platforms", es: "Plataformas de E-commerce e Inversión", pt: "Plataformas de E-commerce e Investimento" },
    company: "InkaLabs",
    country: "PE",
    period: [2020],
    cover: "commerce",
    categories: ["ecommerce"],
    summary: {
      en: "Web platforms for online sales and investment tracking, delivered with Scrum.",
      es: "Plataformas web para ventas en línea y seguimiento de inversiones, entregadas con Scrum.",
      pt: "Plataformas web para vendas online e acompanhamento de investimentos, entregues com Scrum."
    },
    specifications: [
      {
        en: "Online sales system with an integrated payment gateway.",
        es: "Sistema de ventas en línea con pasarela de pagos integrada.",
        pt: "Sistema de vendas online com gateway de pagamento integrado."
      },
      {
        en: "Investment control module; APIs with REST and GraphQL.",
        es: "Módulo de control de inversiones; APIs con REST y GraphQL.",
        pt: "Módulo de controle de investimentos; APIs com REST e GraphQL."
      }
    ],
    tools: ["Django", "Django REST", "React", "TypeScript", "GraphQL"]
  }
];

export default portfolioDict;
