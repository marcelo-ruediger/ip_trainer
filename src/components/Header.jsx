import { useLanguage } from "../contexts/LanguageContext";

function Header() {
    const { t } = useLanguage();

    return (
        <header>
            <h1>{t("h1")}</h1>
        </header>
    );
}

export default Header;
