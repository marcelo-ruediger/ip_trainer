import { useLanguage } from "../contexts/LanguageContext";

function MiddleInputsIPv6({
    renderValue,
    handleInputChange,
    showAnswers,
    mode,
}) {
    const { t } = useLanguage();

    return (
        <div className="default-container">
            <label>
                {t("middleInputsIPv6.abbreviatedAddress")}
                <br className="responsive-break" />
                <input
                    id="abbreviatedAddress"
                    value={renderValue("abbreviatedAddress")}
                    onChange={handleInputChange}
                    disabled={showAnswers || mode === "abbreviatedAddress"}
                    className={`long-input-abbreviation ${
                        mode === "abbreviatedAddress" ? "attention" : ""
                    }`}
                />
            </label>
            <label>
                {t("middleInputsIPv6.networkAddress")}
                <br className="responsive-break" />
                <input
                    id="networkAddress"
                    value={renderValue("networkAddress")}
                    onChange={handleInputChange}
                    disabled={showAnswers}
                    placeholder={t("middleInputsIPv6.abbreviatedPlaceholder")}
                    className="network-address-input"
                />
            </label>
        </div>
    );
}

export default MiddleInputsIPv6;
