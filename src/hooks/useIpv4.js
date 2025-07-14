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

    const handleIpInput = (e) => {
        resetInputBorders();
        setUserIsInputting(true);
        setShowAnswers(false);

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
                    cidrNumber >= 0 &&
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
        }
    };

    const handleStart = () => {
        resetInputBorders();

        setIpValid(null);
        setCidrValid(null);
        setSubnetMaskValid(null);
        setAttention(false);
        setUserIsInputting(false);
        setShowAnswers(false);

        const ip = getRandomIp();
        const cidr = getRandomCIDR();
        const subnetMask = cidrToMask(cidr);
        const data = calculateNetworkData(ip, cidr);

        const newMode = Math.random() < 0.5 ? "cidr" : "mask";
        setMode(newMode);

        setGenerated({
            cidr: `/${cidr}`,
            subnetMask,
        });

        setIpData({
            ip,
            cidr: newMode === "cidr" ? `/${cidr}` : "",
            subnetMask: newMode === "mask" ? subnetMask : "",
            ...data,
        });

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
            ...ipData,
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
                input.classList.remove("wrong");
                input.classList.add("correct");
            }
        });
    };

    const renderValue = (id) => {
        if (showAnswers) {
            return ipData[id];
        } else if (userIsInputting && ipData[id] && id !== "ip") {
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
                        isValid = /^\d+$/.test(value);
                        break;

                    default:
                        isValid = false;
                }

                if (!isValid) throw new Error("Ungültige Eingabe");

                let correctValue;
                if (fieldId === "cidr" || fieldId === "subnetMask") {
                    correctValue = generated[fieldId];
                } else {
                    correctValue = ipData[fieldId];
                }

                if (fieldId === "cidr") {
                    correctValue = correctValue.replace("/", "");
                }
                if (fieldId === "ipClass") {
                    correctValue = ipData.ipClass.toUpperCase().startsWith("D")
                        ? "D"
                        : ipData.ipClass.toUpperCase().startsWith("E")
                        ? "E"
                        : ipData.ipClass.toUpperCase();
                }

                isCorrect =
                    value.replace("/", "").toUpperCase() ===
                    correctValue.replace("/", "").toUpperCase();

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

        const generatedFieldId = mode === "mask" ? "subnetMask" : "cidr";
        const generatedElement = document.getElementById(generatedFieldId);
        if (generatedElement) {
            generatedElement.classList.remove("wrong");
            generatedElement.classList.add("correct");
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
    };
};
