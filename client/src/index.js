import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { IsMobileProvider } from "./contexts/IsMobileContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { IsAdminProvider } from "./contexts/IsAdminContext";
import GlobalStyles from "./GlobalStyles";
import { TransitionProvider } from "./contexts/TransitionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IsMobileProvider>
      <TransitionProvider>
        <LanguageProvider>
          <IsAdminProvider>
            <BrowserRouter basename="/">
              <App />
              <GlobalStyles />
            </BrowserRouter>
          </IsAdminProvider>
        </LanguageProvider>
      </TransitionProvider>
    </IsMobileProvider>
  </React.StrictMode>
);
