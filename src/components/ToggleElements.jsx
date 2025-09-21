import { useState } from "react";
import { getAllSpecialAddresses } from "../utils/ipv4Utils";
import { getAllSpecialAddresses as getAllIPv6SpecialAddresses } from "../utils/ipv6Utils";
import { useLanguage } from "../contexts/LanguageContext";
import "../ToggleElements.css";
import languageIcon from "../images/language.svg";

function ToggleElements({ showImage, onToggle, tableImg, ipVersion }) {
    const [showSpecialAddresses, setShowSpecialAddresses] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    // Use appropriate special addresses based on IP version
    const specialAddresses =
        ipVersion === "ipv6"
            ? getAllIPv6SpecialAddresses()
            : getAllSpecialAddresses();

    const handleSpecialAddressesToggle = () => {
        setShowSpecialAddresses(true);
    };

    const handleLanguageToggle = (newLanguage) => {
        const langCode = newLanguage.toLowerCase();
        setLanguage(langCode);
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
                  "Carrier-Grade NAT",
                  "Broadcast",
                  "Unspezifiziert",
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
                  "Carrier-Grade NAT": "Carrier-Grade NAT",
                  Unspezifiziert: "Unspezifiziert",
                  "Private Networks": "Private Netzwerke",
                  "Public Networks": "Öffentliche Netzwerke",
                  "Classes D and E": "Klassen D und E",
                  Other: "Sonstige",
              };

    // Simplified common use translations (with spaces after /)
    const getSimplifiedDescription = (addr) => {
        const address = addr.address;

        if (ipVersion === "ipv6") {
            // IPv6 simplified descriptions
            if (address === "::1") return "IPv6 Localhost / Loopback";
            if (address === "::")
                return "Unspezifizierte Adresse / Null-Adresse";
            if (address === "2001:db8::")
                return "Dokumentation / Beispieladressen";
            if (address === "fe80::")
                return "Link-Local / Automatisch konfiguriert";
            if (address === "fc00::")
                return "ULA (Unique Local Address) zentral / Private IPv6 (selten)";
            if (address === "fd00::")
                return "ULA (Unique Local Address) lokal / Private IPv6 (häufig)";
            if (address === "2001::")
                return "Global Unicast 2xxx / Internet-routbar";
            if (address === "3000::")
                return "Global Unicast 3xxx / Internet-routbar";
            if (address === "ff00::") return "Multicast / Gruppenkommunikation";
            if (address === "ff02::1")
                return "Alle IPv6-Knoten / Ersetzt Broadcast";
            if (address === "ff02::2")
                return "Alle IPv6-Router / Router-Kommunikation";
            if (address === "::ffff:0:0")
                return "IPv4-mapped / Übergangs-Adresse";

            return addr.commonUse;
        } else {
            // IPv4 simplified descriptions
            if (address === "127.0.0.1") return "Localhost / Loopback";
            if (address === "169.254.1.1") return "APIPA / Link-lokale Adresse";
            if (address === "255.255.255.255")
                return "Eingeschränkter Broadcast";
            if (address === "0.0.0.0")
                return "Default Route - nicht zugewiesene Adresse";
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
        }
    };

    // Function to get info badge for each address
    const getInfoBadge = (addr) => {
        const address = addr.address;

        if (ipVersion === "ipv6") {
            // IPv6 address badges

            // Loopback
            if (address === "::1") return { text: "Loopback", class: "system" };

            // Unspecified
            if (address === "::")
                return { text: "Unspezifiziert", class: "routing" };

            // Documentation
            if (address === "2001:db8::")
                return { text: "Dokumentation", class: "documentation" };
            if (address === "2001:db8::1")
                return { text: "Dokumentation", class: "documentation" };
            if (address === "2001:db8:0000::")
                return { text: "Dokumentation", class: "documentation" };
            if (address === "2001:db8:1::")
                return { text: "Dokumentation", class: "documentation" };

            // Link-Local
            if (address === "fe80::")
                return { text: "Link-Local", class: "network" };
            if (address === "fe80::1")
                return { text: "Link-Local", class: "network" };
            if (address === "fe80:0000::")
                return { text: "Link-Local", class: "network" };

            // Private Networks (ULA)
            if (address === "fc00::1")
                return { text: "ULA zentral", class: "class-a" };
            if (address === "fc00:0000::")
                return { text: "ULA zentral", class: "class-a" };
            if (address === "fd00::1")
                return { text: "ULA lokal", class: "class-a" };
            if (address === "fd00:0000::")
                return { text: "ULA lokal", class: "class-a" };

            // Global Unicast
            if (address === "2001::")
                return { text: "Global 2xxx", class: "class-b" };
            if (address === "3000::")
                return { text: "Global 3xxx", class: "class-b" };

            // Multicast
            if (address === "ff00:0000::")
                return { text: "Multicast", class: "class-d" };
            if (address === "ff02::1")
                return { text: "Alle Knoten", class: "special" };
            if (address === "ff02::2")
                return { text: "Alle Router", class: "class-d" };

            // Transition
            if (address === "::ffff:0:0")
                return { text: "IPv4-mapped", class: "transition" };
            if (address === "64:ff9b::")
                return { text: "IPv4-embed", class: "transition" };

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
            if (address === "127.0.0.0")
                return { text: "Loopback", class: "system" };
            if (address === "169.254.0.0")
                return { text: "APIPA", class: "network" };
            if (address === "100.64.0.0") return { text: "CGN", class: "cgn" };
            if (address === "255.255.255.255")
                return { text: "Broadcast", class: "special" };
            if (address === "0.0.0.0")
                return { text: "Unspezifiziert", class: "routing" };
            if (address === "224.0.0.0")
                return { text: "Klasse D", class: "class-d" };
            if (address === "240.0.0.0")
                return { text: "Klasse E", class: "class-e" };
            if (address === "192.0.2.0")
                return { text: "Dokumentation", class: "documentation" };
            if (address === "198.51.100.0")
                return { text: "Dokumentation", class: "documentation" };
            if (address === "203.0.113.0")
                return { text: "Dokumentation", class: "documentation" };

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
                return "Immer lokaler Computer - niemals über Netzwerk geroutet.\nEntspricht 127.0.0.1 in IPv4";

            // Unspecified
            if (address === "::")
                return "Wird während der Adresskonfiguration verwendet.\nEntspricht 0.0.0.0 in IPv4";

            // Documentation
            if (address === "2001:db8::")
                return "RFC 3849 - Ausschließlich für Dokumentation und Beispiele.\nEntspricht: Testnetz-1 (192.0.2.0/24), Testnetz-2 (198.51.100.0/24) und Testnetz-3 (203.0.113.0/24)";
            if (address === "2001:db8::1")
                return "RFC 3849 - Ausschließlich für Dokumentation und Beispiele.\nEntspricht: Testnetz-1 (192.0.2.0/24), Testnetz-2 (198.51.100.0/24) und Testnetz-3 (203.0.113.0/24)";
            if (address === "2001:db8:0000::")
                return "RFC 3849 - Ausschließlich für Dokumentation und Beispiele.\nEntspricht: Testnetz-1 (192.0.2.0/24), Testnetz-2 (198.51.100.0/24) und Testnetz-3 (203.0.113.0/24)";
            if (address === "2001:db8:1::")
                return "RFC 3849 - Ausschließlich für Dokumentation und Beispiele.\nEntspricht: Testnetz-1 (192.0.2.0/24), Testnetz-2 (198.51.100.0/24) und Testnetz-3 (203.0.113.0/24)";

            // Link-Local
            if (address === "fe80::")
                return "Automatisch auf jeder IPv6-Schnittstelle konfiguriert.\nEntspricht APIPA (169.254.0.0/16) in IPv4";
            if (address === "fe80::1")
                return "Automatisch auf jeder IPv6-Schnittstelle konfiguriert.\nEntspricht APIPA (169.254.0.0/16) in IPv4";
            if (address === "fe80:0000::")
                return "Automatisch auf jeder IPv6-Schnittstelle konfiguriert.\nEntspricht APIPA (169.254.0.0/16) in IPv4";

            // Private Networks (ULA)
            if (address === "fc00::1")
                return "Zentral zugewiesene private IPv6-Adressen (ULA - Unique Local Address).\nEntspricht RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) in IPv4";
            if (address === "fc00:0000::")
                return "Zentral zugewiesene private IPv6-Adressen (ULA - Unique Local Address).\nEntspricht RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) in IPv4";
            if (address === "fd00::1")
                return "Lokal generierte private IPv6-Adressen (ULA - Unique Local Address).\nEntspricht RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) in IPv4";
            if (address === "fd00:0000::")
                return "Lokal generierte private IPv6-Adressen (ULA - Unique Local Address).\nEntspricht RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) in IPv4";

            // Global Unicast
            if (address === "2001::")
                return "Häufigster Global Unicast Bereich - von ISPs zugewiesen.\nEntspricht öffentlichen IPv4-Adressen (Klasse A, B, C)";
            if (address === "3000::")
                return "Weiterer Global Unicast Adressbereich - Internet-routbar.\nEntspricht öffentlichen IPv4-Adressen (Klasse A, B, C)";

            // Multicast
            if (address === "ff00:0000::")
                return "Ersetzt IPv4-Broadcast komplett - Gruppenkommunkation.\nEntspricht Klasse D (224.0.0.0/4) in IPv4";
            if (address === "ff02::1")
                return "Erreicht alle IPv6-Knoten - ersetzt IPv4-Broadcast.\nEntspricht 255.255.255.255 in IPv4";
            if (address === "ff02::2")
                return "Erreicht alle IPv6-Router im lokalen Segment.\nKein direktes IPv4-Äquivalent (IPv4 nutzt Broadcast)";

            // Transition
            if (address === "::ffff:0:0")
                return "Ermöglicht IPv4-Kompatibilität in reinen IPv6-Umgebungen";

            return null;
        } else {
            // IPv4 special information (existing logic)

            if (address === "169.254.0.0")
                return "Automatische Adressvergabe wenn DHCP fehlschlägt";
            if (address === "100.64.0.0")
                return "Geteilte IP-Adressen bei Internetanbietern für mehrere Kunden";
            if (address === "127.0.0.0")
                return "Immer lokaler Computer - niemals über Netzwerk geroutet";
            if (address === "0.0.0.0")
                return "Standard-Route oder unspezifizierte Adresse";
            if (address === "255.255.255.255")
                return "An alle Geräte im lokalen Netzwerk";
            if (address === "192.0.2.0")
                return "Reserviert für Dokumentation und Beispiele";
            if (address === "198.51.100.0")
                return "Reserviert für Dokumentation und Beispiele";
            if (address === "203.0.113.0")
                return "Reserviert für Dokumentation und Beispiele";
            if (address === "224.0.0.0")
                return "Gruppenkommunikation - eine Nachricht an mehrere Empfänger";
            if (address === "240.0.0.0")
                return "Experimenteller Adressbereich - für zukünftige Nutzung reserviert";
            if (address === "10.0.0.0")
                return "16,7 Millionen private Adressen für große Unternehmen";
            if (address === "172.16.0.0")
                return "1 Million private Adressen für mittlere Unternehmen";
            if (address === "192.168.0.0")
                return "65.536 private Adressen für Heimnetzwerke und kleine Büros";
            if (address === "1.0.0.0")
                return "Öffentliche Adressen - über das Internet erreichbar";
            if (address === "128.0.0.0")
                return "Öffentliche Adressen - über das Internet erreichbar";
            if (address === "192.0.0.0")
                return "Öffentliche Adressen - über das Internet erreichbar";

            return null;
        }
    };

    return (
        <>
            <div className="image-toggle-container">
                <div className="language-toggle-container">
                    <button
                        className={`language-button ${
                            language === "de" ? "active" : ""
                        }`}
                        onClick={() => handleLanguageToggle("DE")}
                    >
                        <span className="button-text">DE</span>
                    </button>
                    <img
                        src={languageIcon}
                        alt="Language"
                        className="language-icon"
                    />
                    <button
                        className={`language-button ${
                            language === "en" ? "active" : ""
                        }`}
                        onClick={() => handleLanguageToggle("EN")}
                    >
                        <span className="button-text">EN</span>
                    </button>
                </div>

                <label className="toggle-label">
                    <input
                        type="checkbox"
                        checked={showImage}
                        onChange={onToggle}
                    />
                    <span className="label-text">
                        {ipVersion === "ipv6"
                            ? t("toggleElements.helpTableIPv6.buttonLabel")
                            : t("toggleElements.helpTableIPv4")}
                    </span>
                </label>

                <label className="toggle-label info-label">
                    <input
                        type="checkbox"
                        checked={false}
                        onChange={handleSpecialAddressesToggle}
                    />
                    <span className="label-text">
                        {ipVersion === "ipv6"
                            ? t("toggleElements.hintsIPv6")
                            : t("toggleElements.hintsIPv4")}
                    </span>
                </label>
            </div>

            <div
                className={`ipv6-container ${
                    showImage ? "visible" : "invisible"
                }`}
            >
                {/* IPv6 Information Header - only show for IPv6 mode and when image is visible */}
                {ipVersion === "ipv6" && (
                    <div className="ipv6-info-header">
                        <div className="ipv6-structure-title">
                            {t("toggleElements.helpTableIPv6.title")} (128
                            bits):
                        </div>
                        <div className="ipv6-structure-text">
                            <span className="ipv6-structure-part network-part">
                                64 Bits{" "}
                                {t(
                                    "toggleElements.helpTableIPv6.networkPrefix"
                                )}
                            </span>
                            <span className="ipv6-structure-separator">
                                {" "}
                                +{" "}
                            </span>
                            <span className="ipv6-structure-part interface-part">
                                64 Bits{" "}
                                {t(
                                    "toggleElements.helpTableIPv6.interfacePrefix"
                                )}{" "}
                                (Hosts)
                            </span>
                        </div>
                    </div>
                )}

                <div className="table-image-container">
                    <img src={tableImg} alt="Toggleable" />
                </div>
            </div>

            {/* Special Addresses Popup */}
            {showSpecialAddresses && (
                <div className="popup-overlay" onClick={handleOverlayClick}>
                    <div className="popup-content">
                        <div className="popup-header">
                            <h2>
                                {ipVersion === "ipv6"
                                    ? "IPv6 Hinweise"
                                    : "IPv4 Hinweise"}
                            </h2>
                            <button
                                className="close-button"
                                onClick={closePopup}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="popup-body">
                            {ipVersion === "ipv6" ? (
                                <>
                                    {/* IPv6 Introduction Section */}
                                    <div className="address-category">
                                        <h3 className="category-title">
                                            Was ist IPv6?
                                        </h3>
                                        <div className="popup-description">
                                            IPv6 (Internet Protocol Version 6)
                                            ist der Nachfolger von IPv4. Es
                                            verwendet <strong>128 Bit</strong>{" "}
                                            lange Adressen, aufgeteilt in{" "}
                                            <strong>8 Blöcke</strong> à 16 Bit
                                            (hexadezimal). IPv6 bietet praktisch
                                            unendlich viele Adressen und wird
                                            voraussichtlich IPv4 in den
                                            kommenden Jahren weitgehend
                                            ersetzen. IPv6 verwendet{" "}
                                            <strong>kein Broadcast</strong>,
                                            sondern nur Multicast für
                                            Gruppenkommunikation.
                                        </div>
                                    </div>

                                    {/* IPv6 Abbreviation Rules Section */}
                                    <div className="address-category">
                                        <h3 className="category-title">
                                            IPv6 Abkürzungsregeln
                                        </h3>
                                        <div className="address-item">
                                            <div className="address-details">
                                                <p className="common-use">
                                                    <strong>
                                                        1. Führende Nullen
                                                        weglassen:
                                                    </strong>
                                                </p>
                                                <p className="range">
                                                    2001:0db8:0000:0042 →
                                                    2001:db8:0:42
                                                </p>

                                                <p className="common-use">
                                                    <strong>
                                                        2. Längste Null-Sequenz
                                                        mit "::" ersetzen:
                                                    </strong>
                                                </p>
                                                <p className="range">
                                                    2001:db8:0:0:0:0:0:1 →
                                                    2001:db8::1
                                                </p>

                                                <p className="range">
                                                    <strong>
                                                        Bei gleich langen
                                                        Null-Sequenzen:
                                                    </strong>{" "}
                                                    Erste (linkeste) ersetzen
                                                </p>

                                                <p className="special-info">
                                                    "::" darf nur einmal pro
                                                    Adresse verwendet werden!
                                                    <br />
                                                    "::" ersetzt mindestens zwei
                                                    aufeinanderfolgende
                                                    0000-Blöcke!
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Special Addresses Introduction */}
                                    <div className="address-category">
                                        <h3 className="category-title">
                                            Spezielle IPv6-Adressen
                                        </h3>
                                        <p className="popup-description">
                                            Diese Adressen haben besondere
                                            Eigenschaften und folgen nicht den
                                            standardmäßigen Subnetting-Regeln:
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* IPv4 Introduction Section */}
                                    <div className="address-category">
                                        <h3 className="category-title">
                                            Was ist IPv4?
                                        </h3>
                                        <div className="popup-description">
                                            IPv4 (Internet Protocol Version 4)
                                            ist das derzeit am weitesten
                                            verbreitete Internet-Protokoll. Es
                                            verwendet <strong>32 Bit</strong>{" "}
                                            lange Adressen, aufgeteilt in{" "}
                                            <strong>4 Blöcke</strong> à 8 Bit
                                            (0-255). Aufgrund der begrenzten
                                            Anzahl von etwa 4,3 Milliarden
                                            Adressen wird IPv4 wahrscheinlich
                                            schrittweise durch IPv6 ersetzt
                                            werden.
                                        </div>
                                    </div>

                                    {/* Special Addresses Introduction */}
                                    <div className="address-category">
                                        <h3 className="category-title">
                                            Spezielle IPv4-Adressen
                                        </h3>
                                        <p className="popup-description">
                                            Diese Adressen haben besondere
                                            Eigenschaften und folgen nicht den
                                            standardmäßigen Subnetting-Regeln:
                                        </p>
                                    </div>
                                </>
                            )}

                            {categoryOrder.map((category) => {
                                const addresses = groupedAddresses[category];
                                if (!addresses || addresses.length === 0)
                                    return null;

                                return (
                                    <div
                                        key={category}
                                        className="address-category subcategory"
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
