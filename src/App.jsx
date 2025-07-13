import { useState } from "react";
import "./App.css";
import tableImg from "./images/table.png";
import Header from "./components/Header";
import ImageToggle from "./components/ImageToggle";
import TopInputs from "./components/TopInputs";
import MiddleInputs from "./components/MiddleInputs";
import BottomInputs from "./components/BottomInputs";
import Footer from "./components/Footer";
import BottomButtons from "./components/BottomButtons";
import TopInputsIPv6 from "./components/TopInputsIPv6";
import MiddleInputsIPv6 from "./components/MiddleInputsIPv6";
import BottomInputsIPv6 from "./components/BottomInputsIPv6";
import IpVersionButtons from "./components/IpVersionButtons";

// ---------------------------- States ---------------------------//
function App() {
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

    const [showAnswers, setShowAnswers] = useState(false); // Controls visibility of the answers

    const [mode, setMode] = useState("cidr"); // or 'mask'

    const [ipVersion, setIpVersion] = useState("ipv4"); // "ipv4" or "ipv6"

    const [showImage, setShowImage] = useState(false); // Controls visibility of the table

    const [attention, setAttention] = useState(true); // Attention state for user input

    const [ipValid, setIpValid] = useState(null); // Tracks if the IP input is valid or not

    const [cidrValid, setCidrValid] = useState(null); // Tracks if the CIDR input is valid or not

    const [subnetMaskValid, setSubnetMaskValid] = useState(null); // Tracks if the Subnet Mask input is valid or not

    const [generated, setGenerated] = useState({ cidr: "", subnetMask: "" }); // Tracks generated values for CIDR and subnet mask

    const [userIsInputting, setUserIsInputting] = useState(false); // Tracks if user is manually inputting an IP

    // --------------- Functions ------------------------------//
    const maskToCidr = (subnetMask) => {
        try {
            const octets = subnetMask.split(".").map(Number);
            if (
                octets.length !== 4 ||
                octets.some((octet) => octet < 0 || octet > 255)
            ) {
                return null;
            }

            let binaryStr = "";
            for (let octet of octets) {
                binaryStr += octet.toString(2).padStart(8, "0");
            }

            // Check if it's a valid subnet mask (all 1s followed by all 0s)
            const match = binaryStr.match(/^(1*)(0*)$/);
            if (!match) return null;

            return match[1].length;
        } catch {
            return null;
        }
    };

    const handleIpInput = (e) => {
        // Reset everything when user starts inputting manually
        resetInputBorders();
        setUserIsInputting(true);
        setShowAnswers(false); // Hide any shown answers
        
        // Clear all user inputs
        setUserInput({
            networkId: "",
            broadcast: "",
            ipClass: "",
            usableIps: "",
            cidr: "",
            subnetMask: "",
        });
        
        // Clear generated values
        setGenerated({
            cidr: "",
            subnetMask: "",
        });

        const value = e.target.value;

        // Update ipData with just the IP and clear other fields
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

        // Reset ALL validation states
        setCidrValid(null);
        setSubnetMaskValid(null);

        // Validate IP address
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

        // Only proceed if we have a valid IP address
        if (!ipValid || !currentIp) {
            setIpData((prev) => ({
                ...prev,
                [inputType]: value,
            }));
            // Reset validation states when IP is not valid
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
            // Handle CIDR input
            const cidrValue = value.replace("/", "");

            // Check if input is empty
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
            // Handle Subnet Mask input

            // Check if input is empty
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

        // Update the input value regardless of validity
        setIpData((prev) => ({
            ...prev,
            [inputType]:
                inputType === "cidr"
                    ? value.startsWith("/")
                        ? value
                        : `/${value}`
                    : value,
        }));

        // If input is valid, calculate and update network data
        if (isInputValid && cidr !== null) {
            const networkData = calculateNetworkData(currentIp, cidr);

            // Store both CIDR and subnet mask in generated state
            setGenerated({
                cidr: `/${cidr}`,
                subnetMask: subnetMask,
            });

            // Update ipData with calculated network information
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

            // Clear user inputs since we now have calculated data
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

    const handleToggle = () => setShowImage((prev) => !prev);

    const resetInputBorders = () => {
        document.querySelectorAll("input").forEach((input) => {
            input.classList.remove("correct", "wrong");
        });
    };

    const getRandomIp = () => {
        return Array(4)
            .fill(0)
            .map(() => Math.floor(Math.random() * 256))
            .join(".");
    };

    const getRandomCIDR = () => {
        const commonCidrs = [8, 16, 24, 25, 26, 27, 28, 29, 30];
        const allCidrs = Math.ceil(Math.random() * 31);
        return Math.random() < 0.5
            ? commonCidrs[Math.floor(Math.random() * commonCidrs.length)]
            : allCidrs;
    };

    const cidrToMask = (cidr) => {
        const mask = [];
        for (let i = 0; i < 4; i++) {
            const bits = Math.min(8, cidr);
            mask.push(256 - Math.pow(2, 8 - bits));
            cidr -= bits;
        }
        return mask.join(".");
    };

    const calculateNetworkData = (ipStr, cidr) => {
        const ip = ipStr.split(".").map(Number);
        const mask = cidrToMask(cidr).split(".").map(Number);

        const network = ip.map((octet, i) => octet & mask[i]);
        const broadcast = ip.map((octet, i) => octet | (~mask[i] & 255));

        let usable = Math.pow(2, 32 - cidr);
        usable = cidr >= 31 ? 0 : usable - 2;

        let ipClass = "";
        if (ip[0] >= 1 && ip[0] <= 126) ipClass = "A";
        else if (ip[0] >= 128 && ip[0] <= 191) ipClass = "B";
        else if (ip[0] >= 192 && ip[0] <= 223) ipClass = "C";
        else if (ip[0] >= 224 && ip[0] <= 239) ipClass = "D";
        else ipClass = "E";

        return {
            networkId: network.join("."),
            broadcast: broadcast.join("."),
            ipClass,
            usableIps: usable.toString(),
        };
    };

    const handleStart = () => {
        // IPv4 - Generates a random IPv4 address and calculates network data//
        resetInputBorders();
        
        // Reset ALL states when starting automatic generation
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

        // Save both generated values to use later as correct answers
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
        // Always fill both fields from ipData
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
            // Show answers mode - always use ipData
            return ipData[id];
        } else if (userIsInputting && ipData[id] && id !== "ip" && id !== "cidr" && id !== "subnetMask") {
            // User input mode with calculated network data - show calculated values for network fields
            return ipData[id];
        } else {
            // Practice mode or no calculated data - use userInput
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
            const value = userInput[fieldId]?.trim();
            if (value === undefined) return; // Empty fields are ignored

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

    // IPv6 --------------------------------------------------------------------//
    const handleStartIPv6 = () => {
        setAttention(false);
        resetInputBorders();
        const ipv6 = getRandomIPv6();
        // You can set a random prefix length, e.g. /64
        const netzpraefix = "/64";
        setIpData({
            ipv6,
            netzpraefix,
            abkuerzung: "", // You can add logic for abbreviation if needed
            netzwerkadresse: "", // Fill as needed
            // ...other IPv6 fields
        });
        setShowAnswers(false);
        setUserInput({
            abkuerzung: "",
            netzwerkadresse: "",
            netzpraefix: "",
            typ: "",
            benutzbareIps: "",
            // ...other IPv6 fields
        });
    };

    function getRandomIPv6() {
        // Generates 8 groups of 4 hex digits
        const groups = [];
        for (let i = 0; i < 8; i++) {
            let group = Math.floor(Math.random() * 0x10000).toString(16);
            // Pad with leading zeros to ensure 4 digits
            group = group.padStart(4, "0");
            groups.push(group);
        }
        return groups.join(":");
    }

    // -------------------------- JSX ----------------------------------//

    return (
        <>
            <Header />
            <ImageToggle
                showImage={showImage}
                onToggle={handleToggle}
                tableImg={tableImg}
            />

            <IpVersionButtons
                ipVersion={ipVersion}
                attention={attention}
                setAttention={setAttention}
                handleStartIPv4={() => {
                    setIpVersion("ipv4");
                    handleStart();
                }}
                handleStartIPv6={() => {
                    setIpVersion("ipv6");
                    handleStartIPv6();
                }}
            />

            <main>
                {ipVersion === "ipv4" ? (
                    <>
                        <TopInputs
                            ipData={ipData}
                            mode={mode}
                            // renderValue={renderValue}
                            handleInputChange={handleInputChange}
                            // showAnswers={showAnswers}
                            onIpInput={handleIpInput}
                            onCidrOrMaskInput={handleCidrOrMaskInput}
                            ipValid={ipValid}
                            cidrValid={cidrValid}
                            subnetMaskValid={subnetMaskValid}
                            attention={attention}
                            userInput={userInput}
                            generated={generated}
                            userIsInputting={userIsInputting}
                        />
                        <MiddleInputs
                            renderValue={renderValue}
                            handleInputChange={handleInputChange}
                            showAnswers={showAnswers}
                        />
                        <BottomInputs
                            renderValue={renderValue}
                            handleInputChange={handleInputChange}
                            showAnswers={showAnswers}
                        />
                    </>
                ) : (
                    <>
                        <TopInputsIPv6
                            ipData={ipData}
                            mode={mode}
                            renderValue={renderValue}
                            handleInputChange={handleInputChange}
                            showAnswers={showAnswers}
                        />
                        <MiddleInputsIPv6
                            renderValue={renderValue}
                            handleInputChange={handleInputChange}
                            showAnswers={showAnswers}
                        />
                        <BottomInputsIPv6
                            renderValue={renderValue}
                            handleInputChange={handleInputChange}
                            showAnswers={showAnswers}
                        />
                    </>
                )}
            </main>
            <BottomButtons
                handleShowAnswers={handleShowAnswers}
                handleCheck={handleCheck}
            />
            <Footer />
        </>
    );
}

export default App;
