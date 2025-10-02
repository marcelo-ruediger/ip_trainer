import { useLanguage } from "../contexts/LanguageContext";
import "../styles/Impressum.css";

function Impressum({ onClose, onOpenContact }) {
    const { t } = useLanguage();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content impressum-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2>{t("impressum.title")}</h2>
                    <button onClick={onClose} className="close-button">
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    <div className="impressum-section">
                        <h3>{t("impressum.responsibleFor")}</h3>
                        <p>
                            Marcelo Ruediger
                            <br />
                            {t("impressum.developer")}
                            <br />
                            {t("impressum.contact")}:{" "}
                            <a
                                className="impressum-contact-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClose();
                                    onOpenContact();
                                }}
                            >
                                {t("impressum.contactForm")}
                            </a>
                            <br />
                            GitHub:{" "}
                            <a
                                href="https://github.com/marcelo-ruediger"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                github.com/marcelo-ruediger
                            </a>
                        </p>
                    </div>

                    <div className="impressum-section">
                        <h3>{t("impressum.projectInfo")}</h3>
                        <p>{t("impressum.projectDescription")}</p>
                        <p>
                            {t("impressum.sourceCode")}:{" "}
                            <a
                                href="https://github.com/marcelo-ruediger/ip_trainer"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                github.com/marcelo-ruediger/ip_trainer
                            </a>
                        </p>
                    </div>

                    <div className="impressum-section">
                        <h3>{t("impressum.disclaimer")}</h3>
                        <p>{t("impressum.disclaimerText")}</p>
                    </div>

                    <div className="impressum-section">
                        <h3>{t("impressum.privacy")}</h3>
                        <p>{t("impressum.privacyText")}</p>
                    </div>

                    <div className="impressum-section">
                        <h3>{t("impressum.license")}</h3>
                        <p>
                            {t("impressum.licenseText")}{" "}
                            <a
                                href="https://github.com/marcelo-ruediger/ip_trainer/blob/main/LICENSE"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t("impressum.licenseLink")}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Impressum;
