function TopInputsIPv6({
    ipData,
    renderValue,
    handleInputChange,
    showAnswers,
    mode,
}) {
    return (
        <div className="default-container">
            <label>
                IP-Adresse:
                <br className="responsive-break" />
                <input
                    id="vollstaendig"
                    placeholder={mode !== "vollstaendig" ? "Eingeben..." : ""}
                    value={renderValue("vollstaendig")}
                    onChange={handleInputChange}
                    disabled={showAnswers || mode === "vollstaendig"}
                    className="ipv6-input"
                />
            </label>
            <label>
                Netzpräfix:
                <br className="responsive-break" />
                <input
                    id="abkuerzung"
                    placeholder={mode !== "abkuerzung" ? "Eingeben..." : ""}
                    value={renderValue("abkuerzung")}
                    onChange={handleInputChange}
                    disabled={showAnswers || mode === "abkuerzung"}
                    className="netzpraefix"
                />
            </label>
        </div>
    );
}

export default TopInputsIPv6;
