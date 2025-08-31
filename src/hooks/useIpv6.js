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

        // Set bottom buttons attention when user starts inputting (but not when answers are shown)
        if (!showAnswers && ipData.ipv6 && value.trim() !== "") {
            setBottomButtonsAttention(true);
        }
    };

    const handleShowAnswers = () => {
        // Don't execute if no IPv6 data is generated
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
        setAttention(true); // Highlight generate buttons
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
        // Don't execute if no IPv6 data is generated
        if (!ipData.ipv6) {
            return;
        }

        resetInputBorders();
        setShowCheckResults(false); // Reset check results display

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
                results.push({
                    field: fieldId,
                    isCorrect: false,
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
                        // Support both single groups (e.g., "1234") and multi-groups (e.g., "0000:1234")
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
                        // Accept abbreviated IPv6 interface formats like ::1, ::abcd:1234, etc.
                        // OR text answers for "no interface" (for /64 or longer prefixes)
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
                        // For interfaceId, check for "kein" answers first
                        if (correctValue === "kein") {
                            // Accept multiple valid German and English responses for "no interface"
                            const validNoInterfaceAnswers = [
                                "kein",
                                "keine",
                                "keiner",
                                "none",
                                "no",
                                "0",
                            ];
                            isCorrect = validNoInterfaceAnswers.includes(
                                value.toLowerCase().trim()
                            );
                        } else {
                            // For actual interface values, compare as IPv6 segments
                            // Both values should be treated as IPv6 interface parts (last 64 bits)
                            const normalizeInterfaceId = (val) => {
                                if (!val) return "";
                                let normalized = val
                                    .toString()
                                    .toLowerCase()
                                    .trim();

                                // If it starts with ::, it's already in abbreviated form
                                if (normalized.startsWith("::")) {
                                    return normalized;
                                }

                                // Split by colons and pad to 4 groups for interface portion
                                let groups = normalized.split(":");

                                // Pad with zeros to make it 4 groups (64 bits / 16 bits per group)
                                while (groups.length < 4) {
                                    groups.unshift("0");
                                }

                                // Remove leading zeros from each group
                                groups = groups.map(
                                    (group) => group.replace(/^0+/, "") || "0"
                                );

                                // Check if we can abbreviate with ::
                                // Find longest sequence of consecutive zeros
                                let maxZeroStart = -1;
                                let maxZeroLength = 0;
                                let currentZeroStart = -1;
                                let currentZeroLength = 0;

                                for (let i = 0; i < groups.length; i++) {
                                    if (groups[i] === "0") {
                                        if (currentZeroStart === -1) {
                                            currentZeroStart = i;
                                            currentZeroLength = 1;
                                        } else {
                                            currentZeroLength++;
                                        }
                                    } else {
                                        if (currentZeroLength > maxZeroLength) {
                                            maxZeroStart = currentZeroStart;
                                            maxZeroLength = currentZeroLength;
                                        }
                                        currentZeroStart = -1;
                                        currentZeroLength = 0;
                                    }
                                }

                                // Check if the last sequence was the longest
                                if (currentZeroLength > maxZeroLength) {
                                    maxZeroStart = currentZeroStart;
                                    maxZeroLength = currentZeroLength;
                                }

                                // Compress with :: if we have 2+ consecutive zeros
                                if (maxZeroLength >= 2) {
                                    const before = groups.slice(
                                        0,
                                        maxZeroStart
                                    );
                                    const after = groups.slice(
                                        maxZeroStart + maxZeroLength
                                    );

                                    if (
                                        before.length === 0 &&
                                        after.length === 0
                                    ) {
                                        return "::";
                                    } else if (before.length === 0) {
                                        return "::" + after.join(":");
                                    } else if (after.length === 0) {
                                        return before.join(":") + "::";
                                    } else {
                                        return (
                                            before.join(":") +
                                            "::" +
                                            after.join(":")
                                        );
                                    }
                                }

                                return groups.join(":");
                            };

                            const normalizedUser = normalizeInterfaceId(value);
                            const normalizedCorrect =
                                normalizeInterfaceId(correctValue);
                            isCorrect = normalizedUser === normalizedCorrect;
                        }
                    }
                } else if (fieldId === "networkAddress") {
                    // Special comparison for IPv6 network addresses - normalize both addresses
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

                results.push({ field: fieldId, isCorrect, value });
            } catch (error) {
                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    inputElement.classList.remove("correct");
                    inputElement.classList.add("wrong");
                }
                results.push({ field: fieldId, isCorrect: false, value });
            }
        });

        // Only show check results if we have any results from user-filled fields
        if (results.length > 0) {
            setCheckResults(results);
            setShowCheckResults(true);
            setBottomButtonsAttention(false); // Remove attention after check

            // If all answers are correct, give attention to top buttons
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
        // State
        ipData,
        userInput,
        showAnswers,
        attention,
        mode,
        generated,
        checkResults,
        showCheckResults,
        bottomButtonsAttention,
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
