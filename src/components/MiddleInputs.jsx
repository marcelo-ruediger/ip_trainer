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
                    disabled={showAnswers} //---------------_HERE----------------
                />
            </label>
            <label>
                Broadcast:
                <br className="responsive-break" />
                <input
                    id="broadcast"
                    value={renderValue("broadcast")}
                    onChange={handleInputChange}
                    disabled={showAnswers} // Not able to type subnet mask when mode == cidr and vice versa when mode == mask
                />
            </label>
        </div>
    );
}

export default MiddleInputs;
