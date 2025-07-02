function BottomButtons({ handleCheck, handleShowAnswers }) {
    return (
        <div className="bottom-btns">
            <button className="check-answers" onClick={handleCheck}>
                Überprüfen
            </button>
            <button className="show-answers" onClick={handleShowAnswers}>
                Antworten anzeigen
            </button>
        </div>
    );
}

export default BottomButtons;
