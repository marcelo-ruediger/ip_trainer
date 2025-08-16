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
                    placeholder={
                        mode !== "abbreviatedAddress" ? "Eingeben..." : ""
                    }
                    value={renderValue("abbreviatedAddress")}
                    onChange={handleInputChange}
                    disabled={showAnswers || mode === "abbreviatedAddress"}
                    className="long-input"
                />
            </label>
            <label>
                Netzwerkadresse:
                <br className="responsive-break" />
                <input
                    id="networkAddress"
                    placeholder="Eingeben..."
                    value={renderValue("networkAddress")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                />
            </label>
        </div>
    );
}

export default MiddleInputsIPv6;
