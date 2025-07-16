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
                    id="abkuerzung"
                    placeholder={mode !== "abkuerzung" ? "Eingeben..." : ""}
                    value={renderValue("abkuerzung")}
                    onChange={handleInputChange}
                    disabled={showAnswers || mode === "abkuerzung"}
                    className="long-input"
                />
            </label>
            <label>
                Netzwerkadresse:
                <br className="responsive-break" />
                <input
                    id="netzwerkadresse"
                    placeholder="Eingeben..."
                    value={renderValue("netzwerkadresse")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                />
            </label>
        </div>
    );
}

export default MiddleInputsIPv6;
