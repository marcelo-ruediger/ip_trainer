function MiddleInputsIPv6({ renderValue, handleInputChange, showAnswers }) {
    return (
        <div className="default-container">
            <label>
                Abkürzung:
                <br className="responsive-break" />
                <input
                    id="abkuerzung"
                    value={renderValue("abkuerzung")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                />
            </label>
            <label>
                Netzwerkadresse:
                <br className="responsive-break" />
                <input
                    id="netzwerkadresse"
                    value={renderValue("netzwerkadresse")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                />
            </label>
        </div>
    );
}

export default MiddleInputsIPv6;
