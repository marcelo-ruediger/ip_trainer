function TopInputs({
    ipData,
    mode,
    renderValue,
    handleInputChange,
    showAnswers,
    onIpInput,
    ipValid,
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
                    className={
                        ipValid === true
                            ? "correct"
                            : ipValid === false
                            ? "wrong"
                            : ""
                    }
                />
            </label>
            <br className="responsive-break" />
            {mode === "cidr" ? (
                <>
                    <label>
                        CIDR:
                        <br className="responsive-break" />
                        <input value={ipData.cidr} disabled />
                    </label>
                    <br className="responsive-break" />
                    <label>
                        Subnetzmaske:
                        <br className="responsive-break" />
                        <input
                            id="subnetMask"
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
                            value={renderValue("cidr")}
                            onChange={handleInputChange}
                            disabled={showAnswers}
                        />
                    </label>
                    <br className="responsive-break" />
                    <label>
                        Subnetzmaske:
                        <br className="responsive-break" />
                        <input value={ipData.subnetMask} disabled />
                    </label>
                </>
            )}
        </div>
    );
}

export default TopInputs;
