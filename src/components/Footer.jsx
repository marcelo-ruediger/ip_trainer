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
                    <a target="blank" href="https://github.com/MarceloRuediger">
                        MarceloRuediger
                    </a>{" "}
                    ·{" "}
                    <a
                        target="blank"
                        href="https://github.com/MarceloRuediger/ip_trainer"
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
