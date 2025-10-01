import { useState } from "react";
import { getAllSpecialAddresses } from "../utils/ipv4Utils";
import { getAllSpecialAddresses as getAllIPv6SpecialAddresses } from "../utils/ipv6Utils";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/ToggleElements.css";
import languageIcon from "../images/language.svg";
import infoIcon from "../images/info.svg";

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
                  Transition: "IPv4-Mapped",
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
            // IPv6 simplified descriptions using translations
            if (address === "::1") return "IPv6 Localhost / Loopback";
            if (address === "::")
                return t("toggleElements.hintsIPv6.unspecified.commonUse");
            if (address === "2001:db8::")
                return t("toggleElements.hintsIPv6.documentation.commonUse");
            if (address === "fe80::")
                return t("toggleElements.hintsIPv6.linkLocal.commonUse");
            if (address === "fc00::")
                return t(
                    "toggleElements.hintsIPv6.privateNetworks.ulaCentral.commonUse"
                );
            if (address === "fd00::")
                return t(
                    "toggleElements.hintsIPv6.privateNetworks.ulaLocal.commonUse"
                );
            if (address === "2001::")
                return t(
                    "toggleElements.hintsIPv6.globalUnicast.global2xxx.commonUse"
                );
            if (address === "3000::")
                return t(
                    "toggleElements.hintsIPv6.globalUnicast.global3xxx.commonUse"
                );
            if (address === "ff00::")
                return t(
                    "toggleElements.hintsIPv6.multicast.multicast.commonUse"
                );
            if (address === "ff02::1")
                return t(
                    "toggleElements.hintsIPv6.multicast.allNodes.commonUse"
                );
            if (address === "ff02::2")
                return t(
                    "toggleElements.hintsIPv6.multicast.allRouters.commonUse"
                );
            if (address === "::ffff:0:0")
                return t("toggleElements.hintsIPv6.ipv4Mapped.commonUse");

            return addr.commonUse;
        } else {
            // IPv4 descriptions using translations
            if (address === "127.0.0.0")
                return t("toggleElements.hintsIPv4.loopback.commonUse");
            if (address === "169.254.0.0")
                return t("toggleElements.hintsIPv4.apipa.commonUse");
            if (address === "100.64.0.0")
                return t("toggleElements.hintsIPv4.cng.commonUse");
            if (address === "255.255.255.255")
                return t("toggleElements.hintsIPv4.broadcast.commonUse");
            if (address === "0.0.0.0")
                return t("toggleElements.hintsIPv4.unspecified.commonUse");

            // Private Networks
            if (address === "10.0.0.0")
                return t(
                    "toggleElements.hintsIPv4.privateNetworks.classA.commonUse"
                );
            if (address === "172.16.0.0")
                return t(
                    "toggleElements.hintsIPv4.privateNetworks.class B.commonUse"
                );
            if (address === "192.168.0.0")
                return t(
                    "toggleElements.hintsIPv4.privateNetworks.class C.commonUse"
                );

            // Public Networks
            if (address === "1.0.0.0")
                return t(
                    "toggleElements.hintsIPv4.publicNetworks.classA.commonUse"
                );
            if (address === "128.0.0.0")
                return t(
                    "toggleElements.hintsIPv4.publicNetworks.class B.commonUse"
                );
            if (address === "192.0.0.0")
                return t(
                    "toggleElements.hintsIPv4.publicNetworks.class C.commonUse"
                );

            // Classes D and E
            if (address === "224.0.0.0")
                return t(
                    "toggleElements.hintsIPv4.classesDandE.class D.commonUse"
                );
            if (address === "240.0.0.0")
                return t(
                    "toggleElements.hintsIPv4.classesDandE.class E.commonUse"
                );

            // Documentation
            if (address === "192.0.2.0")
                return t(
                    "toggleElements.hintsIPv4.documentation.testnet1.commonUse"
                );
            if (address === "198.51.100.0")
                return t(
                    "toggleElements.hintsIPv4.documentation.testnet2.commonUse"
                );
            if (address === "203.0.113.0")
                return t(
                    "toggleElements.hintsIPv4.documentation.testnet3.commonUse"
                );

            return addr.commonUse;
        }
    };

    // Function to get info badge for each address
    const getInfoBadge = (addr) => {
        const address = addr.address;

        if (ipVersion === "ipv6") {
            // IPv6 address badges using translations

            // Loopback
            if (address === "::1") return { text: "Loopback", class: "system" };

            // Unspecified
            if (address === "::")
                return {
                    text: t("toggleElements.hintsIPv6.unspecified.badget"),
                    class: "routing",
                };

            // Documentation
            if (address === "2001:db8::")
                return {
                    text: t("toggleElements.hintsIPv6.documentation.badget"),
                    class: "documentation",
                };
            if (address === "2001:db8::1")
                return {
                    text: t("toggleElements.hintsIPv6.documentation.badget"),
                    class: "documentation",
                };
            if (address === "2001:db8:0000::")
                return {
                    text: t("toggleElements.hintsIPv6.documentation.badget"),
                    class: "documentation",
                };
            if (address === "2001:db8:1::")
                return {
                    text: t("toggleElements.hintsIPv6.documentation.badget"),
                    class: "documentation",
                };

            // Link-Local
            if (address === "fe80::")
                return { text: "Link-Local", class: "network" };
            if (address === "fe80::1")
                return { text: "Link-Local", class: "network" };
            if (address === "fe80:0000::")
                return { text: "Link-Local", class: "network" };

            // Private Networks (ULA)
            if (address === "fc00::1")
                return {
                    text: t(
                        "toggleElements.hintsIPv6.privateNetworks.ulaCentral.badget"
                    ),
                    class: "class-a",
                };
            if (address === "fc00:0000::")
                return {
                    text: t(
                        "toggleElements.hintsIPv6.privateNetworks.ulaCentral.badget"
                    ),
                    class: "class-a",
                };
            if (address === "fd00::1")
                return {
                    text: t(
                        "toggleElements.hintsIPv6.privateNetworks.ulaLocal.badget"
                    ),
                    class: "class-a",
                };
            if (address === "fd00:0000::")
                return {
                    text: t(
                        "toggleElements.hintsIPv6.privateNetworks.ulaLocal.badget"
                    ),
                    class: "class-a",
                };

            // Global Unicast
            if (address === "2001::")
                return { text: "Global 2xxx", class: "class-b" };
            if (address === "3000::")
                return { text: "Global 3xxx", class: "class-b" };

            // Multicast
            if (address === "ff00:0000::")
                return { text: "Multicast", class: "class-d" };
            if (address === "ff02::1")
                return {
                    text: t(
                        "toggleElements.hintsIPv6.multicast.allNodes.badget"
                    ),
                    class: "special",
                };
            if (address === "ff02::2")
                return {
                    text: t(
                        "toggleElements.hintsIPv6.multicast.allRouters.badget"
                    ),
                    class: "class-d",
                };

            // Transition
            if (address === "::ffff:0:0")
                return { text: "IPv4-mapped", class: "transition" };
            if (address === "64:ff9b::")
                return { text: "IPv4-embed", class: "transition" };

            return null;
        } else {
            // IPv4 address badges using translations

            // Private Networks
            if (address === "10.0.0.0")
                return {
                    text: t(
                        "toggleElements.hintsIPv4.privateNetworks.classA.badget"
                    ),
                    class: "class-a",
                };
            if (address === "172.16.0.0")
                return {
                    text: t(
                        "toggleElements.hintsIPv4.privateNetworks.class B.badget"
                    ),
                    class: "class-b",
                };
            if (address === "192.168.0.0")
                return {
                    text: t(
                        "toggleElements.hintsIPv4.privateNetworks.class C.badget"
                    ),
                    class: "class-c",
                };

            // Public Networks
            if (address === "1.0.0.0")
                return {
                    text: t(
                        "toggleElements.hintsIPv4.publicNetworks.classA.badget"
                    ),
                    class: "class-a",
                };
            if (address === "128.0.0.0")
                return {
                    text: t(
                        "toggleElements.hintsIPv4.publicNetworks.class B.badget"
                    ),
                    class: "class-b",
                };
            if (address === "192.0.0.0")
                return {
                    text: t(
                        "toggleElements.hintsIPv4.publicNetworks.class C.badget"
                    ),
                    class: "class-c",
                };

            // Special addresses
            if (address === "127.0.0.0")
                return { text: "Loopback", class: "system" };
            if (address === "169.254.0.0")
                return { text: "APIPA", class: "network" };
            if (address === "100.64.0.0") return { text: "CGN", class: "cgn" };
            if (address === "255.255.255.255")
                return { text: "Broadcast", class: "special" };
            if (address === "0.0.0.0")
                return {
                    text: t("toggleElements.hintsIPv4.unspecified.badget"),
                    class: "routing",
                };
            if (address === "224.0.0.0")
                return {
                    text: t(
                        "toggleElements.hintsIPv4.classesDandE.class D.badget"
                    ),
                    class: "class-d",
                };
            if (address === "240.0.0.0")
                return {
                    text: t(
                        "toggleElements.hintsIPv4.classesDandE.class E.badget"
                    ),
                    class: "class-e",
                };
            if (address === "192.0.2.0")
                return {
                    text: t(
                        "toggleElements.hintsIPv4.documentation.testnet1.badget"
                    ),
                    class: "documentation",
                };
            if (address === "198.51.100.0")
                return {
                    text: t(
                        "toggleElements.hintsIPv4.documentation.testnet2.badget"
                    ),
                    class: "documentation",
                };
            if (address === "203.0.113.0")
                return {
                    text: t(
                        "toggleElements.hintsIPv4.documentation.testnet3.badget"
                    ),
                    class: "documentation",
                };

            return null;
        }
    };

    // Function to get special info text
    const getSpecialInfo = (addr) => {
        const address = addr.address;

        if (ipVersion === "ipv6") {
            // IPv6 special information using translations

            // Loopback
            if (address === "::1")
                return t("toggleElements.hintsIPv6.loopback.specialInfo");

            // Unspecified
            if (address === "::")
                return t("toggleElements.hintsIPv6.unspecified.specialInfo");

            // Documentation
            if (address === "2001:db8::")
                return t("toggleElements.hintsIPv6.documentation.specialInfo");
            if (address === "2001:db8::1")
                return t("toggleElements.hintsIPv6.documentation.specialInfo");
            if (address === "2001:db8:0000::")
                return t("toggleElements.hintsIPv6.documentation.specialInfo");
            if (address === "2001:db8:1::")
                return t("toggleElements.hintsIPv6.documentation.specialInfo");

            // Link-Local
            if (address === "fe80::")
                return t("toggleElements.hintsIPv6.linkLocal.specialInfo");
            if (address === "fe80::1")
                return t("toggleElements.hintsIPv6.linkLocal.specialInfo");
            if (address === "fe80:0000::")
                return t("toggleElements.hintsIPv6.linkLocal.specialInfo");

            // Private Networks (ULA)
            if (address === "fc00::1")
                return t(
                    "toggleElements.hintsIPv6.privateNetworks.ulaCentral.specialInfo"
                );
            if (address === "fc00:0000::")
                return t(
                    "toggleElements.hintsIPv6.privateNetworks.ulaCentral.specialInfo"
                );
            if (address === "fd00::1")
                return t(
                    "toggleElements.hintsIPv6.privateNetworks.ulaLocal.speciaInfo"
                );
            if (address === "fd00:0000::")
                return t(
                    "toggleElements.hintsIPv6.privateNetworks.ulaLocal.speciaInfo"
                );

            // Global Unicast
            if (address === "2001::")
                return t(
                    "toggleElements.hintsIPv6.globalUnicast.global2xxx.specialInfo"
                );
            if (address === "3000::")
                return t(
                    "toggleElements.hintsIPv6.globalUnicast.global3xxx.specialInfo"
                );

            // Multicast
            if (address === "ff00:0000::")
                return t(
                    "toggleElements.hintsIPv6.multicast.multicast.specialInfo"
                );
            if (address === "ff02::1")
                return t(
                    "toggleElements.hintsIPv6.multicast.allNodes.speciaInfo"
                );
            if (address === "ff02::2")
                return t(
                    "toggleElements.hintsIPv6.multicast.allRouters.specialInfo"
                );

            // Transition
            if (address === "::ffff:0:0")
                return t("toggleElements.hintsIPv6.ipv4Mapped.specialInfo");

            return null;
        } else {
            // IPv4 special information using translations
            if (address === "127.0.0.0")
                return t("toggleElements.hintsIPv4.loopback.specialInfo");
            if (address === "169.254.0.0")
                return t("toggleElements.hintsIPv4.apipa.specialInfo");
            if (address === "100.64.0.0")
                return t("toggleElements.hintsIPv4.cng.specialInfo");
            if (address === "255.255.255.255")
                return t("toggleElements.hintsIPv4.broadcast.specialInfo");
            if (address === "0.0.0.0")
                return t("toggleElements.hintsIPv4.unspecified.specialInfo");

            // Private Networks
            if (address === "10.0.0.0")
                return t(
                    "toggleElements.hintsIPv4.privateNetworks.classA.specialInfo"
                );
            if (address === "172.16.0.0")
                return t(
                    "toggleElements.hintsIPv4.privateNetworks.class B.specialInfo"
                );
            if (address === "192.168.0.0")
                return t(
                    "toggleElements.hintsIPv4.privateNetworks.class C.specialInfo"
                );

            // Public Networks
            if (address === "1.0.0.0")
                return t(
                    "toggleElements.hintsIPv4.publicNetworks.classA.specialInfo"
                );
            if (address === "128.0.0.0")
                return t(
                    "toggleElements.hintsIPv4.publicNetworks.class B.specialInfo"
                );
            if (address === "192.0.0.0")
                return t(
                    "toggleElements.hintsIPv4.publicNetworks.class C.specialInfo"
                );

            // Classes D and E
            if (address === "224.0.0.0")
                return t(
                    "toggleElements.hintsIPv4.classesDandE.class D.specialInfo"
                );
            if (address === "240.0.0.0")
                return t(
                    "toggleElements.hintsIPv4.classesDandE.class E.specialInfo"
                );

            // Documentation
            if (address === "192.0.2.0")
                return t(
                    "toggleElements.hintsIPv4.documentation.testnet1.specialInfo"
                );
            if (address === "198.51.100.0")
                return t(
                    "toggleElements.hintsIPv4.documentation.testnet2.specialInfo"
                );
            if (address === "203.0.113.0")
                return t(
                    "toggleElements.hintsIPv4.documentation.testnet3.specialInfo"
                );

            return null;
        }
    };

    // Function to get category titles using translations for IPv4
    const getCategoryTitle = (category) => {
        switch (category) {
            case "Private Networks":
                return t("toggleElements.hintsIPv4.privateNetworks.title");
            case "Public Networks":
                return t("toggleElements.hintsIPv4.publicNetworks.title");
            case "Classes D and E":
                return t("toggleElements.hintsIPv4.classesDandE.title");
            case "Documentation":
                return t("toggleElements.hintsIPv4.documentation.title");
            case "Unspezifiziert":
                return t("toggleElements.hintsIPv4.unspecified.title");
            case "Loopback":
                return "Loopback";
            case "APIPA":
                return "APIPA";
            case "Carrier-Grade NAT":
                return "Carrier-Grade NAT";
            case "Broadcast":
                return "Broadcast";
            default:
                return category;
        }
    };

    // Function to get range translations for IPv4
    const getRangeTranslation = (addr) => {
        const address = addr.address;

        if (ipVersion === "ipv6") {
            // Keep original for IPv6
            return addr.range;
        } else {
            // IPv4 - only translate special cases with complex text, keep original ranges for simple ones
            const rangeLabel = language === "en" ? "Range" : "Bereich";

            switch (address) {
                case "255.255.255.255":
                    return t("toggleElements.hintsIPv4.broadcast.range");
                case "0.0.0.0":
                    return t("toggleElements.hintsIPv4.unspecified.range");
                case "224.0.0.0":
                    return t(
                        "toggleElements.hintsIPv4.classesDandE.class D.range"
                    );
                case "240.0.0.0":
                    return t(
                        "toggleElements.hintsIPv4.classesDandE.class E.range"
                    );
                default:
                    // For simple cases, use translated label + original range numbers
                    return `${rangeLabel}: ${addr.range}`;
            }
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
                    <img src={infoIcon} alt="info" className="info-icon" />
                    <span className="label-text">
                        {ipVersion === "ipv6"
                            ? t("toggleElements.hintsIPv6.title")
                            : t("toggleElements.hintsIPv4.title")}
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
                                    ? t("toggleElements.hintsIPv6.title")
                                    : t("toggleElements.hintsIPv4.title")}
                            </h2>
                            <button
                                className="close-button"
                                onClick={closePopup}
                            >
                                ×
                            </button>
                        </div>

                        <div className="popup-body">
                            {ipVersion === "ipv6" ? (
                                <>
                                    {/* IPv6 Introduction Section */}
                                    <div className="address-category">
                                        <h3 className="category-title">
                                            {t(
                                                "toggleElements.hintsIPv6.whatIsIpv6.title"
                                            )}
                                        </h3>
                                        <div
                                            className="popup-description"
                                            dangerouslySetInnerHTML={{
                                                __html: t(
                                                    "toggleElements.hintsIPv6.whatIsIpv6.content"
                                                ),
                                            }}
                                        />
                                    </div>

                                    {/* IPv6 Abbreviation Rules Section */}
                                    <div className="address-category">
                                        <h3 className="category-title">
                                            {t(
                                                "toggleElements.hintsIPv6.ipv6AbreviattionRules.title"
                                            )}
                                        </h3>
                                        <div className="address-item">
                                            <div className="address-details">
                                                <p
                                                    className="common-use"
                                                    dangerouslySetInnerHTML={{
                                                        __html: t(
                                                            "toggleElements.hintsIPv6.ipv6AbreviattionRules.1stRule"
                                                        ),
                                                    }}
                                                />

                                                <p className="range">
                                                    2001:0db8:0000:0042 →
                                                    2001:db8:0:42
                                                </p>

                                                <p
                                                    className="common-use"
                                                    dangerouslySetInnerHTML={{
                                                        __html: t(
                                                            "toggleElements.hintsIPv6.ipv6AbreviattionRules.2ndRule"
                                                        ),
                                                    }}
                                                />

                                                <p className="range">
                                                    2001:db8:0:0:0:0:0:1 →
                                                    2001:db8::1
                                                </p>

                                                <p
                                                    className="range"
                                                    dangerouslySetInnerHTML={{
                                                        __html: t(
                                                            "toggleElements.hintsIPv6.ipv6AbreviattionRules.rangeText"
                                                        ),
                                                    }}
                                                />

                                                <p className="special-info">
                                                    {t(
                                                        "toggleElements.hintsIPv6.ipv6AbreviattionRules.specialInfo1"
                                                    )}
                                                    <br />
                                                    {t(
                                                        "toggleElements.hintsIPv6.ipv6AbreviattionRules.specialInfo2"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* IPv4 Introduction Section */}
                                    <div className="address-category">
                                        <h3 className="category-title">
                                            {t(
                                                "toggleElements.hintsIPv4.whatIsIpv4.title"
                                            )}
                                        </h3>
                                        <div
                                            className="popup-description"
                                            dangerouslySetInnerHTML={{
                                                __html: t(
                                                    "toggleElements.hintsIPv4.whatIsIpv4.content"
                                                ),
                                            }}
                                        />
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
                                            {ipVersion === "ipv6"
                                                ? categoryTranslations[
                                                      category
                                                  ] || category
                                                : getCategoryTitle(category)}
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
                                                                {getRangeTranslation(
                                                                    addr
                                                                )}
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
