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
                    id="fullAddress"
                    placeholder={mode !== "fullAddress" ? "Eingeben..." : ""}
                    value={renderValue("fullAddress")}
                    onChange={handleInputChange}
                    disabled={showAnswers || mode === "fullAddress"}
                    className="ipv6-input long-input"
                />
            </label>
            <label>
                Netzwerk-Präfix:
                <br className="responsive-break" />
                <input
                    id="networkPrefix"
                    placeholder=""
                    value={renderValue("networkPrefix")}
                    onChange={handleInputChange}
                    disabled={true} // Always disabled since it's provided data
                    className="networkPrefix"
                />
            </label>
        </div>
    );
}

export default TopInputsIPv6;
