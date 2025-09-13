function BottomInputs({
    renderValue,
    handleInputChange,
    showAnswers,
    generatedField,
}) {
    return (
        <div className="default-container">
            <label>
                Adresstyp:
                <br className="responsive-break" />
                <select
                    id="ipClass"
                    value={renderValue("ipClass")}
                    onChange={handleInputChange}
                    disabled={showAnswers || generatedField === "ipClass"}
                    className={generatedField === "ipClass" ? "attention" : ""}
                    style={{ width: "100%" }}
                >
                    <option value="">Bitte wählen</option>
                    <option value="A (privat)">A (privat)</option>
                    <option value="A (öffentlich)">A (öffentlich)</option>
                    <option value="B (privat)">B (privat)</option>
                    <option value="B (öffentlich)">B (öffentlich)</option>
                    <option value="C (privat)">C (privat)</option>
                    <option value="C (öffentlich)">C (öffentlich)</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="Loopback">Loopback</option>
                    <option value="APIPA">APIPA</option>
                    <option value="Carrier-Grade NAT">Carrier-Grade NAT</option>
                    <option value="Dokumentation">Dokumentation</option>
                    <option value="Broadcast">Broadcast</option>
                    <option value="Unspezifiziert">Unspezifiziert</option>
                </select>
            </label>
            <label>
                Hostanzahl:
                <br className="responsive-break" />
                <input
                    id="usableIps"
                    value={renderValue("usableIps")}
                    onChange={handleInputChange}
                    disabled={showAnswers || generatedField === "usableIps"}
                    className={
                        generatedField === "usableIps" ? "attention" : ""
                    }
                />
            </label>
        </div>
    );
}

export default BottomInputs;
