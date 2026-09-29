// Snapshot of my own LinkedIn posts (reactions/comments as of Sep 2026).
// LinkedIn has no public API for this, so new posts are added here by hand.
// Text fields are { en, es, pt } objects resolved with `tr()`; the originals are in Spanish.
// `cover` is a scene from Portfolio/CoverArt.jsx. `part` marks the scraping series.

export const LINKEDIN_PROFILE = "https://www.linkedin.com/in/wzunigah";
export const LINKEDIN_ACTIVITY = "https://www.linkedin.com/in/wzunigah/recent-activity/all/";
export const SERIES_LENGTH = 4;

const posts = [
  {
    id: "7317736414517886976",
    url: "https://www.linkedin.com/posts/wzunigah_nodejs-puppeteer-webscraping-activity-7317736414517886976-mtFt",
    date: "2025-04-15",
    part: 1,
    cover: "scraper",
    title: {
      en: "Scraping Adondevivir with Node.js + Puppeteer",
      es: "Scraping de Adondevivir con Node.js + Puppeteer",
      pt: "Scraping do Adondevivir com Node.js + Puppeteer"
    },
    summary: {
      en: "Instead of crawling page by page, I inject a POST from the browser that looks like the site's own request — and get every listing: sales, rentals, prices, locations and features.",
      es: "En lugar de recorrer página por página, inyecto un POST desde el navegador que simula ser la propia web — y obtengo todas las publicaciones: venta, alquiler, precios, ubicación y características.",
      pt: "Em vez de percorrer página por página, injeto um POST a partir do navegador que imita a própria requisição do site — e obtenho todos os anúncios: venda, aluguel, preços, localização e características."
    },
    takeaways: [
      {
        en: "Replaying the site's own POST request from inside the browser.",
        es: "Replicar el propio POST del sitio desde dentro del navegador.",
        pt: "Reproduzir o próprio POST do site de dentro do navegador."
      },
      {
        en: "Listings stored in MongoDB for later analysis and visualization.",
        es: "Publicaciones guardadas en MongoDB para analizarlas y visualizarlas después.",
        pt: "Anúncios salvos no MongoDB para análise e visualização posterior."
      }
    ],
    tags: ["nodejs", "puppeteer", "webscraping", "mongodb"],
    reactions: 138,
    comments: 7
  },
  {
    id: "7317946039452237824",
    url: "https://www.linkedin.com/posts/wzunigah_webscraping-scraper-scraping-activity-7317946039452237824-KMMY",
    date: "2025-04-15",
    part: 2,
    cover: "clone",
    title: {
      en: "Urbania: a cloned portal with the same weak spots",
      es: "Urbania: un portal clonado con los mismos puntos débiles",
      pt: "Urbania: um portal clonado com os mesmos pontos fracos"
    },
    summary: {
      en: "Same structure and endpoints as Adondevivir — no user-agent validation, no CAPTCHA. The whole catalog (~10k properties) in about five minutes.",
      es: "Misma estructura y endpoints que Adondevivir — sin validación de user-agent ni captcha. Todo el catálogo (~10k propiedades) en unos cinco minutos.",
      pt: "Mesma estrutura e endpoints do Adondevivir — sem validação de user-agent nem captcha. Todo o catálogo (~10 mil imóveis) em cerca de cinco minutos."
    },
    takeaways: [
      {
        en: "Requests in batches of 20 listings to avoid overloading the server.",
        es: "Peticiones en lotes de 20 publicaciones para no saturar el servidor.",
        pt: "Requisições em lotes de 20 anúncios para não sobrecarregar o servidor."
      },
      {
        en: "Direct POST requests injected from the browser.",
        es: "Peticiones POST directas inyectadas desde el navegador.",
        pt: "Requisições POST diretas injetadas a partir do navegador."
      }
    ],
    tags: ["webscraping", "nodejs", "puppeteer", "data"],
    reactions: 86,
    comments: 11
  },
  {
    id: "7318492124654546944",
    url: "https://www.linkedin.com/posts/wzunigah_webscraping-scraping-scraper-activity-7318492124654546944-9oqU",
    date: "2025-04-17",
    part: 3,
    cover: "graphql",
    title: {
      en: "Infocasas and GraphQL introspection in production",
      es: "Infocasas y la introspección de GraphQL en producción",
      pt: "Infocasas e a introspecção do GraphQL em produção"
    },
    summary: {
      en: "The data arrives twice — embedded in the HTML and through a GraphQL query. With introspection enabled in production, the whole schema can be mapped and custom queries built.",
      es: "La información llega duplicada — embebida en el HTML y mediante una consulta GraphQL. Con la introspección activada en producción, se puede mapear todo el esquema y construir queries propios.",
      pt: "Os dados chegam duplicados — embutidos no HTML e por meio de uma consulta GraphQL. Com a introspecção ativada em produção, é possível mapear todo o esquema e montar queries próprias."
    },
    takeaways: [
      {
        en: "A trimmed GraphQL query filtered by city (estate_id).",
        es: "Un query GraphQL depurado, filtrado por ciudad (estate_id).",
        pt: "Uma query GraphQL enxuta, filtrada por cidade (estate_id)."
      },
      {
        en: "Security rated 2/5; only Arequipa and Lima were fetched, out of respect for the server.",
        es: "Seguridad calificada con 2/5; solo obtuve Arequipa y Lima, por respeto al servidor.",
        pt: "Segurança avaliada em 2/5; só obtive Arequipa e Lima, por respeito ao servidor."
      }
    ],
    tags: ["graphql", "webscraping", "security", "nodejs"],
    reactions: 111,
    comments: 1
  },
  {
    id: "7319605058134822912",
    url: "https://www.linkedin.com/posts/wzunigah_scraping-ai-webscraping-activity-7319605058134822912-pTGI",
    date: "2025-04-20",
    part: 4,
    cover: "chat",
    title: {
      en: "Searching for a home by talking to an AI",
      es: "Buscar vivienda conversando con una IA",
      pt: "Procurar imóvel conversando com uma IA"
    },
    summary: {
      en: "With a structured base from Adondevivir, Urbania and Infocasas, I built natural-language search: the AI interprets what you want and answers with comparison tables.",
      es: "Con una base estructurada de Adondevivir, Urbania e Infocasas, armé búsquedas en lenguaje natural: la IA interpreta lo que buscas y responde con tablas comparativas.",
      pt: "Com uma base estruturada do Adondevivir, Urbania e Infocasas, criei buscas em linguagem natural: a IA interpreta o que você procura e responde com tabelas comparativas."
    },
    takeaways: [
      {
        en: "“A flat in Miraflores with a barbecue area” instead of filter forms.",
        es: "“Busco un depa en Miraflores con zona de parrilla” en vez de formularios de filtros.",
        pt: "“Um apartamento em Miraflores com churrasqueira” em vez de formulários de filtros."
      },
      {
        en: "Dataset with prices, locations, floors, amenities and publication dates.",
        es: "Dataset con precios, ubicaciones, pisos, amenities y fechas de publicación.",
        pt: "Dataset com preços, localizações, andares, comodidades e datas de publicação."
      }
    ],
    tags: ["ai", "webscraping", "nodejs", "realestate"],
    reactions: 14,
    comments: 0
  },
  {
    id: "7320316670076502017",
    url: "https://www.linkedin.com/posts/wzunigah_laencerrona-scraping-seguridad-activity-7320316670076502017-N0EP",
    date: "2025-04-22",
    cover: "captcha",
    title: {
      en: "How strong is a CAPTCHA today? Testing it with LlamaParse",
      es: "¿Qué tan fuerte es hoy un CAPTCHA? Probándolo con LlamaParse",
      pt: "Quão forte é um CAPTCHA hoje? Testando com LlamaParse"
    },
    summary: {
      en: "A public lookup page protected only by a CAPTCHA. Using LlamaParse, the CAPTCHA was solved around 80% of the time — a reminder that sensitive lookups need stronger protection.",
      es: "Una página de consulta pública protegida solo por un CAPTCHA. Con LlamaParse se resolvió alrededor del 80% de las veces — un recordatorio de que las consultas sensibles necesitan más protección.",
      pt: "Uma página de consulta pública protegida apenas por um CAPTCHA. Com o LlamaParse, ele foi resolvido cerca de 80% das vezes — um lembrete de que consultas sensíveis precisam de mais proteção."
    },
    takeaways: [
      {
        en: "Two session cookies easy to capture; no user-agent or webdriver checks.",
        es: "Dos cookies de sesión fáciles de capturar; sin validación de user-agent ni de webdriver.",
        pt: "Dois cookies de sessão fáceis de capturar; sem validação de user-agent nem de webdriver."
      },
      {
        en: "One lookup per solved CAPTCHA — the one control that did its job.",
        es: "Una consulta por captcha resuelto — el único control que cumplía su función.",
        pt: "Uma consulta por captcha resolvido — o único controle que cumpria seu papel."
      }
    ],
    tags: ["security", "llamaparse", "ai", "scraping"],
    reactions: 5,
    comments: 1
  }
];

export default posts;
