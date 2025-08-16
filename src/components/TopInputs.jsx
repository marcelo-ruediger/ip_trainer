function TopInputs({
    ipData,
    mode,
    handleInputChange,
    onIpInput,
    onCidrOrMaskInput,
    ipValid,
    cidrValid,
    subnetMaskValid,
    attention,
    userInput,
    generated,
    userIsInputting,
    generatedField,
    renderValue,
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
                {/* <p>{mode}</p> */}
            </label>
            <br className="responsive-break" />
            <label>
                CIDR:
                <br className="responsive-break" />
                <input
                    id="cidr"
                    className={[
                        ipValid === true && "attention",
                        cidrValid === true ? "correct" : "",
                        cidrValid === false ? "wrong" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    placeholder={ipData.ip ? "Eingeben..." : ""}
                    value={renderValue("cidr")}
                    onChange={(e) => {
                        handleInputChange(e);
                        if (onCidrOrMaskInput) {
                            onCidrOrMaskInput(e, "cidr");
                        }
                    }}
                    disabled={generatedField === "cidr"}
                />
                {/* <p>{generated.cidr}</p> */}
            </label>
            <br className="responsive-break" />
            <label>
                Subnetzmaske:
                <br className="responsive-break" />
                <input
                    id="subnetMask"
                    className={[
                        ipValid === true && "attention",
                        subnetMaskValid === true ? "correct" : "",
                        subnetMaskValid === false ? "wrong" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    placeholder={ipData.ip ? "Eingeben..." : ""}
                    value={renderValue("subnetMask")}
                    onChange={(e) => {
                        handleInputChange(e);
                        if (onCidrOrMaskInput) {
                            onCidrOrMaskInput(e, "subnetMask");
                        }
                    }}
                    disabled={generatedField === "subnetMask"}
                />
                {/* <p>{generated.subnetMask}</p> */}
            </label>
        </div>
    );
}

export default TopInputs;
