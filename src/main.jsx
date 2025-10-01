//TODO: Cannot scroll to BottomButtons properly. Install prompt on Apple doesn't work properly even with Safari 404 not found.
//TODO: Impressum und Bugs and Feedback report funktion. Code refactoring.

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
