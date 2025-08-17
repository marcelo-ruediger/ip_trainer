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

    // Define the desired order for categories (removed Multicast)
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

    // Translation map for categories (removed Multicast)
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

    // Translation map for common use descriptions (removed multicast entries)
    const commonUseTranslations = {
        "Localhost/ Loopback": "Localhost/ Loopback",
        "APIPA/ Link-local address": "APIPA/ Link-lokale Adresse",
        "Limited broadcast": "Eingeschränkter Broadcast",
        "Default route/ Unspecified": "Standard-Route/ Unspezifiziert",
        "Class D start (Multicast)": "Klasse D Beginn (Multicast)",
        "Class E start (Reserved)": "Klasse E Beginn (Reserviert)",
        "Private Class A - Large enterprises":
            "Private Klasse A - Große Unternehmen",
        "Private Class B - Medium businesses":
            "Private Klasse B - Mittlere Unternehmen",
        "Private Class C - Home networks": "Private Klasse C - Heimnetzwerke",
        "Public Class A start": "Öffentliche Klasse A Beginn",
        "Public Class B start": "Öffentliche Klasse B Beginn",
        "Public Class C start": "Öffentliche Klasse C Beginn",
    };

    // Translation map for special rules (updated multicast rule)
    const specialRulesTranslations = {
        "Always refers to local machine, cannot be subnetted":
            "Verweist immer auf lokale Maschine, kann nicht in Subnetze unterteilt werden",
        "Auto-assigned when DHCP fails":
            "Automatisch zugewiesen wenn DHCP fehlschlägt",
        "Broadcast to all hosts on local network":
            "Broadcast an alle Hosts im lokalen Netzwerk",
        "Default route or unspecified address":
            "Standard-Route oder unspezifizierte Adresse",
        "Start of Class D address space - multicast":
            "Beginn des Klasse D Adressraums - Multicast",
        "Start of Class E - reserved for future use":
            "Beginn der Klasse E - für zukünftige Nutzung reserviert",
        "Largest private address space - enterprise networks":
            "Größter privater Adressraum - Unternehmensnetzwerke",
        "Medium-sized private networks - business environments":
            "Mittelgroße private Netzwerke - Geschäftsumgebungen",
        "Small private networks - home routers and small offices":
            "Kleine private Netzwerke - Heimrouter und kleine Büros",
        "Public Class A addresses - globally routable":
            "Öffentliche Klasse A Adressen - global routbar",
        "Public Class B addresses - globally routable":
            "Öffentliche Klasse B Adressen - global routbar",
        "Public Class C addresses - globally routable":
            "Öffentliche Klasse C Adressen - global routbar",
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
            return { text: "Broadcast", class: "special" }; // Blue/Purple gradient
        if (address === "0.0.0.0") return { text: "Default", class: "routing" }; // Different purple gradient
        if (address === "224.0.0.0")
            return { text: "Klasse D", class: "class-d" }; // Purple
        if (address === "240.0.0.0")
            return { text: "Klasse E", class: "class-e" }; // Pink

        return null;
    };

    // Function to get special info text
    const getSpecialInfo = (addr) => {
        const address = addr.address;

        if (address === "169.254.1.1")
            return "APIPA = Automatic Private IP Addressing (wenn DHCP fehlschlägt)";
        if (address === "127.0.0.1") return "Immer lokaler Computer";
        if (address === "0.0.0.0") return "Default Route";
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

                            {/* Use ordered categories instead of Object.entries */}
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

                                        {addresses.map((addr, index) => (
                                            <div
                                                key={index}
                                                className="address-item"
                                            >
                                                <div className="address-main">
                                                    <span className="ip-address">
                                                        {addr.address}
                                                    </span>
                                                    {/* Display info badge if available */}
                                                    {getInfoBadge(addr) && (
                                                        <span
                                                            className={`info-badge ${
                                                                getInfoBadge(
                                                                    addr
                                                                ).class
                                                            }`}
                                                        >
                                                            {
                                                                getInfoBadge(
                                                                    addr
                                                                ).text
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="address-details">
                                                    <p className="common-use">
                                                        {commonUseTranslations[
                                                            addr.commonUse
                                                        ] || addr.commonUse}
                                                    </p>
                                                    {addr.range && (
                                                        <p className="range">
                                                            Bereich:{" "}
                                                            {addr.range}
                                                        </p>
                                                    )}
                                                    {addr.specialRules && (
                                                        <p className="special-rules">
                                                            <strong>
                                                                Besonderheit:
                                                            </strong>{" "}
                                                            {specialRulesTranslations[
                                                                addr
                                                                    .specialRules
                                                            ] ||
                                                                addr.specialRules}
                                                        </p>
                                                    )}
                                                    {/* Display special info text if available */}
                                                    {getSpecialInfo(addr) && (
                                                        <p className="special-info">
                                                            {getSpecialInfo(
                                                                addr
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
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
