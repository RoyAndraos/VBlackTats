import React, { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <div
      style={{ color: "whitesmoke", fontSize: "1.2rem" }}
      onClick={() => {
        if (language === "en") {
          setLanguage("fr");
        } else {
          setLanguage("en");
        }
      }}
    >
      En/Fr
    </div>
  );
};

export default LanguageToggle;
