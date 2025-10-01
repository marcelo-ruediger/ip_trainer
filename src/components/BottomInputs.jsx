import { useLanguage } from "../contexts/LanguageContext";

function BottomInputs({
    renderValue,
    handleInputChange,
    showAnswers,
    generatedField,
}) {
    const { t } = useLanguage();

    return (
        <div className="default-container">
            <div className="ipv4-row-network-broadcast">
                <div className="ipv4-network-container">
                    <label>
                        {t("middleInputs.networkAddress")}
                        <br className="responsive-break" />
                        <input
                            id="networkId"
                            value={renderValue("networkId")}
                            onChange={handleInputChange}
                            disabled={
                                showAnswers || generatedField === "networkId"
                            }
                            title={t("tooltips.ipv4.networkAddress")}
                            className={
                                generatedField === "networkId"
                                    ? "attention"
                                    : ""
                            }
                        />
                    </label>
                </div>

                <div className="ipv4-broadcast-container">
                    <label>
                        {t("middleInputs.broadcastAddress")}
                        <br className="responsive-break" />
                        <input
                            id="broadcast"
                            value={renderValue("broadcast")}
                            onChange={handleInputChange}
                            disabled={
                                showAnswers || generatedField === "broadcast"
                            }
                            title={t("tooltips.ipv4.broadcastAddress")}
                            className={
                                generatedField === "broadcast"
                                    ? "attention"
                                    : ""
                            }
                        />
                    </label>
                </div>
            </div>

            {/* Address Type and Host Count - 50/50 */}
            <div className="ipv4-row-class-hosts">
                <div className="ipv4-class-container">
                    <label>
                        {t("bottomInputs.networkClass")}
                        <br className="responsive-break" />
                        <select
                            id="ipClass"
                            value={renderValue("ipClass")}
                            onChange={handleInputChange}
                            disabled={
                                showAnswers || generatedField === "ipClass"
                            }
                            className={
                                generatedField === "ipClass" ? "attention" : ""
                            }
                        >
                            <option value="">
                                {t("bottomInputs.selectPlaceholder")}
                            </option>
                            <option value="A (privat)">
                                {t("bottomInputs.classOptions.APrivate")}
                            </option>
                            <option value="A (öffentlich)">
                                {t("bottomInputs.classOptions.APublic")}
                            </option>
                            <option value="B (privat)">
                                {t("bottomInputs.classOptions.BPrivate")}
                            </option>
                            <option value="B (öffentlich)">
                                {t("bottomInputs.classOptions.BPublic")}
                            </option>
                            <option value="C (privat)">
                                {t("bottomInputs.classOptions.CPrivate")}
                            </option>
                            <option value="C (öffentlich)">
                                {t("bottomInputs.classOptions.CPublic")}
                            </option>
                            <option value="D">
                                {t("bottomInputs.classOptions.D")}
                            </option>
                            <option value="E">
                                {t("bottomInputs.classOptions.E")}
                            </option>
                            <option value="Loopback">
                                {t("bottomInputs.classOptions.Loopback")}
                            </option>
                            <option value="APIPA">
                                {t("bottomInputs.classOptions.APIPA")}
                            </option>
                            <option value="Carrier-Grade NAT">
                                {t("bottomInputs.classOptions.CarrierGradeNAT")}
                            </option>
                            <option value="Dokumentation">
                                {t("bottomInputs.classOptions.Documentation")}
                            </option>
                            <option value="Broadcast">
                                {t("bottomInputs.classOptions.Broadcast")}
                            </option>
                            <option value="Unspezifiziert">
                                {t("bottomInputs.classOptions.Unspecified")}
                            </option>
                        </select>
                    </label>
                </div>

                <div className="ipv4-hosts-container">
                    <label>
                        {t("bottomInputs.usableHosts")}
                        <br className="responsive-break" />
                        <input
                            id="usableIps"
                            value={renderValue("usableIps")}
                            onChange={handleInputChange}
                            disabled={
                                showAnswers || generatedField === "usableIps"
                            }
                            title={t("tooltips.ipv4.hostCount")}
                            className={
                                generatedField === "usableIps"
                                    ? "attention"
                                    : ""
                            }
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default BottomInputs;
