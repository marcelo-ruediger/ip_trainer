function BottomInputsIPv6({ renderValue, handleInputChange, showAnswers }) {
    return (
        <div className="default-container">
            <label>
                Typ:
                <br className="responsive-break" />
                <select
                    id="typ"
                    value={renderValue("typ")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
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
                benutzbare IPs:
                <br className="responsive-break" />
                <input
                    id="benutzbareIps"
                    type="number"
                    value={renderValue("benutzbareIps")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                />
            </label>
        </div>
    );
}

export default BottomInputsIPv6;
