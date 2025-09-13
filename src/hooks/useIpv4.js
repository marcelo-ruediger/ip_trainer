import { useState } from "react";
import {
    getRandomIp,
    getRandomCIDR,
    cidrToMask,
    maskToCidr,
    calculateNetworkData,
    getSpecialAddressFixedNetwork,
    isValidNoneValue,
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
    const [checkResults, setCheckResults] = useState([]);
    const [showCheckResults, setShowCheckResults] = useState(false);
    const [bottomButtonsAttention, setBottomButtonsAttention] = useState(false);

    const handleIpInput = (e) => {
        resetInputBorders();
        setUserIsInputting(true);
        setHasInputStarted(true);
        setShowAnswers(false);
        setCheckResults([]);
        setShowCheckResults(false);
        setBottomButtonsAttention(false);
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
        setAttention(false);

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
            ipInput.classList.remove("correct", "wrong", "empty");
        } else if (!isValid) {
            // Invalid IP - mark as wrong
            ipInput.classList.remove("correct");
            ipInput.classList.add("wrong");
        } else {
            // Valid IP - mark as correct
            ipInput.classList.remove("wrong");
            ipInput.classList.add("correct");

            // Check if this is a special address with fixed network size
            const specialNetwork = getSpecialAddressFixedNetwork(value);
            if (specialNetwork) {
                // Auto-fill CIDR and subnet mask for special addresses
                const networkData = calculateNetworkData(
                    value,
                    specialNetwork.cidr
                );

                if (networkData) {
                    setIpData({
                        ip: value,
                        cidr: `/${specialNetwork.cidr}`,
                        subnetMask: specialNetwork.subnetMask,
                        networkId: networkData.networkId,
                        broadcast: networkData.broadcast,
                        ipClass: networkData.ipClass,
                        usableIps: networkData.usableIps,
                    });

                    setGenerated({
                        cidr: `/${specialNetwork.cidr}`,
                        subnetMask: specialNetwork.subnetMask,
                        networkId: networkData.networkId,
                        broadcast: networkData.broadcast,
                        usableIps: networkData.usableIps,
                        ipClass: networkData.ipClass,
                    });

                    setCidrValid(true);
                    setSubnetMaskValid(true);
                    setAttention(true);

                    // Mark CIDR and subnet mask inputs as correct immediately
                    setTimeout(() => {
                        const cidrElement = document.getElementById("cidr");
                        const maskElement =
                            document.getElementById("subnetMask");
                        const networkElement =
                            document.getElementById("networkId");
                        const broadcastElement =
                            document.getElementById("broadcast");
                        const usableElement =
                            document.getElementById("usableIps");
                        const ipClassElement =
                            document.getElementById("ipClass");

                        [
                            cidrElement,
                            maskElement,
                            networkElement,
                            broadcastElement,
                            usableElement,
                            ipClassElement,
                        ].forEach((element) => {
                            if (element) {
                                element.classList.remove("wrong", "empty");
                                element.classList.add("correct");
                            }
                        });
                    }, 50);
                }
            }
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

        // Check if this IP has a fixed network size
        const specialNetwork = getSpecialAddressFixedNetwork(currentIp);

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

            setAttention(true);

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

    // Helper function to detect ambiguous cases and suggest better field combinations
    const isAmbiguousCase = (ip, cidr, generatedField) => {
        // For /31 and /32 networks, certain single fields create ambiguity
        if (cidr === 31 || cidr === 32) {
            // These fields alone don't provide enough info to distinguish /31 from /32
            const ambiguousFields = ["broadcast"]; // Both have "kein"

            return ambiguousFields.includes(generatedField);
        }

        // NetworkId generation has been completely removed to avoid ambiguity issues
        // where multiple CIDR values could produce the same network address

        return false;
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
        setCheckResults([]);
        setShowCheckResults(false);
        setBottomButtonsAttention(false);

        let ip, cidr, subnetMask, data, randomField;
        let attempts = 0;
        const maxAttempts = 10;

        // Keep generating until we get a non-ambiguous case
        do {
            // 30% chance to include special addresses for educational purposes
            // Higher percentage because these are important for certification/learning
            const includeSpecial = Math.random() < 0.3;
            ip = getRandomIp(includeSpecial);

            // Check if this IP has special network requirements
            const specialNetwork = getSpecialAddressFixedNetwork(ip);
            if (specialNetwork) {
                // Special addresses must use their fixed CIDR/mask values
                cidr = specialNetwork.cidr;
                subnetMask = specialNetwork.subnetMask;
            } else {
                // Normal addresses can use random CIDR values
                cidr = getRandomCIDR();
                subnetMask = cidrToMask(cidr);
            }

            data = calculateNetworkData(ip, cidr);

            // Check if this is a special address that should auto-fill ipClass
            const isSpecialAddress = !["A", "B", "C", "D", "E"].includes(
                data.ipClass
            );

            // Randomly select which field to generate
            // Only these fields provide unambiguous calculation paths and should be generated:
            // - CIDR: Directly determines all network calculations
            // - Subnet Mask: Directly determines all network calculations
            // - usableIps: Can be calculated from to determine network size
            //
            // Adresstyp (ipClass) should NEVER be generated - user must always calculate it
            let fieldOptions = ["cidr", "subnetMask", "usableIps"];

            // If CIDR is 30 or 31, remove 'usableIps' to avoid edge case ambiguity
            // (both /30 and /31 have very few hosts, making calculation tricky)
            if (cidr === 30 || cidr === 31) {
                fieldOptions = fieldOptions.filter((f) => f !== "usableIps");
            }

            // If this is a special address that returns "kein" for usableIps, don't generate usableIps field
            if (data && data.usableIps === "kein") {
                fieldOptions = fieldOptions.filter((f) => f !== "usableIps");
            }

            randomField =
                fieldOptions[Math.floor(Math.random() * fieldOptions.length)];

            attempts++;

            // Debug logging for ambiguous cases
            if (isAmbiguousCase(ip, cidr, randomField)) {
                console.log(
                    `Avoiding ambiguous case: IP=${ip}, CIDR=/${cidr}, Field=${randomField}`
                );
            }
        } while (
            isAmbiguousCase(ip, cidr, randomField) &&
            attempts < maxAttempts
        );

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

        // Set bottom buttons attention when user starts inputting in practice mode (not input mode and not when answers are shown)
        if (
            !userIsInputting &&
            !showAnswers &&
            ipData.ip &&
            value.trim() !== ""
        ) {
            setBottomButtonsAttention(true);
        }
    };

    const handleShowAnswers = () => {
        // Don't execute if no IP data is generated
        if (!ipData.ip) {
            return;
        }

        // In input mode, once all calculations are complete, don't show answers
        if (
            userIsInputting &&
            ipValid &&
            (ipData.cidr || ipData.subnetMask) &&
            ipData.networkId
        ) {
            return; // Do nothing - keep existing field states and don't change showAnswers
        }

        setUserInput({
            networkId: generated.networkId,
            broadcast: generated.broadcast,
            ipClass: generated.ipClass,
            usableIps: generated.usableIps,
            cidr: generated.cidr,
            subnetMask: generated.subnetMask,
        });
        setShowAnswers(true);
        setAttention(true); // Highlight generate buttons
        setCheckResults([]);
        setShowCheckResults(false);
        setBottomButtonsAttention(false);

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
                    input.classList.remove("correct", "wrong", "empty");
                    input.classList.add("attention");
                } else {
                    input.classList.remove("wrong", "empty");
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
        // Don't execute if no IP data is generated
        if (!ipData.ip) {
            return;
        }

        // In input mode, once all calculations are complete, don't perform any validation
        if (
            userIsInputting &&
            ipValid &&
            (ipData.cidr || ipData.subnetMask) &&
            ipData.networkId
        ) {
            return; // Do nothing - keep existing field states
        }

        resetInputBorders();
        setShowCheckResults(false); // Reset check results display

        const fieldsToCheck = [
            "networkId",
            "broadcast",
            "ipClass",
            "usableIps",
            "cidr",
            "subnetMask",
        ];

        const results = [];

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
                    inputElement.classList.remove("correct", "wrong", "empty");
                    inputElement.classList.add("attention");
                }
                return;
            }

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
                    case "networkId":
                    case "networkId":
                    case "broadcast":
                    case "subnetMask": {
                        // Special validation for fields that can be "kein" for special addresses
                        if (
                            fieldId === "broadcast" ||
                            fieldId === "networkId"
                        ) {
                            // Check if it should be "kein" (for special addresses)
                            const correctValue = generated[fieldId];
                            if (correctValue === "kein") {
                                // Accept comprehensive "none" values using utility function
                                isValid = isValidNoneValue(value);
                                break;
                            }
                        }

                        // Standard IP address validation for networkId, broadcast (when not "kein"), and subnetMask
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
                        // Accept all dropdown values - validation is handled by the dropdown
                        const validDropdownValues = [
                            // Single letter classes
                            "A",
                            "B",
                            "C",
                            "D",
                            "E",
                            // Private/Public class distinctions
                            "A (privat)",
                            "A (öffentlich)",
                            "B (privat)",
                            "B (öffentlich)",
                            "C (privat)",
                            "C (öffentlich)",
                            // Special address types (exact match with dropdown options)
                            "Loopback",
                            "APIPA",
                            "Carrier-Grade NAT",
                            "Dokumentation",
                            "Broadcast",
                            "Unspezifiziert",
                        ];
                        isValid =
                            validDropdownValues.includes(value) || value === "";
                        break;

                    case "usableIps":
                        // Check if the correct answer is "kein" (for special addresses) or "0" (for /32 networks)
                        const correctUsableIps = generated[fieldId];
                        if (
                            correctUsableIps === "kein" ||
                            correctUsableIps === "0"
                        ) {
                            // Use comprehensive validation for "none" values
                            isValid = isValidNoneValue(value);
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
                    // Handle single letter classes (A, B, C, D, E)
                    if (/^[A-E]$/.test(generated.ipClass)) {
                        correctValue = generated.ipClass.toUpperCase();
                    } else if (
                        generated.ipClass.toUpperCase().startsWith("D")
                    ) {
                        correctValue = "D";
                    } else if (
                        generated.ipClass.toUpperCase().startsWith("E")
                    ) {
                        correctValue = "E";
                    } else {
                        // Keep the full special address type for comparison
                        correctValue = generated.ipClass;
                    }
                }

                // Special comparison logic for fields that can be "kein" for special addresses
                if (
                    (fieldId === "broadcast" ||
                        fieldId === "networkId" ||
                        fieldId === "usableIps") &&
                    correctValue === "kein"
                ) {
                    // Use the comprehensive validation function for "none" values
                    isCorrect = isValidNoneValue(value);
                } else if (fieldId === "usableIps" && correctValue === "0") {
                    // Special comparison logic for usableIps when answer is 0 (legacy support)
                    const validZeroAnswers = [
                        "0",
                        "keiner",
                        "kein",
                        "keine",
                        "none",
                        "no",
                    ];
                    isCorrect = validZeroAnswers.includes(value.toLowerCase());
                } else if (fieldId === "ipClass") {
                    // Special comparison logic for IP class with dropdown
                    const userValue = value.trim();
                    const correctValue = generated.ipClass.trim();

                    // For A, B, C classes: extract just the letter from dropdown selection
                    // The dropdown has options like "A (privat)" or "A (öffentlich)" but value is just "A"
                    if (/^[A-E]$/.test(correctValue)) {
                        // Correct answer is a basic class letter
                        isCorrect = userValue === correctValue;
                    } else if (
                        ["Testnetz-1", "Testnetz-2", "Testnetz-3"].includes(
                            correctValue
                        )
                    ) {
                        // Map all documentation test networks to single dropdown option
                        isCorrect = userValue === "Dokumentation";
                    } else if (correctValue === "Dokumentation") {
                        // Direct match for new documentation detection
                        isCorrect = userValue === "Dokumentation";
                    } else {
                        // For other special address types, do exact matching
                        isCorrect = userValue === correctValue;
                    }
                } else {
                    isCorrect =
                        value.replace("/", "").toUpperCase() ===
                        correctValue.replace("/", "").toUpperCase();
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
        checkResults,
        showCheckResults,
        bottomButtonsAttention,
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
