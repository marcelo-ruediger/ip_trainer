import { useState } from "react";
import "./App.css";
import tableImg from "../public/table.png";
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

    const [showAnswers, setShowAnswers] = useState(false);

    const [mode, setMode] = useState("cidr"); // or 'mask'

    const [ipVersion, setIpVersion] = useState("ipv4"); // "ipv4" or "ipv6"

    const [showImage, setShowImage] = useState(false);

    const [attention, setAttention] = useState(true);

    const [ipValid, setIpValid] = useState(null);

    // --------------- Functions ------------------------------//
    const handleIpInput = (e) => {
        const value = e.target.value;
        setIpData((prev) => ({ ...prev, ip: value }));

        // Prüfe, ob die IP gültig ist
        const isValid =
            /^(\d{1,3}\.){3}\d{1,3}$/.test(value) &&
            value
                .split(".")
                .every((octet) => Number(octet) >= 0 && Number(octet) <= 255);

        setIpValid(isValid);

        if (isValid) {
            // Berechne alles neu (z.B. CIDR, Subnetzmaske, etc.)
            const cidr = ipData.cidr.replace("/", "") || 24; // oder Standardwert
            const data = calculateNetworkData(value, cidr);
            setIpData((prev) => ({
                ...prev,
                ...data,
                ip: value,
            }));
            setUserInput((prev) => ({
                ...prev,
                ...data,
            }));
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
        const cidrs = [8, 16, 24, 25, 26, 27, 28, 29, 30];
        return cidrs[Math.floor(Math.random() * cidrs.length)];
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
        setAttention(false);
        resetInputBorders();
        const ip = getRandomIp();
        const cidr = getRandomCIDR();
        const subnetMask = cidrToMask(cidr);
        const data = calculateNetworkData(ip, cidr);

        const newMode = Math.random() < 0.5 ? "cidr" : "mask";
        setMode(newMode);

        setIpData({
            ip,
            cidr: `/${cidr}`,
            subnetMask,
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

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserInput((prev) => ({ ...prev, [id]: value }));
    };

    const handleShowAnswers = () => {
        setUserInput(ipData);
        const ids = ["networkId", "broadcast", "ipClass", "usableIps"];
        if (mode === "cidr") {
            ids.push("subnetMask");
        } else {
            ids.push("cidr");
        }
        ids.forEach((id) => {
            const input = document.getElementById(id);
            if (input) {
                input.classList.remove("wrong");
                input.classList.add("correct");
            }
        });
    };

    const renderValue = (id) => {
        return showAnswers ? ipData[id] : userInput[id];
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
            if (value === undefined) return; // Keine Eingabe → überspringen

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

                let correctValue = ipData[fieldId];
                if (fieldId === "cidr") {
                    correctValue = ipData.cidr.replace("/", "");
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
                            renderValue={renderValue}
                            handleInputChange={handleInputChange}
                            showAnswers={showAnswers}
                            onIpInput={handleIpInput}
                            ipValid={ipValid}
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
