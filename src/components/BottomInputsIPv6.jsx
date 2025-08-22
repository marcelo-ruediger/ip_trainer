function BottomInputsIPv6({ renderValue, handleInputChange, showAnswers }) {
    return (
        <div
            className="default-container"
            style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                maxWidth: "600px",
            }}
        >
            <label
                style={{
                    flex: "1 1 180px",
                    minWidth: "150px",
                    marginRight: "10px",
                }}
            >
                Typ:
                <br className="responsive-break" />
                <select
                    id="type"
                    value={renderValue("type")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                    style={{ width: "100%" }}
                >
                    <option value="">Bitte wählen</option>
                    <option value="Global Unicast">Global Unicast</option>
                    <option value="Link-Local">Link-Local</option>
                    <option value="Multicast">Multicast</option>
                    <option value="Unique Local">Unique Local</option>
                    <option value="Anycast">Anycast</option>
                    <option value="Loopback">Loopback</option>
                    <option value="Unspecified">Unspecified</option>
                </select>
            </label>
            <label
                style={{
                    flex: "1 1 120px",
                    minWidth: "100px",
                    marginRight: "10px",
                }}
            >
                Subnetz Ziel-Präfix:
                <br className="responsive-break" />
                <input
                    id="targetPrefix"
                    value={renderValue("targetPrefix")}
                    onChange={handleInputChange}
                    disabled={true}
                    className="provided-info attention"
                    title="Präfix für die Subnetz-Berechnung"
                    style={{ width: "100%" }}
                />
            </label>
            <label style={{ flex: "1 1 140px", minWidth: "120px" }}>
                Anzahl von Subnetze:
                <br className="responsive-break" />
                <input
                    id="possibleSubnets"
                    value={renderValue("possibleSubnets")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                    placeholder="z.B. 256 oder 4.096"
                    style={{ width: "100%" }}
                />
            </label>
        </div>
    );
}

export default BottomInputsIPv6;
