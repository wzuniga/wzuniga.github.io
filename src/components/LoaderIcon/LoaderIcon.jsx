import React from "react";
import "./LoaderIcon.scss";
import { useLanguage } from "../../i18n/LanguageContext";

function LoaderIcon({ passInitial }) {
  const { t } = useLanguage();
  const initialGreeting = t("loader.welcome");
  const containerStyle = { backgroundColor: "#040308" };

  return (
    <div style={containerStyle} className={`bodyContainer ${passInitial ? "bodyContainerHidden" : ""}`}>
      {initialGreeting.split("").map((value, index) =>
        <span key={`bodyContainer-${index}`}>
          {value === " " ? <>&nbsp;</> : value}
        </span>
      )}
    </div>
  );
}

export default LoaderIcon;
