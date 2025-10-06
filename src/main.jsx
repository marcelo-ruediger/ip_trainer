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

//TODO: Buy me a Coffee or PayPal.me or Ko-fi or GitHub Sponsors (most professional and no fees)?
