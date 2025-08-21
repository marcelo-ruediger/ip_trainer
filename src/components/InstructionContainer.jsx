function InstructionContainer({
    generatedField,
    ipData,
    isInputMode,
    isValidIp,
    hasInputStarted,
    ipVersion = "ipv4", // Add ipVersion prop with default
    mode, // Add mode prop for IPv6
}) {
    const getFieldDisplayName = (field) => {
        switch (field) {
            // IPv4 fields
            case "cidr":
                return "CIDR";
            case "subnetMask":
                return "Subnetzmaske";
            case "networkId":
                return "Netzwerkadresse";
            case "broadcast":
                return "Broadcast-Adresse";
            case "usableIps":
                return "Benutzbare IPs";
            // IPv6 fields
            case "fullAddress":
                return "Vollständige Adresse";
            case "abbreviatedAddress":
                return "Verkürzte Adresse";
            case "networkPrefix":
                return "Netzwerk-Präfix";
            case "networkAddress":
                return "Netzwerkadresse";
            case "type":
                return "Adresstyp";
            default:
                return field;
        }
    };

    const getFieldValue = (field) => {
        switch (field) {
            // IPv4 fields
            case "cidr":
                return ipData.cidr;
            case "subnetMask":
                return ipData.subnetMask;
            case "networkId":
                return ipData.networkId;
            case "broadcast":
                return ipData.broadcast;
            case "usableIps":
                return ipData.usableIps;
            // IPv6 fields
            case "fullAddress":
                return ipData.fullAddress;
            case "abbreviatedAddress":
                return ipData.abbreviatedAddress;
            case "networkPrefix":
                return ipData.networkPrefix;
            case "networkAddress":
                return ipData.networkAddress;
            case "type":
                return ipData.type;
            default:
                return "";
        }
    };

    // IPv6 mode: Practice mode instructions
    if (ipVersion === "ipv6") {
        // No generated field yet
        if (!ipData.ipv6) {
            return (
                <div className="instruction-container">
                    <div className="instruction-text">
                        Erzeugen Sie eine IPv6-Adresse zum Üben.
                    </div>
                </div>
            );
        }

        // Generated field for calculation practice
        const shownField =
            mode === "fullAddress" ? "fullAddress" : "abbreviatedAddress";
        const shownValue =
            mode === "fullAddress"
                ? ipData.fullAddress
                : ipData.abbreviatedAddress;
        const networkPrefix = ipData.networkPrefix;

        return (
            <div className="instruction-container">
                <div className="instruction-text">
                    <strong>Generiert:</strong>{" "}
                    {getFieldDisplayName(shownField)} ({shownValue}) +
                    Netzwerk-Präfix ({networkPrefix})
                    <br />
                    <strong>Aufgabe:</strong> Berechnen Sie alle anderen Felder
                </div>
            </div>
        );
    }

    // IPv4 mode: Input mode: User is entering IP address
    if (isInputMode && hasInputStarted && !isValidIp) {
        return (
            <div className="instruction-container input-mode">
                <div className="instruction-text">
                    <strong>Eingabe Modus</strong>
                    <br />
                    Geben Sie eine gültige IPv4-Adresse ein.
                </div>
            </div>
        );
    }

    // IPv4 mode: Input mode: Valid IP entered, waiting for CIDR or Subnet Mask
    if (isInputMode && isValidIp && !ipData.cidr && !ipData.subnetMask) {
        return (
            <div className="instruction-container input-mode">
                <div className="instruction-text">
                    <strong>Eingabe Modus</strong>
                    <br />
                    Geben Sie nun die CIDR-Notation oder die Subnetzmaske ein.
                </div>
            </div>
        );
    }

    // IPv4 mode: Input mode: All fields calculated
    if (
        isInputMode &&
        isValidIp &&
        (ipData.cidr || ipData.subnetMask) &&
        ipData.networkId
    ) {
        return (
            <div className="instruction-container input-mode-complete">
                <div className="instruction-text">
                    <strong>Eingabe Modus - Berechnung abgeschlossen</strong>
                    <br />
                    Alle Netzwerkfelder wurden automatisch berechnet.
                </div>
            </div>
        );
    }

    // IPv4 mode: Practice mode: No generated field yet
    if (!generatedField || !ipData.ip) {
        return (
            <div className="instruction-container">
                <div className="instruction-text">
                    Erzeugen Sie eine IP + Feld zum Üben oder geben Sie IP +
                    CIDR/Subnetzmaske für Berechnungen ein.
                </div>
            </div>
        );
    }

    // IPv4 mode: Practice mode: Generated field for calculation practice
    return (
        <div className="instruction-container">
            <div className="instruction-text">
                <strong>Generiert:</strong> IP-Adresse ({ipData.ip}) +{" "}
                {getFieldDisplayName(generatedField)} (
                {getFieldValue(generatedField)})
                <br />
                <strong>Aufgabe:</strong> Berechnen Sie alle anderen Felder
            </div>
        </div>
    );
}

export default InstructionContainer;
