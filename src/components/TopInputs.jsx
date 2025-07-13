function TopInputs({
    ipData,
    mode,
    handleInputChange,
    onIpInput,
    ipValid,
    attention,
    userInput,
    generated,
    userIsInputting,
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
                    value={
                        userIsInputting || mode !== "cidr"
                            ? userInput.cidr
                            : generated.cidr
                    }
                    onChange={handleInputChange}
                />
                <p>{generated.cidr}</p>
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
                        userIsInputting || mode !== "mask"
                            ? userInput.subnetMask
                            : generated.subnetMask
                    }
                    onChange={handleInputChange}
                />
                <p>{generated.subnetMask}</p>
            </label>
        </div>
    );
}

export default TopInputs;
