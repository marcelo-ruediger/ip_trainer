import { useEffect, useRef } from "react";

function BottomButtons({
    handleCheck,
    handleShowAnswers,
    disabled = false,
    attention = false,
}) {
    const buttonsRef = useRef(null);

    useEffect(() => {
        if (attention && buttonsRef.current) {
            // Scroll down to show the bottom buttons with small margin (2rem = 32px)
            const elementTop = buttonsRef.current.offsetTop;
            const elementHeight = buttonsRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;
            const offset = 32; // 2rem in pixels

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
                Überprüfen
            </button>
            <button
                className={`show-answers ${attention ? "attention" : ""}`}
                onClick={handleShowAnswers}
                disabled={disabled}
            >
                Antworten anzeigen
            </button>
        </div>
    );
}

export default BottomButtons;
