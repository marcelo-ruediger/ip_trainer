import { useState } from "react";
import { getRandomIPv6, abbreviateIPv6, expandIPv6 } from "../utils/ipv6Utils";
import { resetInputBorders } from "../utils/commonUtils";

export const useIPv6 = () => {
    const [ipData, setIpData] = useState({
        ipv6: "",
        vollstaendig: "", // Full IPv6 address
        abkuerzung: "", // Abbreviated IPv6 address
        netzpraefix: "",
        netzwerkadresse: "",
        typ: "",
        benutzbareIps: "",
    });

    const [userInput, setUserInput] = useState({
        vollstaendig: "",
        abkuerzung: "",
        netzpraefix: "",
        netzwerkadresse: "",
        typ: "",
        benutzbareIps: "",
    });

    const [showAnswers, setShowAnswers] = useState(false);
    const [attention, setAttention] = useState(true);
    const [mode, setMode] = useState("vollstaendig"); // "vollstaendig" or "abkuerzung"
    const [generated, setGenerated] = useState({
        vollstaendig: "",
        abkuerzung: "",
    });

    const handleStart = () => {
        setAttention(false);
        resetInputBorders();

        const ipv6 = getRandomIPv6();
        const abbreviated = abbreviateIPv6(ipv6);
        const netzpraefix = "/64";

        // Randomly choose which field to show (vollständig or abkürzung)
        const newMode = Math.random() < 0.5 ? "vollstaendig" : "abkuerzung";
        setMode(newMode);

        // Store both full and abbreviated versions
        setGenerated({
            vollstaendig: ipv6,
            abkuerzung: abbreviated,
        });

        setIpData({
            ipv6,
            vollstaendig: newMode === "vollstaendig" ? ipv6 : "",
            abkuerzung: newMode === "abkuerzung" ? abbreviated : "",
            netzpraefix,
            netzwerkadresse: "",
            typ: "",
            benutzbareIps: "",
        });

        setShowAnswers(false);
        setUserInput({
            vollstaendig: newMode === "vollstaendig" ? ipv6 : "",
            abkuerzung: newMode === "abkuerzung" ? abbreviated : "",
            netzpraefix: "",
            netzwerkadresse: "",
            typ: "",
            benutzbareIps: "",
        });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserInput((prev) => ({ ...prev, [id]: value }));
    };

    const handleShowAnswers = () => {
        setIpData((prev) => ({
            ...prev,
            vollstaendig: generated.vollstaendig,
            abkuerzung: generated.abkuerzung,
        }));
        setShowAnswers(true);

        const ids = [
            "vollstaendig",
            "abkuerzung",
            "netzpraefix",
            "netzwerkadresse",
            "typ",
            "benutzbareIps",
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
            "vollstaendig",
            "abkuerzung",
            "netzpraefix",
            "netzwerkadresse",
            "typ",
            "benutzbareIps",
        ];

        fieldsToCheck.forEach((fieldId) => {
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
                    case "vollstaendig":
                    case "abkuerzung": {
                        // Basic IPv6 format validation
                        const ipv6Pattern =
                            /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$|^::$|^([0-9a-fA-F]{0,4}:){1,7}:$|^:([0-9a-fA-F]{0,4}:){1,7}$/;
                        isValid =
                            ipv6Pattern.test(value) ||
                            /^([0-9a-fA-F]{4}:){7}[0-9a-fA-F]{4}$/.test(value);
                        break;
                    }
                    case "netzpraefix": {
                        const prefixPattern = /^\/\d{1,3}$/;
                        isValid = prefixPattern.test(value);
                        break;
                    }
                    default:
                        isValid = true; // For other fields, accept any input for now
                }

                if (!isValid) throw new Error("Ungültige Eingabe");

                let correctValue;
                if (fieldId === "vollstaendig" || fieldId === "abkuerzung") {
                    correctValue = generated[fieldId];
                } else {
                    correctValue = ipData[fieldId];
                }

                // Special comparison for IPv6 addresses
                if (fieldId === "vollstaendig") {
                    // Compare expanded versions
                    const userExpanded = expandIPv6(value);
                    const correctExpanded = expandIPv6(correctValue);
                    isCorrect =
                        userExpanded.toLowerCase() ===
                        correctExpanded.toLowerCase();
                } else if (fieldId === "abkuerzung") {
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
            mode === "vollstaendig" ? "vollstaendig" : "abkuerzung";
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
