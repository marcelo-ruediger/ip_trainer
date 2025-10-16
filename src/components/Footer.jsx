import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Impressum from "./Impressum";
import FeedbackBugs from "./FeedbackBugs";

function Footer() {
    const { t } = useLanguage();
    const [showImpressum, setShowImpressum] = useState(false);
    const [showFeedbackBugs, setShowFeedbackBugs] = useState(false);

    return (
        <>
            <footer>
                <p>
                    &copy; 2025{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/marcelo-ruediger"
                    >
                        marcelo-ruediger
                    </a>{" "}
                    ·{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/marcelo-ruediger/ip_trainer"
                    >
                        IP Trainer
                    </a>{" "}
                    ·{" "}
                    <a
                        className="footer-link"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowImpressum(true);
                        }}
                    >
                        {t("footer.impressum")}
                    </a>{" "}
                    ·{" "}
                    <a
                        className="footer-link"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowFeedbackBugs(true);
                        }}
                    >
                        {t("footer.feedbackBugs")}
                    </a>{" "}
                    ·{" "}
                    <a
                        className="footer-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://ko-fi.com/marcelo_ruediger"
                    >
                        Buy Me a Coffee ☕
                    </a>
                </p>
            </footer>

            {showImpressum && (
                <Impressum
                    onClose={() => setShowImpressum(false)}
                    onOpenContact={() => {
                        setShowImpressum(false);
                        setShowFeedbackBugs(true);
                    }}
                />
            )}

            {showFeedbackBugs && (
                <FeedbackBugs onClose={() => setShowFeedbackBugs(false)} />
            )}
        </>
    );
}

export default Footer;
