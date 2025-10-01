import { createContext, useContext, useState } from "react";
import translations from "../translations.json";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("de");

    const t = (path) => {
        const keys = path.split(".");
        let value = translations[language];

        for (const key of keys) {
            value = value?.[key];
        }

        return value || path; // Return the path if translation not found
    };

    const switchLanguage = (newLanguage) => {
        if (newLanguage === "de" || newLanguage === "en") {
            setLanguage(newLanguage);
        }
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage: switchLanguage,
                t,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
