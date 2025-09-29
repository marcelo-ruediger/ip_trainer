import { useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function IpVersionButtons({
    ipVersion,
    attention,
    setAttention,
    handleStartIPv4,
    handleStartIPv6,
}) {
    const buttonsRef = useRef(null);
    const { t } = useLanguage();

    useEffect(() => {
        if (attention && buttonsRef.current) {
            // Scroll up to show the IP version buttons with small margin (2rem = 32px)
            const elementTop = buttonsRef.current.offsetTop;
            const offset = 13; // 2rem in pixels
            window.scrollTo({
                top: elementTop - offset,
                behavior: "smooth",
            });
        }
    }, [attention]);
    return (
        <div className="top-buttons" ref={buttonsRef}>
            <button
                onClick={() => {
                    handleStartIPv4();
                    setAttention(false);
                }}
                className={attention ? "attention" : ""}
            >
                {t("ipVersionButtons.generateIPv4")}
            </button>
            <button
                onClick={() => {
                    handleStartIPv6();
                    setAttention(false);
                }}
                className={[
                    attention ? "attention" : "",
                    ipVersion === "ipv6" ? "active" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {t("ipVersionButtons.generateIPv6")}
            </button>
        </div>
    );
}

export default IpVersionButtons;
