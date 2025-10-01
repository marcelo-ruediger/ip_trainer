import { useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function BottomButtons({
    handleCheck,
    handleShowAnswers,
    disabled = false,
    attention = false,
}) {
    const buttonsRef = useRef(null);
    const { t } = useLanguage();

    useEffect(() => {
        if (attention && buttonsRef.current) {
            const elementTop = buttonsRef.current.offsetTop;
            const elementHeight = buttonsRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;
            const offset = 32;

            window.scrollTo({
                top: elementTop + elementHeight - viewportHeight + offset,
                behavior: "smooth",
            });
        }
    }, [attention]);
    return (
        <div className="bottom-btns" ref={buttonsRef}>
            <button
                className={`check-answers ${attention ? "attention" : ""}`}
                onClick={handleCheck}
                disabled={disabled}
            >
                {t("bottomButtons.check")}
            </button>
            <button
                className={`show-answers ${attention ? "attention" : ""}`}
                onClick={handleShowAnswers}
                disabled={disabled}
            >
                {t("bottomButtons.showAnswers")}
            </button>
        </div>
    );
}

export default BottomButtons;
