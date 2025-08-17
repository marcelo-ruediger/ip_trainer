function InstructionContainer({
    generatedField,
    ipData,
    isInputMode,
    isValidIp,
    hasInputStarted,
}) {
    const getFieldDisplayName = (field) => {
        switch (field) {
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
            default:
                return field;
        }
    };

    const getFieldValue = (field) => {
        switch (field) {
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
            default:
                return "";
        }
    };

    // Input mode: User is entering IP address
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

    // Input mode: Valid IP entered, waiting for CIDR or Subnet Mask
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

    // Input mode: All fields calculated
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

    // Practice mode: No generated field yet
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

    // Practice mode: Generated field for calculation practice
    return (
        <div className="instruction-container">
            <div className="instruction-text">
                <strong>Generiert:</strong> IP-Adresse {ipData.ip} und{" "}
                {getFieldDisplayName(generatedField)} (
                {getFieldValue(generatedField)})
                <br />
                <strong>Aufgabe:</strong> Berechnen Sie alle anderen Felder
            </div>
        </div>
    );
}

export default InstructionContainer;
