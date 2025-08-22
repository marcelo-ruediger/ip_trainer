function BottomInputs({
    renderValue,
    handleInputChange,
    showAnswers,
    generatedField,
}) {
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
                Host-Adressen Anzahl:
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
