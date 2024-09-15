import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <div
      style={{
        textDecorationThickness: "1px",
        textDecorationLine: "underline",
      }}
      onClick={() => {
        if (language === "en") {
          setLanguage("fr");
        } else {
          setLanguage("en");
        }
      }}
    >
      {language === "en" ? "FR" : "EN"}
    </div>
  );
};

export default LanguageToggle;
