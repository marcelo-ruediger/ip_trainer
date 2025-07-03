function MiddleInputs({ renderValue, handleInputChange, showAnswers }) {
    return (
        <div className="default-container">
            <label>
                Netzwerkadresse:
                <br className="responsive-break" />
                <input
                    id="networkId"
                    value={renderValue("networkId")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                />
            </label>
            <label>
                Broadcast:
                <br className="responsive-break" />
                <input
                    id="broadcast"
                    value={renderValue("broadcast")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                />
            </label>
        </div>
    );
}

export default MiddleInputs;
