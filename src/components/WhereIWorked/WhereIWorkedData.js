// `country` is an ISO 3166-1 alpha-2 code rendered as a flag (see Flag.jsx).
// `from` / `to` are "YYYY-MM" (or "present"): they are formatted per language
// and used to compute the duration.
// Text fields are { en, es, pt } objects resolved with `tr()` (see i18n/LanguageContext).
const workInfoDict = [
    {
        company: "Coderland (FIFA)",
        position: {
            en: "Senior Backend Developer",
            es: "Desarrollador Backend Senior",
            pt: "Desenvolvedor Backend Sênior"
        },
        place: { en: "Spain · Remote", es: "España · Remoto", pt: "Espanha · Remoto" },
        country: "ES",
        from: "2026-06",
        to: "present",
        summary: {
            en: "Backend engineering for a FIFA anti-doping platform, delivered end to end — from technical analysis to production support.",
            es: "Ingeniería backend para una plataforma antidopaje de la FIFA, entregada de punta a punta — desde el análisis técnico hasta el soporte en producción.",
            pt: "Engenharia backend para uma plataforma antidoping da FIFA, entregue de ponta a ponta — da análise técnica ao suporte em produção."
        },
        specifications: [
            {
                en: "Design and implement scalable backend services with Java 21 and Spring Boot, following a microservices architecture, Clean Code and SOLID principles.",
                es: "Diseño e implemento servicios backend escalables con Java 21 y Spring Boot, siguiendo una arquitectura de microservicios, Clean Code y principios SOLID.",
                pt: "Projeto e implemento serviços backend escaláveis com Java 21 e Spring Boot, seguindo uma arquitetura de microsserviços, Clean Code e princípios SOLID."
            },
            {
                en: "Own REST APIs end to end: API contracts, business logic, database interactions, integrations, testing and production deployment.",
                es: "Soy responsable de APIs REST de punta a punta: contratos, lógica de negocio, acceso a base de datos, integraciones, pruebas y despliegue en producción.",
                pt: "Sou responsável por APIs REST de ponta a ponta: contratos, lógica de negócio, acesso ao banco de dados, integrações, testes e deploy em produção."
            },
            {
                en: "Develop and maintain around four microservices per project, focused on maintainability, reliability, security and efficient communication between services.",
                es: "Desarrollo y mantengo alrededor de cuatro microservicios por proyecto, enfocados en mantenibilidad, confiabilidad, seguridad y comunicación eficiente entre servicios.",
                pt: "Desenvolvo e mantenho cerca de quatro microsserviços por projeto, com foco em manutenibilidade, confiabilidade, segurança e comunicação eficiente entre serviços."
            },
            {
                en: "Implement security mechanisms including CSRF protection, session management and secure authentication flows integrated with FIFA's login ecosystem.",
                es: "Implemento mecanismos de seguridad como protección CSRF, gestión de sesiones y flujos de autenticación seguros integrados con el ecosistema de login de la FIFA.",
                pt: "Implemento mecanismos de segurança como proteção CSRF, gerenciamento de sessões e fluxos de autenticação seguros integrados ao ecossistema de login da FIFA."
            },
            {
                en: "Use Redis for caching and session handling, and design data models and queries on PostgreSQL.",
                es: "Uso Redis para caché y manejo de sesiones, y diseño modelos de datos y consultas en PostgreSQL.",
                pt: "Uso Redis para cache e gerenciamento de sessões, e projeto modelos de dados e consultas em PostgreSQL."
            },
            {
                en: "Integrate services with external platforms such as Jira and Jumio.",
                es: "Integro servicios con plataformas externas como Jira y Jumio.",
                pt: "Integro serviços com plataformas externas como Jira e Jumio."
            },
            {
                en: "Containerize services with Docker and take part in CI/CD and cloud deployments on AWS and Azure (EC2), writing automated tests, reviewing code and resolving production incidents.",
                es: "Contenerizo servicios con Docker y participo en CI/CD y despliegues en la nube con AWS y Azure (EC2), escribiendo pruebas automatizadas, revisando código y resolviendo incidentes en producción.",
                pt: "Conteinerizo serviços com Docker e participo de CI/CD e deploys em nuvem na AWS e Azure (EC2), escrevendo testes automatizados, revisando código e resolvendo incidentes em produção."
            }
        ],
        tools: ["Java 21", "Spring Boot", "Microservices", "REST APIs", "PostgreSQL", "Redis", "AWS", "Azure", "EC2", "Docker", "CI/CD", "Jira", "Jumio", "Git"]
    },
    {
        company: "Scanntech",
        position: {
            en: "Full-Stack Developer (Java / Angular)",
            es: "Desarrollador Full-Stack (Java / Angular)",
            pt: "Desenvolvedor Full-Stack (Java / Angular)"
        },
        place: { en: "Montevideo, Uruguay", es: "Montevideo, Uruguay", pt: "Montevidéu, Uruguai" },
        country: "UY",
        from: "2023-04",
        to: "2026-06",
        summary: {
            en: "Microservices-based enterprise applications built with Java, Spring Boot and Angular, from architecture to production.",
            es: "Aplicaciones empresariales basadas en microservicios con Java, Spring Boot y Angular, desde la arquitectura hasta producción.",
            pt: "Aplicações corporativas baseadas em microsserviços com Java, Spring Boot e Angular, da arquitetura à produção."
        },
        specifications: [
            {
                en: "Designed and implemented microservices-based enterprise applications, contributing to architectural decisions across backend and frontend layers.",
                es: "Diseñé e implementé aplicaciones empresariales basadas en microservicios, contribuyendo a decisiones de arquitectura en backend y frontend.",
                pt: "Projetei e implementei aplicações corporativas baseadas em microsserviços, contribuindo para decisões de arquitetura no backend e no frontend."
            },
            {
                en: "Developed and optimized REST APIs, authentication flows, caching mechanisms and modular components focused on scalability, maintainability and performance.",
                es: "Desarrollé y optimicé APIs REST, flujos de autenticación, mecanismos de caché y componentes modulares enfocados en escalabilidad, mantenibilidad y rendimiento.",
                pt: "Desenvolvi e otimizei APIs REST, fluxos de autenticação, mecanismos de cache e componentes modulares com foco em escalabilidade, manutenibilidade e desempenho."
            },
            {
                en: "Collaborated with product, UX, QA and DevOps teams through the whole lifecycle — technical analysis, solution design, deployment and production support — designing interfaces in Figma.",
                es: "Colaboré con equipos de producto, UX, QA y DevOps en todo el ciclo de vida — análisis técnico, diseño de soluciones, despliegue y soporte en producción — diseñando interfaces en Figma.",
                pt: "Colaborei com times de produto, UX, QA e DevOps em todo o ciclo de vida — análise técnica, desenho de soluções, deploy e suporte em produção — criando interfaces no Figma."
            },
            {
                en: "Established and maintained CI/CD pipelines with GitLab and containerized services with Docker, improving deployment consistency and reliability.",
                es: "Implementé y mantuve pipelines de CI/CD con GitLab y contenericé servicios con Docker, mejorando la consistencia y confiabilidad de los despliegues.",
                pt: "Implantei e mantive pipelines de CI/CD com GitLab e conteinerizei serviços com Docker, melhorando a consistência e a confiabilidade dos deploys."
            },
            {
                en: "Applied Clean Code, code reviews, automated testing and modular design.",
                es: "Apliqué Clean Code, revisiones de código, pruebas automatizadas y diseño modular.",
                pt: "Apliquei Clean Code, revisões de código, testes automatizados e design modular."
            },
            {
                en: "Mentored developers and took part in technical decision-making, architecture discussions and Agile/Scrum ceremonies.",
                es: "Mentoreé a desarrolladores y participé en decisiones técnicas, discusiones de arquitectura y ceremonias Agile/Scrum.",
                pt: "Fui mentor de desenvolvedores e participei de decisões técnicas, discussões de arquitetura e cerimônias Agile/Scrum."
            }
        ],
        tools: ["Java", "Spring Boot", "Hibernate", "Angular", "TypeScript", "REST", "Microservices", "Docker", "GitLab CI/CD", "SQL", "Postman", "Figma", "Scrum"]
    },
    {
        company: "Zoluxiones (Scotiabank)",
        position: {
            en: "Semi-Senior Full-Stack Developer (Java / React)",
            es: "Desarrollador Full-Stack Semi-Senior (Java / React)",
            pt: "Desenvolvedor Full-Stack Pleno (Java / React)"
        },
        place: { en: "Santiago, Chile", es: "Santiago, Chile", pt: "Santiago, Chile" },
        country: "CL",
        from: "2022-02",
        to: "2023-04",
        summary: {
            en: "Enterprise financial microservices for Scotiabank Chile in a regulated banking environment.",
            es: "Microservicios financieros empresariales para Scotiabank Chile en un entorno bancario regulado.",
            pt: "Microsserviços financeiros corporativos para o Scotiabank Chile em um ambiente bancário regulado."
        },
        specifications: [
            {
                en: "Developed and modernized financial microservices for Scotiabank Chile, focusing on security, interoperability, maintainability and performance.",
                es: "Desarrollé y modernicé microservicios financieros para Scotiabank Chile, con foco en seguridad, interoperabilidad, mantenibilidad y rendimiento.",
                pt: "Desenvolvi e modernizei microsserviços financeiros para o Scotiabank Chile, com foco em segurança, interoperabilidade, manutenibilidade e desempenho."
            },
            {
                en: "Designed and implemented REST APIs with Java and Spring Boot, and built interactive enterprise interfaces with React and TypeScript.",
                es: "Diseñé e implementé APIs REST con Java y Spring Boot, y construí interfaces empresariales interactivas con React y TypeScript.",
                pt: "Projetei e implementei APIs REST com Java e Spring Boot, e construí interfaces corporativas interativas com React e TypeScript."
            },
            {
                en: "Helped define technical standards for API versioning, documentation, CI/CD, testing and development practices.",
                es: "Ayudé a definir estándares técnicos de versionado de APIs, documentación, CI/CD, pruebas y prácticas de desarrollo.",
                pt: "Ajudei a definir padrões técnicos de versionamento de APIs, documentação, CI/CD, testes e práticas de desenvolvimento."
            },
            {
                en: "Worked closely with software architects, QA engineers, developers and business stakeholders to deliver solutions aligned with technical and business requirements.",
                es: "Trabajé de cerca con arquitectos de software, ingenieros de QA, desarrolladores y áreas de negocio para entregar soluciones alineadas con los requisitos técnicos y de negocio.",
                pt: "Trabalhei próximo a arquitetos de software, engenheiros de QA, desenvolvedores e áreas de negócio para entregar soluções alinhadas aos requisitos técnicos e de negócio."
            },
            {
                en: "Took part in Agile/Scrum processes: technical analysis, estimation, development, code reviews, testing, deployment and production support.",
                es: "Participé en procesos Agile/Scrum: análisis técnico, estimación, desarrollo, revisiones de código, pruebas, despliegue y soporte en producción.",
                pt: "Participei de processos Agile/Scrum: análise técnica, estimativas, desenvolvimento, revisões de código, testes, deploy e suporte em produção."
            }
        ],
        tools: ["Java", "Spring Boot", "React", "TypeScript", "REST", "Microservices", "Docker", "Swagger / OpenAPI", "JIRA", "Postman", "Scrum"]
    },
    {
        company: "Infobox (Nubedian)",
        position: {
            en: "Full-Stack Developer (Java / React)",
            es: "Desarrollador Full-Stack (Java / React)",
            pt: "Desenvolvedor Full-Stack (Java / React)"
        },
        place: { en: "Karlsruhe, Germany", es: "Karlsruhe, Alemania", pt: "Karlsruhe, Alemanha" },
        country: "DE",
        from: "2021-02",
        to: "2022-02",
        summary: {
            en: "Healthcare integrations in Germany and an ICU management platform for the Peruvian Ministry of Health.",
            es: "Integraciones para el sector salud en Alemania y una plataforma de gestión de UCI para el Ministerio de Salud del Perú.",
            pt: "Integrações para a área da saúde na Alemanha e uma plataforma de gestão de UTI para o Ministério da Saúde do Peru."
        },
        specifications: [
            {
                en: "Developed software integration solutions for healthcare institutions in Germany and ICU management platforms for the Peruvian Ministry of Health.",
                es: "Desarrollé soluciones de integración de software para instituciones de salud en Alemania y plataformas de gestión de UCI para el Ministerio de Salud del Perú.",
                pt: "Desenvolvi soluções de integração de software para instituições de saúde na Alemanha e plataformas de gestão de UTI para o Ministério da Saúde do Peru."
            },
            {
                en: "Implemented backend services and business modules with Java 13, Spring Boot and MariaDB, following modular and maintainable design practices.",
                es: "Implementé servicios backend y módulos de negocio con Java 13, Spring Boot y MariaDB, siguiendo prácticas de diseño modular y mantenible.",
                pt: "Implementei serviços backend e módulos de negócio com Java 13, Spring Boot e MariaDB, seguindo práticas de design modular e manutenível."
            },
            {
                en: "Built frontend workflows and user interfaces with React and Material UI, integrated with backend REST services.",
                es: "Construí flujos e interfaces de usuario con React y Material UI, integrados con servicios REST del backend.",
                pt: "Construí fluxos e interfaces de usuário com React e Material UI, integrados aos serviços REST do backend."
            },
            {
                en: "Containerized services with Docker and supported automated deployment workflows with GitLab CI/CD.",
                es: "Contenericé servicios con Docker y di soporte a flujos de despliegue automatizados con GitLab CI/CD.",
                pt: "Conteinerizei serviços com Docker e apoiei fluxos de deploy automatizados com GitLab CI/CD."
            },
            {
                en: "Developed and tested REST APIs and integrations with Postman, contributing to the complete delivery lifecycle.",
                es: "Desarrollé y probé APIs REST e integraciones con Postman, contribuyendo a todo el ciclo de entrega.",
                pt: "Desenvolvi e testei APIs REST e integrações com Postman, contribuindo para todo o ciclo de entrega."
            }
        ],
        tools: ["Java 13", "Spring Boot", "React", "Material UI", "MariaDB", "Docker", "GitLab CI/CD", "REST", "Postman"]
    },
    {
        company: "ANFA",
        position: {
            en: "Python Full-Stack Developer",
            es: "Desarrollador Full-Stack Python",
            pt: "Desenvolvedor Full-Stack Python"
        },
        place: { en: "Arequipa, Peru", es: "Arequipa, Perú", pt: "Arequipa, Peru" },
        country: "PE",
        from: "2020-10",
        to: "2021-02",
        summary: {
            en: "Automated electronic invoicing connecting SAP Business One with SUNAT, Peru's tax authority.",
            es: "Facturación electrónica automatizada que conecta SAP Business One con la SUNAT, la autoridad tributaria del Perú.",
            pt: "Faturamento eletrônico automatizado conectando o SAP Business One à SUNAT, a autoridade tributária do Peru."
        },
        specifications: [
            {
                en: "Developed an automated electronic invoicing solution integrating SAP Business One with SUNAT through RESTful APIs.",
                es: "Desarrollé una solución de facturación electrónica automatizada que integra SAP Business One con la SUNAT mediante APIs RESTful.",
                pt: "Desenvolvi uma solução de faturamento eletrônico automatizado integrando o SAP Business One à SUNAT por meio de APIs RESTful."
            },
            {
                en: "Implemented backend business logic and integrations with Python and Odoo, using PostgreSQL as the primary database.",
                es: "Implementé la lógica de negocio y las integraciones con Python y Odoo, usando PostgreSQL como base de datos principal.",
                pt: "Implementei a lógica de negócio e as integrações com Python e Odoo, usando PostgreSQL como banco de dados principal."
            },
            {
                en: "Managed version control and collaboration with GitHub.",
                es: "Gestioné el control de versiones y la colaboración con GitHub.",
                pt: "Gerenciei o controle de versão e a colaboração com GitHub."
            }
        ],
        tools: ["Python", "Odoo v12", "QWeb", "PostgreSQL", "REST APIs", "SAP Business One", "Bootstrap"]
    },
    {
        company: "FGV",
        position: {
            en: "Data Scientist / Full-Stack Developer (Python / React)",
            es: "Científico de Datos / Desarrollador Full-Stack (Python / React)",
            pt: "Cientista de Dados / Desenvolvedor Full-Stack (Python / React)"
        },
        place: { en: "Rio de Janeiro, Brazil", es: "Río de Janeiro, Brasil", pt: "Rio de Janeiro, Brasil" },
        country: "BR",
        from: "2019-06",
        to: "2020-10",
        summary: {
            en: "Fundação Getulio Vargas — interactive data visualization for anomaly detection and exploratory analysis.",
            es: "Fundação Getulio Vargas — visualización interactiva de datos para detección de anomalías y análisis exploratorio.",
            pt: "Fundação Getulio Vargas — visualização interativa de dados para detecção de anomalias e análise exploratória."
        },
        specifications: [
            {
                en: "Designed and implemented interactive data visualization systems for detecting spatio-temporal anomalies and exploratory data analysis.",
                es: "Diseñé e implementé sistemas interactivos de visualización de datos para detectar anomalías espacio-temporales y realizar análisis exploratorio.",
                pt: "Projetei e implementei sistemas interativos de visualização de dados para detectar anomalias espaço-temporais e fazer análise exploratória."
            },
            {
                en: "Developed data processing and analysis workflows with Python, pandas, NumPy and statistical visualization libraries.",
                es: "Desarrollé flujos de procesamiento y análisis de datos con Python, pandas, NumPy y librerías de visualización estadística.",
                pt: "Desenvolvi fluxos de processamento e análise de dados com Python, pandas, NumPy e bibliotecas de visualização estatística."
            },
            {
                en: "Built interactive web interfaces with React, D3.js and Deck.gl.",
                es: "Construí interfaces web interactivas con React, D3.js y Deck.gl.",
                pt: "Construí interfaces web interativas com React, D3.js e Deck.gl."
            },
            {
                en: "Developed REST APIs and data-driven backend services with Django and Django REST Framework.",
                es: "Desarrollé APIs REST y servicios backend basados en datos con Django y Django REST Framework.",
                pt: "Desenvolvi APIs REST e serviços backend orientados a dados com Django e Django REST Framework."
            }
        ],
        tools: ["Python", "pandas", "NumPy", "Django", "Django REST Framework", "React", "D3.js", "Deck.gl", "react-map-gl", "Altair", "Plotly", "Bootstrap"]
    },
    {
        company: "InkaLabs",
        position: {
            en: "Full-Stack Developer (Python / React)",
            es: "Desarrollador Full-Stack (Python / React)",
            pt: "Desenvolvedor Full-Stack (Python / React)"
        },
        place: { en: "Arequipa, Peru", es: "Arequipa, Perú", pt: "Arequipa, Peru" },
        country: "PE",
        from: "2020-06",
        to: "2020-09",
        summary: {
            en: "Web platforms for e-commerce and investment-related applications.",
            es: "Plataformas web para e-commerce y aplicaciones de inversión.",
            pt: "Plataformas web para e-commerce e aplicações de investimento."
        },
        specifications: [
            {
                en: "Designed and developed web platforms for e-commerce and investment-related applications.",
                es: "Diseñé y desarrollé plataformas web para e-commerce y aplicaciones de inversión.",
                pt: "Projetei e desenvolvi plataformas web para e-commerce e aplicações de investimento."
            },
            {
                en: "Delivered an online sales system with an integrated payment gateway and an investment control module, following Scrum.",
                es: "Entregué un sistema de ventas en línea con pasarela de pagos integrada y un módulo de control de inversiones, siguiendo Scrum.",
                pt: "Entreguei um sistema de vendas online com gateway de pagamento integrado e um módulo de controle de investimentos, seguindo Scrum."
            },
            {
                en: "Implemented backend services with Django and Django REST Framework, and frontends with React and TypeScript.",
                es: "Implementé servicios backend con Django y Django REST Framework, y frontends con React y TypeScript.",
                pt: "Implementei serviços backend com Django e Django REST Framework, e frontends com React e TypeScript."
            },
            {
                en: "Designed API integrations and application components using REST and GraphQL.",
                es: "Diseñé integraciones de APIs y componentes de aplicación con REST y GraphQL.",
                pt: "Projetei integrações de APIs e componentes de aplicação com REST e GraphQL."
            }
        ],
        tools: ["Python", "Django", "Django REST Framework", "React", "TypeScript", "GraphQL", "REST"]
    },
    {
        company: "Art Atlas",
        position: {
            en: "Full-Stack Developer (Python / Java)",
            es: "Desarrollador Full-Stack (Python / Java)",
            pt: "Desenvolvedor Full-Stack (Python / Java)"
        },
        place: { en: "Arequipa, Peru", es: "Arequipa, Perú", pt: "Arequipa, Peru" },
        country: "PE",
        from: "2016-03",
        to: "2018-04",
        summary: {
            en: "ERP solutions for production management and internal business operations.",
            es: "Soluciones ERP para la gestión de producción y operaciones internas.",
            pt: "Soluções ERP para gestão de produção e operações internas."
        },
        specifications: [
            {
                en: "Developed ERP solutions for product control, production management and internal business operations.",
                es: "Desarrollé soluciones ERP para control de productos, gestión de producción y operaciones internas.",
                pt: "Desenvolvi soluções ERP para controle de produtos, gestão de produção e operações internas."
            },
            {
                en: "Integrated enterprise applications with SAP Business One through SOAP web services.",
                es: "Integré aplicaciones empresariales con SAP Business One mediante servicios web SOAP.",
                pt: "Integrei aplicações corporativas ao SAP Business One por meio de web services SOAP."
            },
            {
                en: "Developed backend modules with Python/Odoo and Java, with database-driven functionality on PostgreSQL.",
                es: "Desarrollé módulos backend con Python/Odoo y Java, con funcionalidades sobre PostgreSQL.",
                pt: "Desenvolvi módulos backend com Python/Odoo e Java, com funcionalidades sobre PostgreSQL."
            },
            {
                en: "Managed version control with GitHub and generated detailed operational reports.",
                es: "Gestioné el control de versiones con GitHub y generé reportes operativos detallados.",
                pt: "Gerenciei o controle de versão com GitHub e gerei relatórios operacionais detalhados."
            }
        ],
        tools: ["Python", "Odoo v8", "Java 7/8", "SOAP", "QWeb", "PostgreSQL", "SAP Business One", "GitHub"]
    }
];

export default workInfoDict;
