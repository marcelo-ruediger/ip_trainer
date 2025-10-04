import { useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

import againIcon from "../images/again.svg";
import correctionIcon from "../images/correction.svg";
import networkBrainIcon from "../images/network_brain.svg";
import mouseCursorIcon from "../images/mouse_cursor.svg";
import calculateIcon from "../images/calculate.svg";
import keyboardInputIcon from "../images/keybord_input.svg";
import dataCheckIcon from "../images/data_check.svg";
import networkNodeIcon from "../images/network_node.svg";

function InstructionContainer({
    generatedField,
    ipData,
    isInputMode,
    isValidIp,
    hasInputStarted,
    ipVersion = "ipv4",
    mode,
    showAnswers,
    cidrValid,
    subnetMaskValid,
    checkResults,
    showCheckResults,
}) {
    const { t } = useLanguage();

    const containerRef = useRef(null);

    useEffect(() => {
        if (showCheckResults && checkResults && containerRef.current) {
            const correctCount = checkResults.filter(
                (result) => result.isCorrect
            ).length;
            const totalCount = checkResults.length;
            const allCorrect = correctCount === totalCount;

            if (allCorrect) {
                const elementTop = containerRef.current.offsetTop;
                const offset = 32;
                window.scrollTo({
                    top: elementTop - offset,
                    behavior: "smooth",
                });
            }
        }
    }, [showCheckResults, checkResults]);

    const getFieldDisplayName = (field) => {
        switch (field) {
            case "cidr":
                return "CIDR";
            case "subnetMask":
                return t("instructionContainer.feedback.subnetMask");
            case "networkId":
                return t("instructionContainer.feedback.networkAddress");
            case "broadcast":
                return t("instructionContainer.feedback.broadcastAddress");
            case "usableIps":
                return t("instructionContainer.feedback.hostCount");
            case "ipClass":
                return t("instructionContainer.feedback.addressType");
            case "fullAddress":
                return t("instructionContainer.feedback.fullIpv6Address");
            case "abbreviatedAddress":
                return t("instructionContainer.feedback.abbreviation");
            case "networkPrefix":
                return "Netzwerk-Präfix";
            case "networkAddress":
                return t("instructionContainer.feedback.networkAddress");
            case "type":
                return t("instructionContainer.feedback.addressType");
            case "interfaceId":
                return t("instructionContainer.feedback.interfaceId");
            case "subnetId":
                return t("instructionContainer.feedback.subnetId");
            default:
                return field;
        }
    };

    const isCompletedInputMode =
        isInputMode &&
        isValidIp &&
        (ipData.cidr || ipData.subnetMask) &&
        ipData.networkId;

    if (showAnswers && !isCompletedInputMode) {
        return (
            <div className="instruction-container answers-shown correct-answers">
                <div className="instruction-text">
                    Antworten wurden ausgefüllt. Versuche es nochmal{" "}
                    <img src={againIcon} alt="again" className="again-icon" />
                </div>
            </div>
        );
    }

    if (showCheckResults && checkResults) {
        const correctCount = checkResults.filter(
            (result) => result.isCorrect
        ).length;
        const emptyCount = checkResults.filter(
            (result) => result.isEmpty
        ).length;
        const totalCount = checkResults.length;
        const wrongCount = totalCount - correctCount - emptyCount;
        const allCorrect = correctCount === totalCount;

        const showIPv6Hint =
            ipVersion === "ipv6" &&
            checkResults.some(
                (result) =>
                    !result.isCorrect &&
                    (result.field === "subnetId" ||
                        result.field === "networkAddress" ||
                        result.field === "interfaceId")
            );

        // Calculate border color based on correctness percentage
        const percentage = totalCount > 0 ? correctCount / totalCount : 0;
        let borderColor;
        if (percentage === 1) borderColor = "#4ade80";
        else if (percentage >= 0.8) borderColor = "#84cc16";
        else if (percentage >= 0.6) borderColor = "#eab308";
        else if (percentage >= 0.4) borderColor = "#f97316";
        else if (percentage >= 0.2) borderColor = "#ef4444";
        else borderColor = "#dc2626";

        const firstGroup = checkResults.slice(0, 3);
        const secondGroup = checkResults.slice(3, 5);

        return (
            <div
                ref={containerRef}
                className={`instruction-container ${
                    allCorrect ? "input-mode-complete" : "input-mode-error"
                }`}
                style={{ borderLeftColor: borderColor }}
            >
                <div className="instruction-text">
                    <div
                        className="result-line-1"
                        style={{
                            fontSize: "1.2em",
                            fontWeight: "bold",
                        }}
                    >
                        <span style={{ color: "#00ff88" }}>
                            {t("instructionContainer.feedback.correct")}{" "}
                            {correctCount}
                        </span>
                        <span style={{ color: "#888888", margin: "0 0.3rem" }}>
                            /
                        </span>
                        {emptyCount > 0 && (
                            <>
                                <span style={{ color: "#888888" }}>
                                    {emptyCount}{" "}
                                    {t("instructionContainer.feedback.empty")}
                                </span>
                                <span
                                    style={{
                                        color: "#888888",
                                        margin: "0 0.3rem",
                                    }}
                                >
                                    /
                                </span>
                            </>
                        )}
                        <span style={{ color: "#ff0044" }}>
                            {wrongCount}{" "}
                            {t("instructionContainer.feedback.wrong")}
                        </span>
                        <img
                            src={correctionIcon}
                            alt="correction"
                            className="correction-icon"
                            style={{
                                filter: "brightness(0) saturate(100%) invert(80%) sepia(0%) saturate(0%) hue-rotate(173deg) brightness(95%) contrast(87%)",
                                width: "26px",
                                height: "26px",
                                marginLeft: "0.5rem",
                            }}
                        />
                    </div>

                    <div
                        className="result-line-2"
                        style={{
                            color: "#cccccc",
                            fontSize: "0.9em",
                            marginBottom: "0.25rem",
                        }}
                    >
                        {firstGroup.map((result, index) => (
                            <span
                                key={result.field}
                                className="field-result-inline"
                                style={{ marginRight: "1rem" }}
                            >
                                <span style={{ fontSize: "1em" }}>
                                    {getFieldDisplayName(result.field)}
                                </span>
                                <span style={{ fontSize: "0.85em" }}>
                                    {result.isCorrect ? (
                                        "✅"
                                    ) : result.isEmpty ? (
                                        <span style={{ color: "#cccccc" }}>
                                            ➖
                                        </span>
                                    ) : (
                                        "❌"
                                    )}
                                </span>
                            </span>
                        ))}
                    </div>

                    {secondGroup.length > 0 && (
                        <div
                            className="result-line-3"
                            style={{
                                color: "#cccccc",
                                fontSize: "0.9em",
                            }}
                        >
                            {secondGroup.map((result, index) => (
                                <span
                                    key={result.field}
                                    className="field-result-inline"
                                    style={{ marginRight: "1rem" }}
                                >
                                    <span style={{ fontSize: "1em" }}>
                                        {getFieldDisplayName(result.field)}
                                    </span>
                                    <span style={{ fontSize: "0.85em" }}>
                                        {result.isCorrect ? (
                                            "✅"
                                        ) : result.isEmpty ? (
                                            <span style={{ color: "#cccccc" }}>
                                                ➖
                                            </span>
                                        ) : (
                                            "❌"
                                        )}
                                    </span>
                                </span>
                            ))}
                        </div>
                    )}

                    <div
                        className="result-line-4"
                        style={{
                            color: "#cccccc",
                            fontSize: "0.9em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.3rem",
                            marginTop: "0.5rem",
                        }}
                    >
                        {allCorrect ? (
                            <>
                                <span>100% richtig</span>
                                <img
                                    src={networkBrainIcon}
                                    alt="perfect"
                                    className="network-brain-icon"
                                    style={{
                                        filter: "brightness(0) saturate(100%) invert(80%) sepia(8%) saturate(284%) hue-rotate(201deg) brightness(99%) contrast(85%)",
                                        animation:
                                            "greenGradient 2s ease-in-out infinite",
                                        width: "26px",
                                        height: "26px",
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <span>
                                    {t("instructionContainer.feedback.message")}
                                </span>
                                <img
                                    src={mouseCursorIcon}
                                    alt="click"
                                    className="cursor-icon"
                                    style={{
                                        filter: "brightness(0) saturate(100%) invert(80%) sepia(8%) saturate(284%) hue-rotate(201deg) brightness(99%) contrast(85%)",
                                        width: "1.1em",
                                        height: "1.1em",
                                    }}
                                />
                            </>
                        )}
                    </div>

                    {showIPv6Hint && (
                        <div className="ipv6-hint">
                            <div>⚠️ {t("instructionContainer.ipv6Hints1")}</div>
                            <div>⚠️ {t("instructionContainer.ipv6Hints2")}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (ipVersion === "ipv6") {
        if (!ipData.ipv6) {
            return (
                <div className="instruction-container">
                    <div className="instruction-text">
                        Erzeugen Sie eine IPv6-Adresse zum Üben.
                    </div>
                </div>
            );
        }

        const shownField =
            mode === "fullAddress" ? "fullAddress" : "abbreviatedAddress";
        const shownValue =
            mode === "fullAddress"
                ? ipData.fullAddress
                : ipData.abbreviatedAddress;
        const networkPrefix = ipData.networkPrefix;

        return (
            <div className="instruction-container">
                <div className="instruction-text">
                    <strong>{t("instructionContainer.practiceMode")}:</strong>{" "}
                    {t("instructionContainer.ipPracticeMode")}{" "}
                    <img
                        src={calculateIcon}
                        alt="calculate"
                        className="calculate-icon"
                    />
                    <div className="ipv6-hint">
                        <div>⚠️ {t("instructionContainer.ipv6Hints1")}</div>
                        <div>⚠️ {t("instructionContainer.ipv6Hints2")}</div>
                    </div>
                </div>
            </div>
        );
    }

    if (
        isInputMode &&
        hasInputStarted &&
        (!isValidIp ||
            (isValidIp &&
                ((ipData.cidr && cidrValid === false) ||
                    (ipData.subnetMask && subnetMaskValid === false))))
    ) {
        return (
            <div className="instruction-container input-mode input-mode-error">
                <div className="instruction-text">
                    <strong>{t("instructionContainer.inputMode.title")}</strong>
                    <br />
                    {t("instructionContainer.inputMode.askForIp")}{" "}
                    <img
                        src={keyboardInputIcon}
                        alt="keyboard input"
                        className="keyboard-input-icon"
                    />
                </div>
            </div>
        );
    }

    if (isInputMode && isValidIp && !ipData.networkId) {
        return (
            <div className="instruction-container input-mode">
                <div className="instruction-text">
                    <strong>{t("instructionContainer.inputMode.title")}</strong>
                    <br />
                    {t("instructionContainer.inputMode.askForCIDR")}{" "}
                    <img
                        src={keyboardInputIcon}
                        alt="keyboard input"
                        className="keyboard-input-icon"
                    />
                </div>
            </div>
        );
    }

    if (
        isInputMode &&
        isValidIp &&
        (ipData.cidr || ipData.subnetMask) &&
        ipData.networkId
    ) {
        return (
            <div className="instruction-container input-mode-complete">
                <div className="instruction-text">
                    <strong>
                        {t("instructionContainer.inputMode.title")} -{" "}
                        {t(
                            "instructionContainer.inputMode.calculationCompletedTitle"
                        )}
                    </strong>
                    <br />
                    {t(
                        "instructionContainer.inputMode.calculationCompletedMessage"
                    )}{" "}
                    <img
                        src={dataCheckIcon}
                        alt="data check"
                        className="data-check-icon"
                    />
                </div>
            </div>
        );
    }

    if (!generatedField || !ipData.ip) {
        return (
            <div className="instruction-container">
                <div className="instruction-text">
                    {t("instructionContainer.initialState")}{" "}
                    <img
                        src={networkNodeIcon}
                        alt="network node"
                        className="network-node-icon"
                    />
                    <div className="ipv6-hint">
                        <div>⚠️ {t("instructionContainer.ipHints")}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="instruction-container">
            <div className="instruction-text">
                <strong>{t("instructionContainer.practiceMode")}:</strong>{" "}
                {t("instructionContainer.ipPracticeMode")}{" "}
                <img
                    src={calculateIcon}
                    alt="calculate"
                    className="calculate-icon"
                />
                <div className="ipv6-hint">
                    <div>⚠️ {t("instructionContainer.ipv4Hints")}</div>
                </div>
            </div>
        </div>
    );
}

export default InstructionContainer;
