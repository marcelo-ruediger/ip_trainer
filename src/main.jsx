import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <LanguageProvider>
            <App />
        </LanguageProvider>
    </StrictMode>
);

/* TODO: Buy me a Coffee or PayPal.me or Ko-fi or GitHub Sponsors (most professional and no fees)?
So hast du:

GitHub Sponsors → für Entwickler, Dozenten, Open-Source-Fans

Buy Me a Coffee → für Studierende oder Nicht-Techniker

Beide Zielgruppen fühlen sich angesprochen, und du wirkst gleichzeitig professionell und sympathisch.*/
