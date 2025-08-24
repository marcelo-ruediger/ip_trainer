function BottomInputsIPv6({ renderValue, handleInputChange, showAnswers }) {
    return (
        <div className="default-container">
            <label>
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
            <label>
                Subnetzanteil:
                <br className="responsive-break" />
                <input
                    id="subnetId"
                    value={renderValue("subnetId")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
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
                    title="Der Interface-Anteil der Adresse (letzten 64 Bits)"
                    className="interface-id-input"
                />
            </label>
        </div>
    );
}

export default BottomInputsIPv6;
