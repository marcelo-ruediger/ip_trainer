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
    const [mode, setMode] = useState("fullAddress"); // "fullAddress" or "abbreviatedAddress"
    const [generated, setGenerated] = useState({
        fullAddress: "",
        abbreviatedAddress: "",
    });

    const handleStart = () => {
        setAttention(false);
        resetInputBorders();

        const generationResult = generateIPv6WithPrefix();
        const { ipv6, prefix, abbreviated, networkData } = generationResult;

        console.log("Generation result:", generationResult); // Debug log
        console.log("Network data:", networkData); // Debug log

        // Randomly choose which field to show (full or abbreviated)
        const newMode =
            Math.random() < 0.5 ? "fullAddress" : "abbreviatedAddress";
        setMode(newMode);

        // Store both full and abbreviated versions - ensure they are correct
        const fullAddress = ipv6; // ipv6 is already expanded from utils
        const abbreviatedAddress = abbreviated; // abbreviated is properly created from full address

        setGenerated({
            fullAddress: fullAddress,
            abbreviatedAddress: abbreviatedAddress,
            subnetId: calculateSubnetId(
                fullAddress,
                parseInt(prefix.replace("/", ""))
            ),
            interfaceId: calculateInterfaceId(fullAddress),
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
            interfaceId: calculateInterfaceId(fullAddress),
        });

        setShowAnswers(false);
        setUserInput({
            fullAddress: newMode === "fullAddress" ? fullAddress : "",
            abbreviatedAddress:
                newMode === "abbreviatedAddress" ? abbreviatedAddress : "",
            networkPrefix: prefix, // Show the prefix to the user
            networkAddress: "",
            type: "",
            subnetId: "",
            interfaceId: "",
        });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserInput((prev) => ({ ...prev, [id]: value }));
    };

    const handleShowAnswers = () => {
        setIpData((prev) => ({
            ...prev,
            fullAddress: generated.fullAddress,
            abbreviatedAddress: generated.abbreviatedAddress,
            subnetId: generated.subnetId,
            interfaceId: generated.interfaceId,
        }));
        setShowAnswers(true);

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
                // Identify generated/provided fields that should keep attention class
                const isGeneratedField =
                    id === "networkPrefix" ||
                    (id === "fullAddress" && mode === "fullAddress") ||
                    (id === "abbreviatedAddress" &&
                        mode === "abbreviatedAddress");

                if (isGeneratedField) {
                    input.classList.remove("correct", "wrong");
                    input.classList.add("attention");
                } else {
                    input.classList.remove("wrong");
                    input.classList.add("correct");
                }
            }
        });
    };

    const handleCheck = () => {
        resetInputBorders();

        const fieldsToCheck = [
            "fullAddress",
            "abbreviatedAddress",
            "networkPrefix",
            "networkAddress",
            "type",
            "subnetId",
            "interfaceId",
        ];

        fieldsToCheck.forEach((fieldId) => {
            // Identify generated/provided fields that should keep attention class
            const isGeneratedField =
                fieldId === "networkPrefix" ||
                (fieldId === "fullAddress" && mode === "fullAddress") ||
                (fieldId === "abbreviatedAddress" &&
                    mode === "abbreviatedAddress");

            if (isGeneratedField) {
                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    inputElement.classList.remove("correct", "wrong");
                    inputElement.classList.add("attention");
                }
                return;
            }

            const displayedValue = renderValue(fieldId);
            const value = displayedValue?.toString().trim();

            if (!value || value === "") {
                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    inputElement.classList.remove("correct");
                    inputElement.classList.add("wrong");
                }
                return;
            }

            let isValid = false;
            let isCorrect = false;

            try {
                switch (fieldId) {
                    case "fullAddress":
                    case "abbreviatedAddress": {
                        // Basic IPv6 format validation
                        const ipv6Pattern =
                            /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$|^::$|^([0-9a-fA-F]{0,4}:){1,7}:$|^:([0-9a-fA-F]{0,4}:){1,7}$/;
                        isValid =
                            ipv6Pattern.test(value) ||
                            /^([0-9a-fA-F]{4}:){7}[0-9a-fA-F]{4}$/.test(value);
                        break;
                    }
                    case "networkPrefix": {
                        const prefixPattern = /^\/\d{1,3}$/;
                        isValid = prefixPattern.test(value);
                        break;
                    }
                    case "subnetId": {
                        // Accept hexadecimal values OR text answers for "no subnet"
                        const subnetPattern = /^[0-9a-fA-F]{1,4}$/;
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
                        // Accept abbreviated IPv6 interface formats like ::1, ::abcd:1234, etc.
                        const interfacePattern =
                            /^(::?[0-9a-fA-F]{0,4}(:[0-9a-fA-F]{0,4})*|([0-9a-fA-F]{1,4}:){0,3}[0-9a-fA-F]{0,4})$/i;
                        isValid =
                            interfacePattern.test(value) ||
                            /^[0-9a-fA-F:]+$/.test(value);
                        break;
                    }
                    default:
                        isValid = true; // For other fields like type, accept any input for now
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

                // Special comparison for IPv6 addresses
                if (fieldId === "fullAddress") {
                    // Compare expanded versions
                    const userExpanded = expandIPv6(value);
                    const correctExpanded = expandIPv6(correctValue);
                    isCorrect =
                        userExpanded.toLowerCase() ===
                        correctExpanded.toLowerCase();
                } else if (fieldId === "abbreviatedAddress") {
                    // Compare both as expanded versions (since there can be multiple valid abbreviations)
                    const userExpanded = expandIPv6(value);
                    const correctExpanded = expandIPv6(correctValue);
                    isCorrect =
                        userExpanded.toLowerCase() ===
                        correctExpanded.toLowerCase();
                } else if (
                    fieldId === "subnetId" ||
                    fieldId === "interfaceId"
                ) {
                    if (fieldId === "subnetId") {
                        // Debug logging to help troubleshoot
                        console.log("Debug Subnetzanteil validation:", {
                            fieldId,
                            userInput: value,
                            correctValue,
                            userInputLower: value.toLowerCase().trim(),
                        });

                        // Check if the correct answer is "kein" (no subnet for /64 or longer)
                        if (correctValue === "kein") {
                            // Accept multiple valid German and English responses for "no subnet"
                            const validNoSubnetAnswers = [
                                "kein",
                                "keine",
                                "keiner",
                                "none",
                                "no",
                                "0",
                            ];
                            isCorrect = validNoSubnetAnswers.includes(
                                value.toLowerCase().trim()
                            );
                        } else {
                            // For actual hex subnet values, normalize and compare
                            const normalizeHex = (val) => {
                                if (!val) return "";
                                return val
                                    .toString()
                                    .toLowerCase()
                                    .replace(/^0x/, "")
                                    .trim();
                            };

                            const normalizedUser = normalizeHex(value);
                            const normalizedCorrect =
                                normalizeHex(correctValue);
                            isCorrect = normalizedUser === normalizedCorrect;
                        }
                    } else {
                        // For interfaceId, use hex comparison
                        const normalizeHex = (val) => {
                            if (!val) return "";
                            return val
                                .toString()
                                .toLowerCase()
                                .replace(/^0x/, "")
                                .trim();
                        };

                        const normalizedUser = normalizeHex(value);
                        const normalizedCorrect = normalizeHex(correctValue);
                        isCorrect = normalizedUser === normalizedCorrect;
                    }
                } else {
                    isCorrect =
                        value.toLowerCase() === correctValue.toLowerCase();
                }

                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    inputElement.classList.remove("correct", "wrong");
                    inputElement.classList.add(isCorrect ? "correct" : "wrong");
                }
            } catch (error) {
                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    inputElement.classList.remove("correct");
                    inputElement.classList.add("wrong");
                }
            }
        });
    };

    const renderValue = (id) => {
        if (showAnswers) {
            return ipData[id];
        } else {
            return userInput[id];
        }
    };

    return {
        // State
        ipData,
        userInput,
        showAnswers,
        attention,
        mode,
        generated,
        // Functions
        handleStart,
        handleInputChange,
        handleShowAnswers,
        handleCheck,
        renderValue,
        // Setters
        setAttention,
    };
};
