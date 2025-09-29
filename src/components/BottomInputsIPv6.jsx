import { useLanguage } from "../contexts/LanguageContext";

function BottomInputsIPv6({ renderValue, handleInputChange, showAnswers }) {
    const { t } = useLanguage();

    return (
        <div className="default-container">
            {/* Network Address (60%) and Subnet ID (40%) */}
            <div className="ipv6-row-network-subnet">
                <div className="ipv6-network-container">
                    <label>
                        {t("middleInputsIPv6.networkAddress")}
                        <br className="responsive-break" />
                        <input
                            id="networkAddress"
                            value={renderValue("networkAddress")}
                            onChange={handleInputChange}
                            disabled={showAnswers}
                            placeholder={t(
                                "middleInputsIPv6.abbreviatedPlaceholder"
                            )}
                            className="network-address-input"
                        />
                    </label>
                </div>

                <div className="ipv6-subnet-container">
                    <label>
                        {t("bottomInputsIPv6.subnetPart")}
                        <br className="responsive-break" />
                        <input
                            id="subnetId"
                            value={renderValue("subnetId")}
                            onChange={handleInputChange}
                            disabled={showAnswers}
                            placeholder={t(
                                "bottomInputsIPv6.subnetPlaceholder"
                            )}
                            title={t("bottomInputsIPv6.subnetTitle")}
                            className="subnet-id-input"
                        />
                    </label>
                </div>
            </div>

            {/* Interface ID (60%) and Address Type (40%) */}
            <div className="ipv6-row-interface-type">
                <div className="ipv6-interface-container">
                    <label>
                        {t("bottomInputsIPv6.interfacePart")}
                        <br className="responsive-break" />
                        <input
                            id="interfaceId"
                            value={renderValue("interfaceId")}
                            onChange={handleInputChange}
                            disabled={showAnswers}
                            placeholder={t(
                                "bottomInputsIPv6.interfacePlaceholder"
                            )}
                            title={t("bottomInputsIPv6.interfaceTitle")}
                            className="interface-id-input"
                        />
                    </label>
                </div>

                <div className="ipv6-type-container">
                    <label>
                        {t("bottomInputsIPv6.addressType")}
                        <br className="responsive-break" />
                        <select
                            id="type"
                            value={renderValue("type")}
                            onChange={handleInputChange}
                            disabled={showAnswers}
                        >
                            <option value="">
                                {t("bottomInputsIPv6.selectPlaceholder")}
                            </option>
                            <option value="Global Unicast">
                                {t(
                                    "bottomInputsIPv6.typeOptions.globalUnicast"
                                )}
                            </option>
                            <option value="Documentation">
                                {t(
                                    "bottomInputsIPv6.typeOptions.documentation"
                                )}
                            </option>
                            <option value="ULA">
                                {t("bottomInputsIPv6.typeOptions.ula")}
                            </option>
                            <option value="Link-Local">
                                {t("bottomInputsIPv6.typeOptions.linkLocal")}
                            </option>
                            <option value="Loopback">
                                {t("bottomInputsIPv6.typeOptions.loopback")}
                            </option>
                            <option value="Multicast">
                                {t("bottomInputsIPv6.typeOptions.multicast")}
                            </option>
                            <option value="Unspecified">
                                {t("bottomInputsIPv6.typeOptions.unspecified")}
                            </option>
                        </select>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default BottomInputsIPv6;
