import { useState } from "react";
import { getRandomIPv6 } from "../utils/ipv6Utils";
import { resetInputBorders } from "../utils/commonUtils";

export const useIPv6 = () => {
    const [ipData, setIpData] = useState({
        ipv6: "",
        netzpraefix: "",
        abkuerzung: "",
        netzwerkadresse: "",
        typ: "",
        benutzbareIps: "",
    });

    const [userInput, setUserInput] = useState({
        abkuerzung: "",
        netzwerkadresse: "",
        netzpraefix: "",
        typ: "",
        benutzbareIps: "",
    });

    const [showAnswers, setShowAnswers] = useState(false);
    const [attention, setAttention] = useState(true);

    const handleStart = () => {
        setAttention(false);
        resetInputBorders();
        const ipv6 = getRandomIPv6();
        const netzpraefix = "/64";

        setIpData({
            ipv6,
            netzpraefix,
            abkuerzung: "",
            netzwerkadresse: "",
            typ: "",
            benutzbareIps: "",
        });

        setShowAnswers(false);
        setUserInput({
            abkuerzung: "",
            netzwerkadresse: "",
            netzpraefix: "",
            typ: "",
            benutzbareIps: "",
        });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserInput((prev) => ({ ...prev, [id]: value }));
    };

    const renderValue = (id) => {
        return showAnswers ? ipData[id] : userInput[id];
    };

    return {
        // State
        ipData,
        userInput,
        showAnswers,
        attention,
        // Functions
        handleStart,
        handleInputChange,
        renderValue,
        // Setters
        setAttention,
    };
};
