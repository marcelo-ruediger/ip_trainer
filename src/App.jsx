import { useState } from "react";
import "./App.css";

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

    const [showImage, setShowImage] = useState(false);

    const handleToggle = () => setShowImage((prev) => !prev);

    const resetInputBorders = () => {
        document.querySelectorAll("input").forEach((input) => {
            input.classList.remove("correct", "wrong");
        });
    };

    // Helpers
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

    return (
        <>
            <header>
                <h1>Übung macht den Meister</h1>
            </header>

            <div className="image-toggle-container">
                <label className="toggle-label">
                    <input
                        type="checkbox"
                        checked={showImage}
                        onChange={handleToggle}
                    />
                    Hilfstabelle
                </label>
                <div
                    className={`hidden ${showImage ? "visible" : "invisible"}`}
                >
                    <img src="../public/tabel.png" alt="Toggleable" />
                </div>
            </div>

            <button className="start-btn" onClick={handleStart}>
                IP erzeugen
            </button>
            <main>
                <div className="top-container">
                    <label>
                        IP-Adresse:
                        <br className="responsive-break" />
                        <input value={ipData.ip} disabled />
                    </label>
                    <br className="responsive-break" />
                    {mode === "cidr" ? (
                        <>
                            <label>
                                CIDR:
                                <br className="responsive-break" />
                                <input value={ipData.cidr} disabled />
                            </label>
                            <br className="responsive-break" />
                            <label>
                                Subnetzmaske:
                                <br className="responsive-break" />
                                <input
                                    id="subnetMask"
                                    value={renderValue("subnetMask")}
                                    onChange={handleInputChange}
                                    disabled={showAnswers}
                                />
                            </label>
                        </>
                    ) : (
                        <>
                            <label>
                                CIDR:
                                <br className="responsive-break" />
                                <input
                                    id="cidr"
                                    value={renderValue("cidr")}
                                    onChange={handleInputChange}
                                    disabled={showAnswers}
                                />
                            </label>
                            <br className="responsive-break" />
                            <label>
                                Subnetzmaske:
                                <br className="responsive-break" />
                                <input value={ipData.subnetMask} disabled />
                            </label>
                        </>
                    )}
                </div>

                <div className="middle-container">
                    <label>
                        Netzwerkadresse:
                        <br className="responsive-break" />
                        <input
                            id="networkId"
                            value={renderValue("networkId")}
                            onChange={handleInputChange}
                            disabled={showAnswers}
                        />
                    </label>
                    <label>
                        Broadcast:
                        <br className="responsive-break" />
                        <input
                            id="broadcast"
                            value={renderValue("broadcast")}
                            onChange={handleInputChange}
                            disabled={showAnswers}
                        />
                    </label>
                </div>

                <div className="bottom-container">
                    <label>
                        IP-Klasse:
                        <br className="responsive-break" />
                        <input
                            id="ipClass"
                            value={renderValue("ipClass")}
                            onChange={handleInputChange}
                            disabled={showAnswers}
                        />
                    </label>
                    <label>
                        benutzbare IPs:
                        <br className="responsive-break" />
                        <input
                            id="usableIps"
                            value={renderValue("usableIps")}
                            onChange={handleInputChange}
                            disabled={showAnswers}
                        />
                    </label>
                </div>
            </main>

            <div className="bottom-btns">
                <button className="check-answers" onClick={handleCheck}>
                    Überprüfen
                </button>
                <button className="show-answers" onClick={handleShowAnswers}>
                    Antworten anzeigen
                </button>
            </div>

            <footer>
                <p>&copy; 2025 Marcelo Rüdiger · Netzwerktrainer</p>
            </footer>
        </>
    );
}

export default App;
