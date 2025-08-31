function BottomInputsIPv6({ renderValue, handleInputChange, showAnswers }) {
    return (
        <div className="default-container">
            <label>
                Adresstyp:
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
                    <option value="ULA">ULA</option>
                    <option value="Link-Local">Link-Local</option>
                </select>
            </label>
            <label>
                Subnetzanteil:
                <br className="responsive-break" />
                <input
                    id="subnetId"
                    value={renderValue("subnetId")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                    placeholder="Alle Bits..."
                    title="Der Subnetz-Anteil der Adresse (normalerweise 4. Hextet-Gruppe)"
                    className="subnet-id-input"
                />
            </label>
            <label>
                Interfaceanteil:
                <br className="responsive-break" />
                <input
                    id="interfaceId"
                    value={renderValue("interfaceId")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                    placeholder="Abgekürzt..."
                    title="Der Interface-Anteil der Adresse (letzten 64 Bits)"
                    className="interface-id-input"
                />
            </label>
        </div>
    );
}

export default BottomInputsIPv6;
