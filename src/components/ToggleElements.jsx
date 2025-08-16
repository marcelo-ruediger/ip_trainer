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

    // Translation map for categories
    const categoryTranslations = {
        Loopback: "Loopback",
        APIPA: "APIPA",
        Documentation: "Dokumentation",
        Multicast: "Multicast",
        Broadcast: "Broadcast",
        Special: "Spezial",
        CGN: "CGN",
        Reserved: "Reserviert",
        Other: "Sonstige",
    };

    // Translation map for importance levels
    const importanceTranslations = {
        Critical: "Kritisch",
        Important: "Wichtig",
        Moderate: "Mäßig",
    };

    // Translation map for common use descriptions
    const commonUseTranslations = {
        "Localhost/Loopback": "Localhost/Loopback",
        "Loopback range example": "Loopback-Bereich Beispiel",
        "APIPA/Link-local address": "APIPA/Link-lokale Adresse",
        "APIPA address": "APIPA-Adresse",
        "APIPA broadcast-like": "APIPA broadcast-ähnlich",
        "TEST-NET-1 documentation": "TEST-NET-1 Dokumentation",
        "TEST-NET-2 documentation": "TEST-NET-2 Dokumentation",
        "TEST-NET-3 documentation": "TEST-NET-3 Dokumentation",
        "Carrier Grade NAT": "Carrier Grade NAT",
        "CGN address": "CGN-Adresse",
        "Limited broadcast": "Eingeschränkter Broadcast",
        "Default route/Unspecified": "Standard-Route/Unspezifiziert",
        "All Hosts multicast": "Alle Hosts Multicast",
        "All Routers multicast": "Alle Router Multicast",
        "Administrative multicast": "Administrativer Multicast",
        "Reserved for future use": "Für zukünftige Nutzung reserviert",
        "Reserved address": "Reservierte Adresse",
    };

    // Translation map for special rules
    const specialRulesTranslations = {
        "Always refers to local machine, cannot be subnetted":
            "Verweist immer auf lokale Maschine, kann nicht in Subnetze unterteilt werden",
        "Auto-assigned when DHCP fails":
            "Automatisch zugewiesen wenn DHCP fehlschlägt",
        "Reserved for documentation and examples":
            "Reserviert für Dokumentation und Beispiele",
        "Shared address space for ISP NAT": "Geteilter Adressraum für ISP NAT",
        "Broadcast to all hosts on local network":
            "Broadcast an alle Hosts im lokalen Netzwerk",
        "Default route or unspecified address":
            "Standard-Route oder unspezifizierte Adresse",
        "Multicast - no traditional subnetting":
            "Multicast - kein traditionelles Subnetting",
        "Reserved for experimental use":
            "Für experimentelle Nutzung reserviert",
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

                <div
                    className={`hidden ${showImage ? "visible" : "invisible"}`}
                >
                    <img src={tableImg} alt="Toggleable" />
                </div>
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

                            {Object.entries(groupedAddresses).map(
                                ([category, addresses]) => (
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
                                                    <span
                                                        className={`importance ${addr.importance?.toLowerCase()}`}
                                                    >
                                                        {importanceTranslations[
                                                            addr.importance
                                                        ] || addr.importance}
                                                    </span>
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
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ToggleElements;
