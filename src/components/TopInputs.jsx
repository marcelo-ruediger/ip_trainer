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
                IPv4-Adresse:
                <br className="responsive-break" />
                <input
                    id="ip"
                    value={ipData.ip}
                    onChange={onIpInput}
                    placeholder="Eingeben..."
                    className={[
                        attention && "attention",
                        ipValid === true ? "correct" : "",
                        ipValid === false ? "wrong" : "",
                        !userIsInputting ? "attention" : "", // IP is always generated in practice mode
                    ]
                        .filter(Boolean)
                        .join(" ")}
                />
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
                        !userIsInputting && generatedField === "cidr"
                            ? "attention"
                            : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    placeholder={
                        userIsInputting && ipValid === true ? "Eingeben..." : ""
                    }
                    value={renderValue("cidr")}
                    onChange={(e) => {
                        handleInputChange(e);
                        if (onCidrOrMaskInput) {
                            onCidrOrMaskInput(e, "cidr");
                        }
                    }}
                    disabled={!userIsInputting && generatedField === "cidr"} // ← Updated logic
                />
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
                        !userIsInputting && generatedField === "subnetMask"
                            ? "attention"
                            : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    placeholder={
                        userIsInputting && ipValid === true ? "Eingeben..." : ""
                    }
                    value={renderValue("subnetMask")}
                    onChange={(e) => {
                        handleInputChange(e);
                        if (onCidrOrMaskInput) {
                            onCidrOrMaskInput(e, "subnetMask");
                        }
                    }}
                    disabled={
                        !userIsInputting && generatedField === "subnetMask"
                    } // ← Updated logic
                />
            </label>
        </div>
    );
}

export default TopInputs;
