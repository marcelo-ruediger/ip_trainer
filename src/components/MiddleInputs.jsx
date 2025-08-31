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
                    className={
                        generatedField === "networkId" ? "attention" : ""
                    }
                />
            </label>
            <label>
                Broadcastadresse:
                <br className="responsive-break" />
                <input
                    id="broadcast"
                    value={renderValue("broadcast")}
                    onChange={handleInputChange}
                    disabled={showAnswers || generatedField === "broadcast"}
                    className={
                        generatedField === "broadcast" ? "attention" : ""
                    }
                />
            </label>
        </div>
    );
}

export default MiddleInputs;
