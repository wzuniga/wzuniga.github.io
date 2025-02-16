import React from "react";
import { CCarousel } from "@coreui/react";
import { CCarouselItem } from "@coreui/react";
import { CImage } from "@coreui/react";
import { CCarouselCaption } from "@coreui/react";
import "./Project.scss";

function Project({ projectDict, firstPortfolio, position }) {
  const isMobile = window.innerWidth <= 768;

  const details = (
    <div className="infoCarousel">
      <h2>{projectDict.name}</h2>
      <div className="listInfoProject">
        <ul>
          {projectDict.specifications.map((value, index) => (
            <li className="sublistInfoProject" key={`listInfo-project-${index}`}>
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const carousel = (
    <div className="carouselContainer">
      <CCarousel controls indicators dark className="responsiveCarousel">
        {projectDict.images.map((image, index) => (
          <CCarouselItem key={`carouselContainer-project-${index}`}>
            <CImage
              className="d-block w-100 imageCarousel"
              src={image.img}
              alt={`slide ${index + 1}`}
            />
            <CCarouselCaption className="d-none d-md-block captionCarousel">
              <h5>{image.description_1}</h5>
              <p>{image.description_2}</p>
            </CCarouselCaption>
          </CCarouselItem>
        ))}
      </CCarousel>
    </div>
  );

  return (
    <div
      className={`innerBoxPortfolio ${firstPortfolio ? "" : "firstPortfolio"}`}
    >
      {isMobile ? (
        <>
          {details}
          {carousel}
        </>
      ) : (
        <>
          {position ? details : carousel}
          {position ? carousel : details}
        </>
      )}
    </div>
  );
}

export default Project;
