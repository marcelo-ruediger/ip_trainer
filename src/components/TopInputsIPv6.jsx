import { useLanguage } from "../contexts/LanguageContext";

function TopInputsIPv6({
    ipData,
    renderValue,
    handleInputChange,
    showAnswers,
    mode,
}) {
    const { t } = useLanguage();

    return (
        <div className="default-container">
            <label>
                {t("topInputsIPv6.fullAddress")}
                <br className="responsive-break" />
                <input
                    id="fullAddress"
                    value={renderValue("fullAddress")}
                    onChange={handleInputChange}
                    disabled={showAnswers || mode === "fullAddress"}
                    className={`ipv6-input long-input ${
                        mode === "fullAddress" ? "attention" : ""
                    }`}
                />
            </label>
            <label>
                {t("topInputsIPv6.networkPrefix")}
                <br className="responsive-break" />
                <input
                    id="networkPrefix"
                    placeholder=""
                    value={renderValue("networkPrefix")}
                    onChange={handleInputChange}
                    disabled={true} // Always disabled since it's provided data
                    className="network-prefix attention"
                />
            </label>
        </div>
    );
}

export default TopInputsIPv6;
