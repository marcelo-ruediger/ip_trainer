import { useState } from "react";
import { getAllSpecialAddresses } from "../utils/ipv4Utils";
import "../ToggleElements.css";

function ToggleElements({ showImage, onToggle, tableImg }) {
    const [showSpecialAddresses, setShowSpecialAddresses] = useState(false);
    const specialAddresses = getAllSpecialAddresses();

    const handleSpecialAddressesToggle = () => {
        setShowSpecialAddresses(true);
    };

    const closePopup = () => {
        setShowSpecialAddresses(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closePopup();
        }
    };

    // Group addresses by category for better organization
    const groupedAddresses = specialAddresses.reduce((acc, addr) => {
        const category = addr.category || "Sonstige";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(addr);
        return acc;
    }, {});

    // Define the desired order for categories
    const categoryOrder = [
        "Loopback",
        "APIPA",
        "Broadcast",
        "Routing",
        "Private Networks",
        "Public Networks",
        "Classes D and E",
        "Other",
    ];

    // Translation map for categories
    const categoryTranslations = {
        Loopback: "Loopback",
        APIPA: "APIPA",
        Broadcast: "Broadcast",
        Routing: "Routing",
        "Private Networks": "Private Netzwerke",
        "Public Networks": "Öffentliche Netzwerke",
        "Classes D and E": "Klassen D und E",
        Other: "Sonstige",
    };

    // Simplified common use translations (with spaces after /)
    const getSimplifiedDescription = (addr) => {
        const address = addr.address;

        if (address === "127.0.0.1") return "Localhost / Loopback";
        if (address === "169.254.1.1") return "APIPA / Link-lokale Adresse";
        if (address === "255.255.255.255") return "Eingeschränkter Broadcast";
        if (address === "0.0.0.0") return "Default Route / Unspezifiziert";
        if (address === "10.0.0.0")
            return "Private Klasse A - Große Unternehmen";
        if (address === "172.16.0.0")
            return "Private Klasse B - Mittlere Unternehmen";
        if (address === "192.168.0.0")
            return "Private Klasse C - Heimnetzwerke";
        if (address === "1.0.0.0") return "Öffentliche Klasse A Beginn";
        if (address === "128.0.0.0") return "Öffentliche Klasse B Beginn";
        if (address === "192.0.0.0") return "Öffentliche Klasse C Beginn";
        if (address === "224.0.0.0") return "Klasse D Beginn (Multicast)";
        if (address === "240.0.0.0") return "Klasse E Beginn (Reserviert)";

        return addr.commonUse;
    };

    // Function to get info badge for each address
    const getInfoBadge = (addr) => {
        const address = addr.address;

        // Private Networks
        if (address === "10.0.0.0")
            return { text: "Klasse A", class: "class-a" };
        if (address === "172.16.0.0")
            return { text: "Klasse B", class: "class-b" };
        if (address === "192.168.0.0")
            return { text: "Klasse C", class: "class-c" };

        // Public Networks
        if (address === "1.0.0.0")
            return { text: "Klasse A", class: "class-a" };
        if (address === "128.0.0.0")
            return { text: "Klasse B", class: "class-b" };
        if (address === "192.0.0.0")
            return { text: "Klasse C", class: "class-c" };

        // Special addresses
        if (address === "127.0.0.1") return { text: "System", class: "system" };
        if (address === "169.254.1.1")
            return { text: "Link-Local", class: "network" };
        if (address === "255.255.255.255")
            return { text: "Broadcast", class: "special" };
        if (address === "0.0.0.0") return { text: "Default", class: "routing" };
        if (address === "224.0.0.0")
            return { text: "Klasse D", class: "class-d" };
        if (address === "240.0.0.0")
            return { text: "Klasse E", class: "class-e" };

        return null;
    };

    // Function to get special info text
    const getSpecialInfo = (addr) => {
        const address = addr.address;

        if (address === "169.254.1.1")
            return "APIPA = Automatic Private IP Addressing (wenn DHCP fehlschlägt)";
        if (address === "127.0.0.1") return "Immer lokaler Computer";
        if (address === "0.0.0.0") return "Standard-Route";
        if (address === "255.255.255.255")
            return "An alle Geräte im lokalen Netzwerk";
        if (address === "224.0.0.0") return "Multicast - Gruppenkommunkation";
        if (address === "240.0.0.0")
            return "Experimentell / Zukünftige Nutzung";
        if (address === "10.0.0.0")
            return "16,7 Millionen Adressen - Große Unternehmen";
        if (address === "172.16.0.0")
            return "1 Million Adressen - Mittlere Unternehmen";
        if (address === "192.168.0.0")
            return "65.536 Adressen - Heimnetz oder Kleinbüros";
        if (address === "1.0.0.0") return "Internet-routbar";
        if (address === "128.0.0.0") return "Internet-routbar";
        if (address === "192.0.0.0") return "Internet-routbar";

        return null;
    };

    return (
        <>
            <div className="image-toggle-container">
                <label className="toggle-label">
                    <input
                        type="checkbox"
                        checked={showImage}
                        onChange={onToggle}
                    />
                    Hilfstabelle
                </label>

                <label className="toggle-label">
                    <input
                        type="checkbox"
                        checked={false}
                        onChange={handleSpecialAddressesToggle}
                    />
                    Speziellen IPs anzeigen
                </label>
            </div>
            <div className={`hidden ${showImage ? "visible" : "invisible"}`}>
                <img src={tableImg} alt="Toggleable" />
            </div>

            {/* Special Addresses Popup */}
            {showSpecialAddresses && (
                <div className="popup-overlay" onClick={handleOverlayClick}>
                    <div className="popup-content">
                        <div className="popup-header">
                            <h2>Spezielle IPv4-Adressen</h2>
                            <button
                                className="close-button"
                                onClick={closePopup}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="popup-body">
                            <p className="popup-description">
                                Diese Adressen haben besondere Eigenschaften und
                                folgen nicht den standardmäßigen
                                Subnetting-Regeln:
                            </p>

                            {categoryOrder.map((category) => {
                                const addresses = groupedAddresses[category];
                                if (!addresses || addresses.length === 0)
                                    return null;

                                return (
                                    <div
                                        key={category}
                                        className="address-category"
                                    >
                                        <h3 className="category-title">
                                            {categoryTranslations[category] ||
                                                category}
                                        </h3>

                                        {addresses.map((addr, index) => {
                                            const infoBadge =
                                                getInfoBadge(addr);
                                            const specialInfo =
                                                getSpecialInfo(addr);

                                            return (
                                                <div
                                                    key={index}
                                                    className="address-item"
                                                >
                                                    <div className="address-main">
                                                        <span className="ip-address">
                                                            {addr.address}
                                                        </span>
                                                        {infoBadge && (
                                                            <span
                                                                className={`info-badge ${infoBadge.class}`}
                                                            >
                                                                {infoBadge.text}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="address-details">
                                                        <p className="common-use">
                                                            {getSimplifiedDescription(
                                                                addr
                                                            )}
                                                        </p>
                                                        {addr.range && (
                                                            <p className="range">
                                                                Bereich:{" "}
                                                                {addr.range}
                                                            </p>
                                                        )}
                                                        {specialInfo && (
                                                            <p className="special-info">
                                                                {specialInfo}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ToggleElements;
