import { useLanguage } from "../contexts/LanguageContext";

function MiddleInputs({
    renderValue,
    handleInputChange,
    showAnswers,
    generatedField,
}) {
    const { t } = useLanguage();

    return (
        <div className="default-container">
            <label>
                {t("middleInputs.networkAddress")}
                <br className="responsive-break" />
                <input
                    id="networkId"
                    value={renderValue("networkId")}
                    onChange={handleInputChange}
                    disabled={showAnswers || generatedField === "networkId"}
                    className={
                        generatedField === "networkId" ? "attention" : ""
                    }
                />
            </label>
            <label>
                {t("middleInputs.broadcastAddress")}
                <br className="responsive-break" />
                <input
                    id="broadcast"
                    value={renderValue("broadcast")}
                    onChange={handleInputChange}
                    disabled={showAnswers || generatedField === "broadcast"}
                    className={
                        generatedField === "broadcast" ? "attention" : ""
                    }
                />
            </label>
        </div>
    );
}

export default MiddleInputs;
