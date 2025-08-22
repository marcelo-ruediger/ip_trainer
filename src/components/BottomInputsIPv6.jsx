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
                Interface-ID:
                <br className="responsive-break" />
                <input
                    id="interfaceId"
                    placeholder="z.B. ::1 oder 0000:0000:0000:0001"
                    value={renderValue("interfaceId")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                    className="long-input"
                />
            </label>
        </div>
    );
}

export default BottomInputsIPv6;
