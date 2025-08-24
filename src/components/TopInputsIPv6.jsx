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
                Vollständige IPv6-Adresse:
                <br className="responsive-break" />
                <input
                    id="fullAddress"
                    value={renderValue("fullAddress")}
                    onChange={handleInputChange}
                    disabled={showAnswers || mode === "fullAddress"}
                    className={`ipv6-input long-input ${
                        mode === "fullAddress" ? "attention" : ""
                    }`}
                />
            </label>
            <label>
                Netzwerkpräfix:
                <br className="responsive-break" />
                <input
                    id="networkPrefix"
                    placeholder=""
                    value={renderValue("networkPrefix")}
                    onChange={handleInputChange}
                    disabled={true} // Always disabled since it's provided data
                    className="network-prefix attention"
                />
            </label>
        </div>
    );
}

export default TopInputsIPv6;
