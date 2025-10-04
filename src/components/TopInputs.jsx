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
                        className={(() => {
                            if (ipValid === false) return "wrong";
                            if (ipValid === true) return "correct";
                            if (attention || (!userIsInputting && !ipData.ip))
                                return "attention";
                            return "";
                        })()}
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
                            className={(() => {
                                if (cidrValid === false) return "wrong";
                                if (cidrValid === true) return "correct";
                                if (
                                    !userIsInputting &&
                                    generatedField === "cidr"
                                )
                                    return "attention";
                                if (
                                    ipValid === true &&
                                    cidrValid === null &&
                                    userIsInputting
                                )
                                    return "attention";
                                return "";
                            })()}
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
                            className={(() => {
                                if (subnetMaskValid === false) return "wrong";
                                if (subnetMaskValid === true) return "correct";
                                if (
                                    !userIsInputting &&
                                    generatedField === "subnetMask"
                                )
                                    return "attention";
                                if (
                                    ipValid === true &&
                                    subnetMaskValid === null &&
                                    userIsInputting
                                )
                                    return "attention";
                                return "";
                            })()}
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
