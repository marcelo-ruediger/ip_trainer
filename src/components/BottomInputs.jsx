function BottomInputs({ renderValue, handleInputChange, showAnswers }) {
    return (
        <div className="default-container">
            <label>
                IP-Klasse:
                <br className="responsive-break" />
                <input
                    id="ipClass"
                    value={renderValue("ipClass")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                />
            </label>
            <label>
                benutzbare IPs:
                <br className="responsive-break" />
                <input
                    id="usableIps"
                    value={renderValue("usableIps")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                />
            </label>
        </div>
    );
}

export default BottomInputs;
