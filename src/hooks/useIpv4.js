import { useState } from "react";
import {
    getRandomIp,
    getRandomCIDR,
    cidrToMask,
    maskToCidr,
    calculateNetworkData,
} from "../utils/ipv4Utils";
import { resetInputBorders } from "../utils/commonUtils";

export const useIPv4 = () => {
    const [ipData, setIpData] = useState({
        ip: "",
        cidr: "",
        subnetMask: "",
        networkId: "",
        broadcast: "",
        ipClass: "",
        usableIps: "",
    });

    const [userInput, setUserInput] = useState({
        networkId: "",
        broadcast: "",
        ipClass: "",
        usableIps: "",
        cidr: "",
        subnetMask: "",
    });

    const [showAnswers, setShowAnswers] = useState(false);
    const [mode, setMode] = useState("cidr");
    const [attention, setAttention] = useState(true);
    const [ipValid, setIpValid] = useState(null);
    const [cidrValid, setCidrValid] = useState(null);
    const [subnetMaskValid, setSubnetMaskValid] = useState(null);
    const [generated, setGenerated] = useState({ cidr: "", subnetMask: "" });
    const [userIsInputting, setUserIsInputting] = useState(false);
    const [generatedField, setGeneratedField] = useState("");
    const [hasInputStarted, setHasInputStarted] = useState(false);

    const handleIpInput = (e) => {
        resetInputBorders();
        setUserIsInputting(true);
        setHasInputStarted(true);
        setShowAnswers(false);
        setGeneratedField(null); // ← Make sure this is being set to null!

        setUserInput({
            networkId: "",
            broadcast: "",
            ipClass: "",
            usableIps: "",
            cidr: "",
            subnetMask: "",
        });

        setGenerated({
            cidr: "",
            subnetMask: "",
        });

        const value = e.target.value;

        setIpData({
            ip: value,
            cidr: "",
            subnetMask: "",
            networkId: "",
            broadcast: "",
            ipClass: "",
            usableIps: "",
        });
        setAttention(true);

        setCidrValid(null);
        setSubnetMaskValid(null);

        const isValid =
            /^(\d{1,3}\.){3}\d{1,3}$/.test(value) &&
            value
                .split(".")
                .every((octet) => Number(octet) >= 0 && Number(octet) <= 255);

        setIpValid(isValid);

        // Apply visual feedback for invalid IP addresses
        const ipInput = e.target;
        if (value.trim() === "") {
            // Empty input - remove all validation classes
            ipInput.classList.remove("correct", "wrong");
        } else if (!isValid) {
            // Invalid IP - mark as wrong
            ipInput.classList.remove("correct");
            ipInput.classList.add("wrong");
        } else {
            // Valid IP - mark as correct
            ipInput.classList.remove("wrong");
            ipInput.classList.add("correct");
        }

        // Add this line to ensure both CIDR and subnet mask inputs are available
        // You might want to set mode to a neutral state or create a new mode for your TopInputs component
        // setMode("both"); // or whatever logic you need for your TopInputs component
    };

    const handleCidrOrMaskInput = (e, inputType) => {
        const value = e.target.value;
        const currentIp = ipData.ip;

        if (!ipValid || !currentIp) {
            setIpData((prev) => ({
                ...prev,
                [inputType]: value,
            }));
            if (inputType === "cidr") {
                setCidrValid(null);
            } else {
                setSubnetMaskValid(null);
            }
            return;
        }

        let cidr = null;
        let subnetMask = "";
        let isInputValid = false;

        if (inputType === "cidr") {
            const cidrValue = value.replace("/", "");

            if (value.trim() === "" || cidrValue === "") {
                setCidrValid(null);
            } else {
                const cidrNumber = parseInt(cidrValue, 10);

                if (
                    /^\d{1,2}$/.test(cidrValue) &&
                    cidrNumber >= 1 &&
                    cidrNumber <= 32
                ) {
                    cidr = cidrNumber;
                    subnetMask = cidrToMask(cidr);
                    isInputValid = true;
                    setCidrValid(true);
                } else {
                    setCidrValid(false); // <-- Now /0 will be marked as invalid (red)
                }
            }
        } else if (inputType === "subnetMask") {
            if (value.trim() === "") {
                setSubnetMaskValid(null);
            } else {
                const maskPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
                if (maskPattern.test(value)) {
                    const octets = value.split(".").map(Number);
                    if (octets.every((octet) => octet >= 0 && octet <= 255)) {
                        cidr = maskToCidr(value);
                        if (cidr !== null) {
                            subnetMask = value;
                            isInputValid = true;
                            setSubnetMaskValid(true);
                        } else {
                            setSubnetMaskValid(false);
                        }
                    } else {
                        setSubnetMaskValid(false);
                    }
                } else {
                    setSubnetMaskValid(false);
                }
            }
        }

        setIpData((prev) => ({
            ...prev,
            [inputType]:
                inputType === "cidr"
                    ? value.startsWith("/")
                        ? value
                        : `/${value}`
                    : value,
        }));

        if (isInputValid && cidr !== null) {
            const networkData = calculateNetworkData(currentIp, cidr);

            if (networkData === null) {
                // Don't try to access properties if calculation failed
                return;
            }

            setGenerated({
                cidr: `/${cidr}`,
                subnetMask: subnetMask,
            });

            setIpData((prev) => ({
                ...prev,
                cidr:
                    inputType === "cidr"
                        ? value.startsWith("/")
                            ? value
                            : `/${value}`
                        : `/${cidr}`,
                subnetMask: inputType === "subnetMask" ? value : subnetMask,
                networkId: networkData.networkId,
                broadcast: networkData.broadcast,
                ipClass: networkData.ipClass,
                usableIps: networkData.usableIps,
            }));

            setUserInput({
                networkId: "",
                broadcast: "",
                ipClass: "",
                usableIps: "",
                cidr: "",
                subnetMask: "",
            });

            setAttention(false);

            // Mark generated fields as correct immediately
            setTimeout(() => {
                const fieldsToMark = [
                    "networkId",
                    "broadcast",
                    "ipClass",
                    "usableIps",
                ];

                // Mark the complementary field (CIDR or subnet mask) that was auto-generated
                if (inputType === "cidr") {
                    fieldsToMark.push("subnetMask");
                } else if (inputType === "subnetMask") {
                    fieldsToMark.push("cidr");
                }

                fieldsToMark.forEach((fieldId) => {
                    const element = document.getElementById(fieldId);
                    if (element) {
                        element.classList.remove("wrong");
                        element.classList.add("correct");
                    }
                });
            }, 50); // Small delay to ensure DOM is updated
        }
    };

    const handleStart = () => {
        resetInputBorders();

        setIpValid(null);
        setCidrValid(null);
        setSubnetMaskValid(null);
        setAttention(false);
        setUserIsInputting(false);
        setHasInputStarted(false);
        setShowAnswers(false);

        const ip = getRandomIp();
        const cidr = getRandomCIDR();
        const subnetMask = cidrToMask(cidr);
        const data = calculateNetworkData(ip, cidr);

        // Randomly select which field to generate
        const fieldOptions = [
            "cidr",
            "subnetMask",
            "networkId",
            "broadcast",
            "usableIps",
        ];
        const randomField =
            fieldOptions[Math.floor(Math.random() * fieldOptions.length)];
        setGeneratedField(randomField);

        // Create initial data with only IP and the generated field
        const initialData = {
            ip,
            cidr: "",
            subnetMask: "",
            networkId: "",
            broadcast: "",
            ipClass: "",
            usableIps: "",
        };

        // Set the generated field value
        switch (randomField) {
            case "cidr":
                initialData.cidr = `/${cidr}`;
                break;
            case "subnetMask":
                initialData.subnetMask = subnetMask;
                break;
            case "networkId":
                initialData.networkId = data.networkId;
                break;
            case "broadcast":
                initialData.broadcast = data.broadcast;
                break;
            case "usableIps":
                initialData.usableIps = data.usableIps;
                break;
        }

        setGenerated({
            cidr: `/${cidr}`,
            subnetMask,
            networkId: data.networkId,
            broadcast: data.broadcast,
            usableIps: data.usableIps,
            ipClass: data.ipClass,
        });

        setIpData(initialData);
        setShowAnswers(false);

        setUserInput({
            networkId: "",
            broadcast: "",
            ipClass: "",
            usableIps: "",
            cidr: "",
            subnetMask: "",
        });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserInput((prev) => ({ ...prev, [id]: value }));
    };

    const handleShowAnswers = () => {
        setUserInput({
            networkId: generated.networkId,
            broadcast: generated.broadcast,
            ipClass: generated.ipClass,
            usableIps: generated.usableIps,
            cidr: generated.cidr,
            subnetMask: generated.subnetMask,
        });
        setShowAnswers(true);

        const ids = [
            "networkId",
            "broadcast",
            "ipClass",
            "usableIps",
            "cidr",
            "subnetMask",
        ];

        ids.forEach((id) => {
            const input = document.getElementById(id);
            if (input) {
                // If this field was generated (either in training mode or eingabe mode), keep it with attention class
                const isGeneratedField =
                    generatedField === id ||
                    (userIsInputting && ipData[id] && id !== "ip");

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

    const renderValue = (id) => {
        if (showAnswers) {
            return generated[id];
        } else if (ipData[id] && id !== "ip") {
            // Show the generated field value
            return ipData[id];
        } else {
            return userInput[id];
        }
    };

    const handleCheck = () => {
        resetInputBorders();

        const fieldsToCheck = [
            "networkId",
            "broadcast",
            "ipClass",
            "usableIps",
            "cidr",
            "subnetMask",
        ];

        fieldsToCheck.forEach((fieldId) => {
            const displayedValue = renderValue(fieldId);
            const value = displayedValue?.toString().trim();

            // If this field was generated (either in training mode or eingabe mode), keep it with attention class
            const isGeneratedField =
                generatedField === fieldId ||
                (userIsInputting && ipData[fieldId] && fieldId !== "ip");

            if (isGeneratedField) {
                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    inputElement.classList.remove("correct", "wrong");
                    inputElement.classList.add("attention");
                }
                return;
            }

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
                    case "networkId":
                    case "broadcast":
                    case "subnetMask": {
                        // Special validation for broadcast field
                        if (fieldId === "broadcast") {
                            // Check if it should be "keiner" (for /31 and /32 networks)
                            const correctValue = generated[fieldId];
                            if (correctValue === "keiner") {
                                // Accept multiple valid German and English responses for "no broadcast"
                                const validNoBroadcastAnswers = [
                                    "keiner",
                                    "kein",
                                    "keine",
                                    "0",
                                    "none",
                                    "no",
                                ];
                                isValid = validNoBroadcastAnswers.includes(
                                    value.toLowerCase()
                                );
                                break;
                            }
                        }

                        // Standard IP address validation for networkId, broadcast (when not "keiner"), and subnetMask
                        const ipParts = value.split(".");
                        if (ipParts.length !== 4)
                            throw new Error("Falsches Format");
                        isValid = ipParts.every(
                            (part) =>
                                /^\d+$/.test(part) &&
                                Number(part) >= 0 &&
                                Number(part) <= 255
                        );
                        break;
                    }

                    case "cidr": {
                        const cidrValue = value.replace("/", "");
                        const cidrNumber = parseInt(cidrValue, 10);
                        isValid =
                            /^\d{1,2}$/.test(cidrValue) &&
                            cidrNumber >= 0 &&
                            cidrNumber <= 32;
                        break;
                    }

                    case "ipClass":
                        isValid = /^[a-eA-E]$/.test(value);
                        break;

                    case "usableIps":
                        // Check if the correct answer is 0 (for /32 networks)
                        const correctUsableIps = generated[fieldId];
                        if (correctUsableIps === "0") {
                            // Accept multiple valid responses for "no host addresses"
                            const validZeroAnswers = [
                                "0",
                                "keiner",
                                "kein",
                                "keine",
                                "none",
                                "no",
                            ];
                            isValid = validZeroAnswers.includes(
                                value.toLowerCase()
                            );
                        } else {
                            // Standard numeric validation for non-zero values
                            isValid = /^\d+$/.test(value);
                        }
                        break;

                    default:
                        isValid = false;
                }

                if (!isValid) throw new Error("Ungültige Eingabe");

                let correctValue;
                if (
                    fieldId === "cidr" ||
                    fieldId === "subnetMask" ||
                    fieldId === "networkId" ||
                    fieldId === "broadcast" ||
                    fieldId === "usableIps" ||
                    fieldId === "ipClass"
                ) {
                    correctValue = generated[fieldId];
                } else {
                    correctValue = ipData[fieldId];
                }

                if (fieldId === "cidr") {
                    correctValue = correctValue.replace("/", "");
                }
                if (fieldId === "ipClass") {
                    correctValue = generated.ipClass
                        .toUpperCase()
                        .startsWith("D")
                        ? "D"
                        : generated.ipClass.toUpperCase().startsWith("E")
                        ? "E"
                        : generated.ipClass.toUpperCase();
                }

                // Special comparison logic for broadcast field
                if (fieldId === "broadcast" && correctValue === "keiner") {
                    const validNoBroadcastAnswers = [
                        "keiner",
                        "kein",
                        "keine",
                        "0",
                        "none",
                        "no",
                    ];
                    isCorrect = validNoBroadcastAnswers.includes(
                        value.toLowerCase()
                    );
                } else if (fieldId === "usableIps" && correctValue === "0") {
                    // Special comparison logic for usableIps when answer is 0
                    const validZeroAnswers = [
                        "0",
                        "keiner",
                        "kein",
                        "keine",
                        "none",
                        "no",
                    ];
                    isCorrect = validZeroAnswers.includes(value.toLowerCase());
                } else {
                    isCorrect =
                        value.replace("/", "").toUpperCase() ===
                        correctValue.replace("/", "").toUpperCase();
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

    return {
        // State
        ipData,
        userInput,
        showAnswers,
        mode,
        attention,
        ipValid,
        cidrValid,
        subnetMaskValid,
        generated,
        userIsInputting,
        hasInputStarted,
        // Functions
        handleIpInput,
        handleCidrOrMaskInput,
        handleStart,
        handleInputChange,
        handleShowAnswers,
        handleCheck,
        renderValue,
        // Setters (if needed elsewhere)
        setAttention,
        generatedField,
    };
};
