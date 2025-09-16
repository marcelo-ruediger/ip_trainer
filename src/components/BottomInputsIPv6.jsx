import { useLanguage } from "../contexts/LanguageContext";

function BottomInputsIPv6({ renderValue, handleInputChange, showAnswers }) {
    const { t } = useLanguage();

    return (
        <div className="default-container">
            <label>
                {t("bottomInputsIPv6.addressType")}
                <br className="responsive-break" />
                <select
                    id="type"
                    value={renderValue("type")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                    style={{ width: "100%" }}
                >
                    <option value="">
                        {t("bottomInputsIPv6.selectPlaceholder")}
                    </option>
                    <option value="Global Unicast">
                        {t("bottomInputsIPv6.typeOptions.globalUnicast")}
                    </option>
                    <option value="Documentation">
                        {t("bottomInputsIPv6.typeOptions.documentation")}
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
            <label>
                {t("bottomInputsIPv6.subnetPart")}
                <br className="responsive-break" />
                <input
                    id="subnetId"
                    value={renderValue("subnetId")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                    placeholder={t("bottomInputsIPv6.subnetPlaceholder")}
                    title={t("bottomInputsIPv6.subnetTitle")}
                    className="subnet-id-input"
                />
            </label>
            <label>
                {t("bottomInputsIPv6.interfacePart")}
                <br className="responsive-break" />
                <input
                    id="interfaceId"
                    value={renderValue("interfaceId")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                    placeholder={t("bottomInputsIPv6.interfacePlaceholder")}
                    title={t("bottomInputsIPv6.interfaceTitle")}
                    className="interface-id-input"
                />
            </label>
        </div>
    );
}

export default BottomInputsIPv6;
