import { useState } from "react";
import {
    generateIPv6WithPrefix,
    abbreviateIPv6,
    expandIPv6,
    calculateIPv6NetworkData,
    calculateInterfaceId,
    calculateSubnetId,
} from "../utils/ipv6Utils";
import { resetInputBorders } from "../utils/commonUtils";

export const useIPv6 = () => {
    const [ipData, setIpData] = useState({
        ipv6: "",
        fullAddress: "",
        abbreviatedAddress: "",
        networkPrefix: "",
        networkAddress: "",
        type: "",
        subnetId: "",
        interfaceId: "",
    });

    const [userInput, setUserInput] = useState({
        fullAddress: "",
        abbreviatedAddress: "",
        networkPrefix: "",
        networkAddress: "",
        type: "",
        subnetId: "",
        interfaceId: "",
    });

    const [showAnswers, setShowAnswers] = useState(false);
    const [attention, setAttention] = useState(true);
    const [mode, setMode] = useState("fullAddress");
    const [generated, setGenerated] = useState({
        fullAddress: "",
        abbreviatedAddress: "",
    });
    const [checkResults, setCheckResults] = useState([]);
    const [showCheckResults, setShowCheckResults] = useState(false);
    const [bottomButtonsAttention, setBottomButtonsAttention] = useState(false);

    const handleStart = () => {
        setAttention(false);
        resetInputBorders();
        setCheckResults([]);
        setShowCheckResults(false);
        setBottomButtonsAttention(false);

        const generationResult = generateIPv6WithPrefix();
        const { ipv6, prefix, abbreviated, networkData } = generationResult;

        const newMode =
            Math.random() < 0.5 ? "fullAddress" : "abbreviatedAddress";
        setMode(newMode);

        const fullAddress = ipv6;
        const abbreviatedAddress = abbreviated;

        setGenerated({
            fullAddress: fullAddress,
            abbreviatedAddress: abbreviatedAddress,
            subnetId: calculateSubnetId(
                fullAddress,
                parseInt(prefix.replace("/", ""))
            ),
            interfaceId: calculateInterfaceId(
                fullAddress,
                parseInt(prefix.replace("/", ""))
            ),
        });

        setIpData({
            ipv6: fullAddress,
            fullAddress: newMode === "fullAddress" ? fullAddress : "",
            abbreviatedAddress:
                newMode === "abbreviatedAddress" ? abbreviatedAddress : "",
            networkPrefix: prefix,
            networkAddress: networkData.networkAddress,
            type: networkData.type,
            subnetId: calculateSubnetId(
                fullAddress,
                parseInt(prefix.replace("/", ""))
            ),
            interfaceId: calculateInterfaceId(
                fullAddress,
                parseInt(prefix.replace("/", ""))
            ),
        });

        setShowAnswers(false);
        setUserInput({
            fullAddress: newMode === "fullAddress" ? fullAddress : "",
            abbreviatedAddress:
                newMode === "abbreviatedAddress" ? abbreviatedAddress : "",
            networkPrefix: prefix,
            networkAddress: "",
            type: "",
            subnetId: "",
            interfaceId: "",
        });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserInput((prev) => ({ ...prev, [id]: value }));

        if (!showAnswers && ipData.ipv6 && value.trim() !== "") {
            setBottomButtonsAttention(true);
        }
    };

    const handleShowAnswers = () => {
        if (!ipData.ipv6) {
            return;
        }

        setIpData((prev) => ({
            ...prev,
            fullAddress: generated.fullAddress,
            abbreviatedAddress: generated.abbreviatedAddress,
            subnetId: generated.subnetId,
            interfaceId: generated.interfaceId,
        }));
        setShowAnswers(true);
        setAttention(true);
        setCheckResults([]);
        setShowCheckResults(false);
        setBottomButtonsAttention(false);

        const ids = [
            "fullAddress",
            "abbreviatedAddress",
            "networkPrefix",
            "networkAddress",
            "type",
            "subnetId",
            "interfaceId",
        ];

        ids.forEach((id) => {
            const input = document.getElementById(id);
            if (input) {
                const isGeneratedField =
                    id === "networkPrefix" ||
                    (id === "fullAddress" && mode === "fullAddress") ||
                    (id === "abbreviatedAddress" &&
                        mode === "abbreviatedAddress");

                if (isGeneratedField) {
                    input.classList.remove("correct", "wrong", "empty");
                    input.classList.add("attention");
                } else {
                    input.classList.remove("wrong", "empty");
                    input.classList.add("correct");
                }
            }
        });
    };

    const handleCheck = () => {
        if (!ipData.ipv6) {
            return;
        }

        resetInputBorders();
        setShowCheckResults(false);

        const fieldsToCheck = [
            "fullAddress",
            "abbreviatedAddress",
            "networkPrefix",
            "networkAddress",
            "type",
            "subnetId",
            "interfaceId",
        ];

        const results = [];

        fieldsToCheck.forEach((fieldId) => {
            const isGeneratedField =
                fieldId === "networkPrefix" ||
                (fieldId === "fullAddress" && mode === "fullAddress") ||
                (fieldId === "abbreviatedAddress" &&
                    mode === "abbreviatedAddress");

            if (isGeneratedField) {
                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    inputElement.classList.remove("correct", "wrong", "empty");
                    inputElement.classList.add("attention");
                }
                return;
            }

            if (showAnswers) {
                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    inputElement.classList.remove("wrong", "empty");
                    inputElement.classList.add("correct");
                }
                results.push({
                    field: fieldId,
                    isCorrect: true,
                    value: ipData[fieldId] || "",
                });
                return;
            }

            const displayedValue = userInput[fieldId];
            const value = displayedValue?.toString().trim();

            if (!value || value === "") {
                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    inputElement.classList.remove("correct", "wrong");
                    inputElement.classList.add("empty");
                }
                results.push({
                    field: fieldId,
                    isCorrect: false,
                    isEmpty: true,
                    value: value || "",
                });
                return;
            }

            let isValid = false;
            let isCorrect = false;

            try {
                switch (fieldId) {
                    case "fullAddress":
                    case "abbreviatedAddress":
                    case "networkAddress": {
                        const ipv6Pattern =
                            /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$|^::$|^([0-9a-fA-F]{0,4}:){1,7}:$|^:([0-9a-fA-F]{0,4}:){1,7}$/;
                        const textAnswers = [
                            "kein",
                            "keine",
                            "keiner",
                            "nicht",
                            "nichts",
                            "none",
                            "no",
                            "nothing",
                        ];
                        isValid =
                            ipv6Pattern.test(value) ||
                            /^([0-9a-fA-F]{4}:){7}[0-9a-fA-F]{4}$/.test(
                                value
                            ) ||
                            textAnswers.includes(value.toLowerCase().trim());
                        break;
                    }
                    case "networkPrefix": {
                        const prefixPattern = /^\/\d{1,3}$/;
                        isValid = prefixPattern.test(value);
                        break;
                    }
                    case "subnetId": {
                        const subnetPattern =
                            /^([0-9a-fA-F]{1,4})(:[0-9a-fA-F]{1,4})*$/;
                        const textAnswers = [
                            "kein",
                            "keine",
                            "keiner",
                            "none",
                            "no",
                            "0",
                        ];
                        isValid =
                            subnetPattern.test(value) ||
                            textAnswers.includes(value.toLowerCase().trim());
                        break;
                    }
                    case "interfaceId": {
                        const interfacePattern =
                            /^(::?[0-9a-fA-F]{0,4}(:[0-9a-fA-F]{0,4})*|([0-9a-fA-F]{1,4}:){0,3}[0-9a-fA-F]{0,4})$/i;
                        const textAnswers = [
                            "kein",
                            "keine",
                            "keiner",
                            "none",
                            "no",
                            "0",
                        ];
                        isValid =
                            interfacePattern.test(value) ||
                            /^[0-9a-fA-F:]+$/.test(value) ||
                            textAnswers.includes(value.toLowerCase().trim());
                        break;
                    }
                    default:
                        isValid = true;
                }

                if (!isValid) throw new Error("Invalid input");

                let correctValue;
                if (
                    fieldId === "fullAddress" ||
                    fieldId === "abbreviatedAddress"
                ) {
                    correctValue = generated[fieldId];
                } else {
                    correctValue = ipData[fieldId];
                }

                if (fieldId === "fullAddress") {
                    isCorrect =
                        value.toLowerCase() === correctValue.toLowerCase();
                } else if (fieldId === "abbreviatedAddress") {
                    isCorrect =
                        value.toLowerCase() === correctValue.toLowerCase();
                } else if (fieldId === "networkAddress") {
                    if (correctValue === "kein") {
                        const validNoNetworkAnswers = [
                            "kein",
                            "keine",
                            "keiner",
                            "nicht",
                            "nichts",
                            "none",
                            "no",
                            "nothing",
                        ];
                        isCorrect = validNoNetworkAnswers.includes(
                            value.toLowerCase().trim()
                        );
                    } else {
                        isCorrect =
                            value.toLowerCase() === correctValue.toLowerCase();
                    }
                } else if (
                    fieldId === "subnetId" ||
                    fieldId === "interfaceId"
                ) {
                    if (fieldId === "subnetId") {
                        if (correctValue === "kein") {
                            const validNoSubnetAnswers = [
                                "kein",
                                "keine",
                                "keiner",
                                "nicht",
                                "nichts",
                                "none",
                                "no",
                                "nothing",
                            ];
                            isCorrect = validNoSubnetAnswers.includes(
                                value.toLowerCase().trim()
                            );
                        } else {
                            isCorrect =
                                value.toLowerCase() ===
                                correctValue.toLowerCase();
                        }
                    } else if (fieldId === "interfaceId") {
                        if (correctValue === "kein") {
                            const validNoInterfaceAnswers = [
                                "kein",
                                "keine",
                                "keiner",
                                "nicht",
                                "nichts",
                                "none",
                                "no",
                                "nothing",
                            ];
                            isCorrect = validNoInterfaceAnswers.includes(
                                value.toLowerCase().trim()
                            );
                        } else {
                            isCorrect =
                                value.toLowerCase() ===
                                correctValue.toLowerCase();
                        }
                    }
                } else {
                    isCorrect =
                        value.toLowerCase() === correctValue.toLowerCase();
                }

                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    inputElement.classList.remove("correct", "wrong", "empty");
                    inputElement.classList.add(isCorrect ? "correct" : "wrong");
                }

                results.push({ field: fieldId, isCorrect, value });
            } catch (error) {
                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    inputElement.classList.remove("correct", "empty");
                    inputElement.classList.add("wrong");
                }
                results.push({ field: fieldId, isCorrect: false, value });
            }
        });

        if (results.length > 0) {
            setCheckResults(results);
            setShowCheckResults(true);
            setBottomButtonsAttention(false);

            const allCorrect = results.every((result) => result.isCorrect);
            if (allCorrect) {
                setAttention(true);
            }
        }
    };

    const renderValue = (id) => {
        if (showAnswers) {
            return ipData[id];
        } else {
            return userInput[id];
        }
    };

    return {
        ipData,
        userInput,
        showAnswers,
        attention,
        mode,
        generated,
        checkResults,
        showCheckResults,
        bottomButtonsAttention,
        handleStart,
        handleInputChange,
        handleShowAnswers,
        handleCheck,
        renderValue,
        setAttention,
    };
};
