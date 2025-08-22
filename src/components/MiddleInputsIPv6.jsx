function MiddleInputsIPv6({
    renderValue,
    handleInputChange,
    showAnswers,
    mode,
}) {
    return (
        <div className="default-container">
            <label>
                Abkürzung:
                <br className="responsive-break" />
                <input
                    id="abbreviatedAddress"
                    value={renderValue("abbreviatedAddress")}
                    onChange={handleInputChange}
                    disabled={showAnswers || mode === "abbreviatedAddress"}
                    className={`long-input ${
                        mode === "abbreviatedAddress" ? "attention" : ""
                    }`}
                />
            </label>
            <label>
                Netzwerkadresse:
                <br className="responsive-break" />
                <input
                    id="networkAddress"
                    value={renderValue("networkAddress")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                />
            </label>
        </div>
    );
}

export default MiddleInputsIPv6;
