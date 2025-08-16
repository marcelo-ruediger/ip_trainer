import { useState } from "react";
import {
    generateIPv6WithPrefix,
    abbreviateIPv6,
    expandIPv6,
    calculateIPv6NetworkData,
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
        usableIps: "",
    });

    const [userInput, setUserInput] = useState({
        fullAddress: "",
        abbreviatedAddress: "",
        networkPrefix: "",
        networkAddress: "",
        type: "",
        usableIps: "",
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

        // Store both full and abbreviated versions
        setGenerated({
            fullAddress: ipv6,
            abbreviatedAddress: abbreviated,
        });

        setIpData({
            ipv6,
            fullAddress: newMode === "fullAddress" ? ipv6 : "",
            abbreviatedAddress:
                newMode === "abbreviatedAddress" ? abbreviated : "",
            networkPrefix: prefix,
            networkAddress: networkData.networkAddress,
            type: networkData.type,
            usableIps: networkData.usableIps,
        });

        setShowAnswers(false);
        setUserInput({
            fullAddress: newMode === "fullAddress" ? ipv6 : "",
            abbreviatedAddress:
                newMode === "abbreviatedAddress" ? abbreviated : "",
            networkPrefix: prefix, // Show the prefix to the user
            networkAddress: "",
            type: "",
            usableIps: "",
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
        }));
        setShowAnswers(true);

        const ids = [
            "fullAddress",
            "abbreviatedAddress",
            "networkPrefix",
            "networkAddress",
            "type",
            "usableIps",
        ];
        ids.forEach((id) => {
            const input = document.getElementById(id);
            if (input) {
                input.classList.remove("wrong");
                input.classList.add("correct");
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
            "usableIps",
        ];

        fieldsToCheck.forEach((fieldId) => {
            // Skip validation for provided data (pre-filled fields)
            if (
                fieldId === "networkPrefix" ||
                (fieldId === "fullAddress" && mode === "fullAddress") ||
                (fieldId === "abbreviatedAddress" &&
                    mode === "abbreviatedAddress")
            ) {
                // Mark provided data as correct
                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    inputElement.classList.remove("wrong");
                    inputElement.classList.add("correct");
                }
                return; // Skip validation for provided data
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
                    default:
                        isValid = true; // For other fields, accept any input for now
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

        // Mark the generated field as correct
        const generatedFieldId =
            mode === "fullAddress" ? "fullAddress" : "abbreviatedAddress";
        const generatedElement = document.getElementById(generatedFieldId);
        if (generatedElement) {
            generatedElement.classList.remove("wrong");
            generatedElement.classList.add("correct");
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
