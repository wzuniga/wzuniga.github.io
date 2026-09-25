import React, { useEffect, useRef, useState } from "react";
import "./AboutMe.scss";
import { useLanguage } from "../../i18n/LanguageContext";

const icons = {
  ai: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
  space: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M4.5 16.5C2.5 18.8 1.9 20.6 2.7 21.3c1.3 1.3 6.3-1.6 11-6.3s7.6-9.7 6.3-11c-.7-.8-2.5-.2-4.8 1.8" />
    </>
  ),
};

const Hl = ({ children }) => <span className="about__hl">{children}</span>;

// Paragraphs contain inline markup, so each language gets its own JSX.
const copy = {
  en: {
    paragraphs: [
      <>
        Hi! I'm <strong>Walter</strong>, a Senior Backend / Full-Stack Software Engineer with more than eight years
        building enterprise platforms — mostly with <Hl>Java</Hl> and <Hl>Spring Boot</Hl>, and with React, Angular
        or Python whenever the problem calls for it.
      </>,
      <>
        This site is my little corner of the universe: a place where I share what I build and the things I find
        interesting along the way.
      </>,
    ],
    quote:
      "Much of my work lives behind NDAs and private repositories, so I can't show everything I've done — but I can show you what I know how to do.",
    closing:
      "Away from the keyboard (and sometimes in front of it) you'll find me reading about artificial intelligence, listening to music and, as the background may have given away, looking up at the stars.",
    facts: [
      { value: "8+", label: "years building software" },
      { value: "6", label: "countries worked with" },
      { value: "3", label: "languages: ES · EN · PT" },
    ],
    interests: [
      { key: "ai", title: "Artificial Intelligence", text: "Curious about how AI is reshaping the way we build software — and what we can build with it." },
      { key: "music", title: "Music", text: "The soundtrack behind every coding session, every idea and every late-night deploy." },
      { key: "space", title: "Space", text: "Stars, galaxies and the big questions. You may have noticed from the sky behind this page." },
    ],
  },
  es: {
    paragraphs: [
      <>
        ¡Hola! Soy <strong>Walter</strong>, Ingeniero de Software Senior Backend / Full-Stack con más de ocho años
        construyendo plataformas empresariales — principalmente con <Hl>Java</Hl> y <Hl>Spring Boot</Hl>, y con React,
        Angular o Python cuando el problema lo pide.
      </>,
      <>
        Este sitio es mi pequeño rincón del universo: un lugar donde comparto lo que construyo y las cosas que me
        parecen interesantes en el camino.
      </>,
    ],
    quote:
      "Gran parte de mi trabajo vive detrás de NDAs y repositorios privados, así que no puedo mostrar todo lo que he hecho — pero sí puedo mostrarte lo que sé hacer.",
    closing:
      "Lejos del teclado (y a veces frente a él) me vas a encontrar leyendo sobre inteligencia artificial, escuchando música y, como el fondo ya te habrá delatado, mirando las estrellas.",
    facts: [
      { value: "8+", label: "años construyendo software" },
      { value: "6", label: "países en los que he trabajado" },
      { value: "3", label: "idiomas: ES · EN · PT" },
    ],
    interests: [
      { key: "ai", title: "Inteligencia Artificial", text: "Me intriga cómo la IA está cambiando la forma en que construimos software — y lo que podemos construir con ella." },
      { key: "music", title: "Música", text: "La banda sonora de cada sesión de código, cada idea y cada despliegue a medianoche." },
      { key: "space", title: "El espacio", text: "Estrellas, galaxias y las grandes preguntas. Quizás lo notaste por el cielo detrás de esta página." },
    ],
  },
  pt: {
    paragraphs: [
      <>
        Olá! Eu sou o <strong>Walter</strong>, Engenheiro de Software Sênior Backend / Full-Stack com mais de oito anos
        construindo plataformas corporativas — principalmente com <Hl>Java</Hl> e <Hl>Spring Boot</Hl>, e com React,
        Angular ou Python quando o problema pede.
      </>,
      <>
        Este site é o meu cantinho do universo: um lugar onde compartilho o que construo e as coisas que acho
        interessantes pelo caminho.
      </>,
    ],
    quote:
      "Grande parte do meu trabalho está protegida por NDAs e repositórios privados, então não posso mostrar tudo o que fiz — mas posso mostrar o que eu sei fazer.",
    closing:
      "Longe do teclado (e às vezes na frente dele) você vai me encontrar lendo sobre inteligência artificial, ouvindo música e, como o fundo já deve ter entregado, olhando para as estrelas.",
    facts: [
      { value: "8+", label: "anos construindo software" },
      { value: "6", label: "países em que trabalhei" },
      { value: "3", label: "idiomas: ES · EN · PT" },
    ],
    interests: [
      { key: "ai", title: "Inteligência Artificial", text: "Tenho curiosidade sobre como a IA está mudando a forma como construímos software — e o que podemos construir com ela." },
      { key: "music", title: "Música", text: "A trilha sonora de cada sessão de código, cada ideia e cada deploy de madrugada." },
      { key: "space", title: "O espaço", text: "Estrelas, galáxias e as grandes perguntas. Você deve ter notado pelo céu atrás desta página." },
    ],
  },
};

function AboutMe() {
  const { lang, t } = useLanguage();
  const content = copy[lang];
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Fade the section in the first time it scrolls into view.
  useEffect(() => {
    const node = ref.current;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`aboutContainer ${visible ? "is-visible" : ""}`} id="about" ref={ref}>
      <h2 className="numbered-heading">{t("about.title")}</h2>

      <div className="about">
        <div className="about__text">
          {content.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <p className="about__quote">{content.quote}</p>
          <p>{content.closing}</p>

          <ul className="about__facts">
            {content.facts.map((fact) => (
              <li key={fact.label}>
                <span className="about__fact-value">{fact.value}</span>
                <span className="about__fact-label">{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="about__interests">
          {content.interests.map((item, i) => (
            <li key={item.key} className="about__interest" style={{ transitionDelay: `${150 + i * 120}ms` }}>
              <span className="about__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {icons[item.key]}
                </svg>
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;
