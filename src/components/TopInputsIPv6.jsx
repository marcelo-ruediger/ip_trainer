function TopInputsIPv6({
    ipData,
    renderValue,
    handleInputChange,
    showAnswers,
}) {
    return (
        <div className="default-container">
            <label>
                IP-Adresse:
                <br className="responsive-break" />
                <input value={ipData.ipv6} disabled className="ipv6-input" />
            </label>
            <label>
                Netzpräfix:
                <br className="responsive-break" />
                <input
                    id="netzpraefix"
                    value={renderValue("netzpraefix")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                    className="netzpraefix"
                />
            </label>
        </div>
    );
}

export default TopInputsIPv6;
