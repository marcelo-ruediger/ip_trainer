function TopInputs({
    ipData,
    mode,
    renderValue,
    handleInputChange,
    showAnswers,
    onIpInput,
    ipValid,
    attention,
    userInput,
}) {
    return (
        <div className="default-container three-inputs-container">
            <label>
                IP-Adresse:
                <br className="responsive-break" />
                <input
                    id="ip"
                    placeholder="Eingeben..."
                    value={ipData.ip}
                    onChange={onIpInput}
                    className={[
                        attention && "attention",
                        ipValid === true ? "correct" : "",
                        ipValid === false ? "wrong" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                />
                <p>{mode}</p>
            </label>
            <br className="responsive-break" />
            <label>
                CIDR:
                <br className="responsive-break" />
                <input
                    id="cidr"
                    className={ipValid === true && "attention"}
                    placeholder={ipValid === true && "Eingeben..."}
                    value={showAnswers ? userInput.cidr : ipData.cidr}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                />
                <p>{ipData.cidr}</p>
            </label>
            <br className="responsive-break" />
            <label>
                Subnetzmaske:
                <br className="responsive-break" />
                <input
                    id="subnetMask"
                    className={ipValid === true && "attention"}
                    placeholder={ipValid === true && "Eingeben..."}
                    value={
                        showAnswers ? userInput.subnetMask : ipData.subnetMask
                    }
                    onChange={handleInputChange}
                    disabled={showAnswers}
                />
                <p>{ipData.subnetMask}</p>
            </label>
        </div>
    );
}

export default TopInputs;
