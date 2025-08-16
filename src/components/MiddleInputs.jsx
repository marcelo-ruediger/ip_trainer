function MiddleInputs({
    renderValue,
    handleInputChange,
    showAnswers,
    generatedField,
}) {
    return (
        <div className="default-container">
            <label>
                Netzwerkadresse:
                <br className="responsive-break" />
                <input
                    id="networkId"
                    value={renderValue("networkId")}
                    onChange={handleInputChange}
                    disabled={showAnswers || generatedField === "networkId"}
                />
            </label>
            <label>
                Broadcast:
                <br className="responsive-break" />
                <input
                    id="broadcast"
                    value={renderValue("broadcast")}
                    onChange={handleInputChange}
                    disabled={showAnswers || generatedField === "broadcast"}
                />
            </label>
        </div>
    );
}

export default MiddleInputs;
