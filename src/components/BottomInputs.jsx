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
            <label>
                {t("bottomInputs.networkClass")}
                <br className="responsive-break" />
                <select
                    id="ipClass"
                    value={renderValue("ipClass")}
                    onChange={handleInputChange}
                    disabled={showAnswers || generatedField === "ipClass"}
                    className={generatedField === "ipClass" ? "attention" : ""}
                    style={{ width: "100%" }}
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
            <label>
                {t("bottomInputs.usableHosts")}
                <br className="responsive-break" />
                <input
                    id="usableIps"
                    value={renderValue("usableIps")}
                    onChange={handleInputChange}
                    disabled={showAnswers || generatedField === "usableIps"}
                    className={
                        generatedField === "usableIps" ? "attention" : ""
                    }
                />
            </label>
        </div>
    );
}

export default BottomInputs;
