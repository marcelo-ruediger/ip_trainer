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
        setGeneratedField(null);

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

        const ipInput = e.target;
        if (value.trim() === "") {
            ipInput.classList.remove("correct", "wrong", "empty");
        } else if (!isValid) {
            ipInput.classList.remove("correct");
            ipInput.classList.add("wrong");
        } else {
            ipInput.classList.remove("wrong");
            ipInput.classList.add("correct");

            const specialNetwork = getSpecialAddressFixedNetwork(value);
            if (specialNetwork) {
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
                                element.classList.remove(
                                    "wrong",
                                    "empty",
                                    "attention"
                                );
                                element.classList.add("correct");
                            }
                        });
                    }, 50);
                }
            }
        }
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
                    setCidrValid(false);
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

            setTimeout(() => {
                const fieldsToMark = [
                    "networkId",
                    "broadcast",
                    "ipClass",
                    "usableIps",
                ];

                if (inputType === "cidr") {
                    fieldsToMark.push("subnetMask");
                } else if (inputType === "subnetMask") {
                    fieldsToMark.push("cidr");
                }

                fieldsToMark.forEach((fieldId) => {
                    const element = document.getElementById(fieldId);
                    if (element) {
                        element.classList.remove("wrong", "attention", "empty");
                        element.classList.add("correct");
                    }
                });
            }, 50);
        }
    };

    const isAmbiguousCase = (ip, cidr, generatedField) => {
        if (cidr === 31 || cidr === 32) {
            const ambiguousFields = ["broadcast"];

            return ambiguousFields.includes(generatedField);
        }

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

        do {
            const includeSpecial = Math.random() < 0.3;
            ip = getRandomIp(includeSpecial);

            const specialNetwork = getSpecialAddressFixedNetwork(ip);
            if (specialNetwork) {
                cidr = specialNetwork.cidr;
                subnetMask = specialNetwork.subnetMask;
            } else {
                cidr = getRandomCIDR();
                subnetMask = cidrToMask(cidr);
            }

            data = calculateNetworkData(ip, cidr);

            const isSpecialAddress = !["A", "B", "C", "D", "E"].includes(
                data.ipClass
            );

            let fieldOptions = ["cidr", "subnetMask", "usableIps"];

            if (cidr === 30 || cidr === 31) {
                fieldOptions = fieldOptions.filter((f) => f !== "usableIps");
            }

            if (data && data.usableIps === "kein") {
                fieldOptions = fieldOptions.filter((f) => f !== "usableIps");
            }

            randomField =
                fieldOptions[Math.floor(Math.random() * fieldOptions.length)];

            attempts++;
        } while (
            isAmbiguousCase(ip, cidr, randomField) &&
            attempts < maxAttempts
        );

        setGeneratedField(randomField);

        const initialData = {
            ip,
            cidr: "",
            subnetMask: "",
            networkId: "",
            broadcast: "",
            ipClass: "",
            usableIps: "",
        };

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
        if (!ipData.ip) {
            return;
        }

        if (
            userIsInputting &&
            ipValid &&
            (ipData.cidr || ipData.subnetMask) &&
            ipData.networkId
        ) {
            return;
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
        setAttention(true);
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
            return ipData[id];
        } else {
            return userInput[id];
        }
    };

    const handleCheck = () => {
        if (!ipData.ip) {
            return;
        }

        if (
            userIsInputting &&
            ipValid &&
            (ipData.cidr || ipData.subnetMask) &&
            ipData.networkId
        ) {
            return;
        }

        resetInputBorders();
        setShowCheckResults(false);

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
                    case "broadcast":
                    case "subnetMask": {
                        if (
                            fieldId === "broadcast" ||
                            fieldId === "networkId"
                        ) {
                            const correctValue = generated[fieldId];
                            if (correctValue === "kein") {
                                isValid = isValidNoneValue(value);
                                break;
                            }
                        }
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
                        const validDropdownValues = [
                            "A",
                            "B",
                            "C",
                            "D",
                            "E",
                            "A (privat)",
                            "A (öffentlich)",
                            "B (privat)",
                            "B (öffentlich)",
                            "C (privat)",
                            "C (öffentlich)",
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
                        const correctUsableIps = generated[fieldId];
                        if (
                            correctUsableIps === "kein" ||
                            correctUsableIps === "0"
                        ) {
                            isValid = isValidNoneValue(value);
                        } else {
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

                if (
                    (fieldId === "broadcast" ||
                        fieldId === "networkId" ||
                        fieldId === "usableIps") &&
                    correctValue === "kein"
                ) {
                    isCorrect = isValidNoneValue(value);
                } else if (fieldId === "usableIps" && correctValue === "0") {
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
                    const userValue = value.trim();
                    const correctValue = generated.ipClass.trim();

                    if (/^[A-E]$/.test(correctValue)) {
                        isCorrect = userValue === correctValue;
                    } else if (
                        ["Testnetz-1", "Testnetz-2", "Testnetz-3"].includes(
                            correctValue
                        )
                    ) {
                        isCorrect = userValue === "Dokumentation";
                    } else if (correctValue === "Dokumentation") {
                        isCorrect = userValue === "Dokumentation";
                    } else {
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

    return {
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
        handleIpInput,
        handleCidrOrMaskInput,
        handleStart,
        handleInputChange,
        handleShowAnswers,
        handleCheck,
        renderValue,
        setAttention,
        generatedField,
    };
};
