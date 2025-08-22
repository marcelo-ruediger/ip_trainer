import { useState } from "react";
import { getAllSpecialAddresses } from "../utils/ipv4Utils";
import { getAllSpecialAddresses as getAllIPv6SpecialAddresses } from "../utils/ipv6Utils";
import "../ToggleElements.css";

function ToggleElements({ showImage, onToggle, tableImg, ipVersion }) {
    const [showSpecialAddresses, setShowSpecialAddresses] = useState(false);

    // Use appropriate special addresses based on IP version
    const specialAddresses =
        ipVersion === "ipv6"
            ? getAllIPv6SpecialAddresses()
            : getAllSpecialAddresses();

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

    // Define the desired order for categories based on IP version
    const categoryOrder =
        ipVersion === "ipv6"
            ? [
                  "Loopback",
                  "Unspecified",
                  "Documentation",
                  "Link-Local",
                  "Private Networks",
                  "Global Unicast",
                  "Multicast",
                  "Transition",
                  "Other",
              ]
            : [
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
    const categoryTranslations =
        ipVersion === "ipv6"
            ? {
                  Loopback: "Loopback",
                  Unspecified: "Unspezifiziert",
                  Documentation: "Dokumentation",
                  "Link-Local": "Link-Local",
                  "Private Networks": "Private Netzwerke",
                  "Global Unicast": "Global Unicast",
                  Multicast: "Multicast",
                  Transition: "Übergang",
                  Other: "Sonstige",
              }
            : {
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

        if (ipVersion === "ipv6") {
            // IPv6 address badges

            // Loopback
            if (address === "::1") return { text: "System", class: "system" };

            // Unspecified
            if (address === "::")
                return { text: "Unspezifiziert", class: "unspecified" };

            // Documentation
            if (address === "2001:db8::")
                return { text: "Dokumentation", class: "documentation" };

            // Link-Local
            if (address === "fe80::")
                return { text: "Link-Local", class: "link-local" };

            // Private Networks (ULA)
            if (address === "fc00::")
                return { text: "ULA zentral", class: "private" };
            if (address === "fd00::")
                return { text: "ULA lokal", class: "private" };

            // Global Unicast
            if (address === "2001::")
                return { text: "Global 2xxx", class: "global" };
            if (address === "3000::")
                return { text: "Global 3xxx", class: "global" };

            // Multicast
            if (address === "ff00::")
                return { text: "Multicast", class: "multicast" };
            if (address === "ff02::1")
                return { text: "Alle Knoten", class: "multicast" };
            if (address === "ff02::2")
                return { text: "Alle Router", class: "multicast" };

            // Transition
            if (address === "::ffff:0:0")
                return { text: "IPv4-mapped", class: "transition" };
            if (address === "2001::")
                return { text: "Teredo", class: "transition" };
            if (address === "64:ff9b::")
                return { text: "IPv4-embed", class: "transition" };
            if (address === "::ffff:0:0")
                return { text: "IPv4-mapped", class: "transition" };

            return null;
        } else {
            // IPv4 address badges (existing logic)

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
            if (address === "127.0.0.1")
                return { text: "System", class: "system" };
            if (address === "169.254.1.1")
                return { text: "Link-Local", class: "network" };
            if (address === "255.255.255.255")
                return { text: "Broadcast", class: "special" };
            if (address === "0.0.0.0")
                return { text: "Default", class: "routing" };
            if (address === "224.0.0.0")
                return { text: "Klasse D", class: "class-d" };
            if (address === "240.0.0.0")
                return { text: "Klasse E", class: "class-e" };

            return null;
        }
    };

    // Function to get special info text
    const getSpecialInfo = (addr) => {
        const address = addr.address;

        if (ipVersion === "ipv6") {
            // IPv6 special information

            // Loopback
            if (address === "::1")
                return "Entspricht 127.0.0.1 in IPv4 - immer lokaler Computer";

            // Unspecified
            if (address === "::")
                return "Wird während der Adresskonfiguration verwendet";

            // Documentation
            if (address === "2001:db8::")
                return "RFC 3849 - Nur für Dokumentation und Beispiele";

            // Link-Local
            if (address === "fe80::")
                return "Automatisch konfiguriert - entspricht APIPA in IPv4";

            // Private Networks (ULA)
            if (address === "fc00::")
                return "Zentral zugewiesene private IPv6-Adressen (seltener verwendet)";
            if (address === "fd00::")
                return "Häufigste private IPv6-Adressen in Unternehmen";

            // Global Unicast
            if (address === "2001::")
                return "Häufigster Global Unicast Bereich von ISPs zugewiesen";
            if (address === "3000::")
                return "Weiterer Global Unicast Adressbereich - Internet-routbar";

            // Multicast
            if (address === "ff00::")
                return "Ersetzt IPv4-Broadcast - entspricht 224.0.0.0/4";
            if (address === "ff02::1")
                return "Ersetzt IPv4-Broadcast 255.255.255.255";
            if (address === "ff02::2")
                return "Erreicht alle IPv6-Router im lokalen Segment";

            // Transition
            if (address === "::ffff:0:0")
                return "Ermöglicht IPv4-Kompatibilität in IPv6-Umgebungen";

            return null;
        } else {
            // IPv4 special information (existing logic)

            if (address === "169.254.1.1")
                return "APIPA = Automatic Private IP Addressing (wenn DHCP fehlschlägt)";
            if (address === "127.0.0.1") return "Immer lokaler Computer";
            if (address === "0.0.0.0") return "Standard-Route";
            if (address === "255.255.255.255")
                return "An alle Geräte im lokalen Netzwerk";
            if (address === "224.0.0.0")
                return "Multicast - Gruppenkommunkation";
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
        }
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
                    {ipVersion === "ipv6"
                        ? "Spezielle IPv6-Adressen anzeigen"
                        : "Spezielle IPv4-Adressen anzeigen"}
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
                            <h2>
                                {ipVersion === "ipv6"
                                    ? "Spezielle IPv6-Adressen"
                                    : "Spezielle IPv4-Adressen"}
                            </h2>
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
