import { useLanguage } from "../contexts/LanguageContext";

function TopInputsIPv6({ renderValue, handleInputChange, showAnswers, mode }) {
    const { t } = useLanguage();

    return (
        <div className="default-container">
            <div className="ipv6-address-container">
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
            </div>

            <div className="ipv6-row-abbreviation-prefix">
                <div className="ipv6-abbreviation-container">
                    <label>
                        {t("middleInputsIPv6.abbreviatedAddress")}
                        <br className="responsive-break" />
                        <input
                            id="abbreviatedAddress"
                            value={renderValue("abbreviatedAddress")}
                            onChange={handleInputChange}
                            disabled={
                                showAnswers || mode === "abbreviatedAddress"
                            }
                            className={`long-input-abbreviation ${
                                mode === "abbreviatedAddress" ? "attention" : ""
                            }`}
                        />
                    </label>
                </div>

                <div className="ipv6-prefix-container">
                    <label>
                        {t("topInputsIPv6.networkPrefix")}
                        <br className="responsive-break" />
                        <input
                            id="networkPrefix"
                            value={renderValue("networkPrefix")}
                            onChange={handleInputChange}
                            disabled
                            className="network-prefix attention"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default TopInputsIPv6;
