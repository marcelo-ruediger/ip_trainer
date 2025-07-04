function TopInputs({
    ipData,
    mode,
    renderValue,
    handleInputChange,
    showAnswers,
    onIpInput,
    ipValid,
    attention,
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
            </label>
            <br className="responsive-break" />
            {mode === "cidr" ? (
                <>
                    <label>
                        CIDR:
                        <br className="responsive-break" />
                        <input
                            value={ipData.cidr}
                            className={ipValid === true && "attention"}
                            placeholder={ipValid === true && "Eingeben..."}
                        />
                    </label>
                    <br className="responsive-break" />
                    <label>
                        Subnetzmaske:
                        <br className="responsive-break" />
                        <input
                            id="subnetMask"
                            className={ipValid === true && "attention"}
                            placeholder={ipValid === true && "Eingeben..."}
                            value={renderValue("subnetMask")}
                            onChange={handleInputChange}
                            disabled={showAnswers}
                        />
                    </label>
                </>
            ) : (
                <>
                    <label>
                        CIDR:
                        <br className="responsive-break" />
                        <input
                            id="cidr"
                            className={ipValid === true && "attention"}
                            placeholder={ipValid === true && "Eingeben..."}
                            value={renderValue("cidr")}
                            onChange={handleInputChange}
                            disabled={showAnswers}
                        />
                    </label>
                    <br className="responsive-break" />
                    <label>
                        Subnetzmaske:
                        <br className="responsive-break" />
                        <input
                            value={ipData.subnetMask}
                            className={ipValid === true && "attention"}
                            placeholder={ipValid === true && "Eingeben..."}
                        />
                    </label>
                </>
            )}
        </div>
    );
}

export default TopInputs;
