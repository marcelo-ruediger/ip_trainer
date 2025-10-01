import { useLanguage } from "../contexts/LanguageContext";

function TopInputs({
    ipData,
    handleInputChange,
    onIpInput,
    onCidrOrMaskInput,
    ipValid,
    cidrValid,
    subnetMaskValid,
    attention,
    userIsInputting,
    generatedField,
    renderValue,
}) {
    const { t } = useLanguage();

    return (
        <div className="default-container">
            <div className="ipv4-address-container">
                <label>
                    {t("topInputs.ipv4Address")}
                    <br className="responsive-break" />
                    <input
                        id="ip"
                        value={ipData.ip}
                        onChange={onIpInput}
                        placeholder={t("topInputs.placeholder")}
                        className={[
                            attention && "attention",
                            ipValid === true ? "correct" : "",
                            ipValid === false ? "wrong" : "",
                            !userIsInputting ? "attention" : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    />
                </label>
            </div>

            <div className="ipv4-row-cidr-subnet">
                <div className="ipv4-cidr-container">
                    <label>
                        {t("topInputs.cidrNotation")}
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
                                userIsInputting && ipValid === true
                                    ? t("topInputs.placeholder")
                                    : ""
                            }
                            value={renderValue("cidr")}
                            onChange={(e) => {
                                handleInputChange(e);
                                if (onCidrOrMaskInput) {
                                    onCidrOrMaskInput(e, "cidr");
                                }
                            }}
                            disabled={
                                !userIsInputting && generatedField === "cidr"
                            }
                        />
                    </label>
                </div>

                <div className="ipv4-subnet-container">
                    <label>
                        {t("topInputs.subnetMask")}
                        <br className="responsive-break" />
                        <input
                            id="subnetMask"
                            className={[
                                ipValid === true && "attention",
                                subnetMaskValid === true ? "correct" : "",
                                subnetMaskValid === false ? "wrong" : "",
                                !userIsInputting &&
                                generatedField === "subnetMask"
                                    ? "attention"
                                    : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            placeholder={
                                userIsInputting && ipValid === true
                                    ? t("topInputs.placeholder")
                                    : ""
                            }
                            value={renderValue("subnetMask")}
                            onChange={(e) => {
                                handleInputChange(e);
                                if (onCidrOrMaskInput) {
                                    onCidrOrMaskInput(e, "subnetMask");
                                }
                            }}
                            disabled={
                                !userIsInputting &&
                                generatedField === "subnetMask"
                            }
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default TopInputs;
