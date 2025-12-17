import React from "react";
import { CCarousel } from "@coreui/react";
import { CCarouselItem } from "@coreui/react";
import { CImage } from "@coreui/react";
import { CCarouselCaption } from "@coreui/react";
import "./Project.scss";

function Project({ projectDict, index }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`project-card ${isEven ? "project-card--even" : "project-card--odd"}`}>
      <div className="project-card__content">
        <h2 className="project-card__title">{projectDict.name}</h2>
        <ul className="project-card__specs">
          {projectDict.specifications.map((value, i) => (
            <li key={`spec-${i}`}>{value}</li>
          ))}
        </ul>
      </div>

      <div className="project-card__gallery">
        <CCarousel controls indicators dark interval={false}>
          {projectDict.images.map((image, i) => (
            <CCarouselItem key={`img-${i}`}>
              <CImage
                className="d-block w-100 project-card__image"
                src={image.img}
                alt={`Slide ${i + 1}`}
              />
              <CCarouselCaption className="d-none d-md-block ">
                <h5>{image.description_1}</h5>
                <p>{image.description_2}</p>
              </CCarouselCaption>
            </CCarouselItem>
          ))}
        </CCarousel>
      </div>
    </div>
  );
}

export default Project;
