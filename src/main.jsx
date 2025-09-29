//BUG: Weird elevation on fields marked with .attention in screens bigger than 600px. Shadow effect from .correct and .wrong looking different.
//TODO: Hints for none fields, Impressum und Bugs and Feedback report funktion.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <LanguageProvider>
            <App />
        </LanguageProvider>
    </StrictMode>
);
