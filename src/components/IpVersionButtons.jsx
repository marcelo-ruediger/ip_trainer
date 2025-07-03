function IpVersionButtons({
    ipVersion,
    attention,
    setAttention,
    handleStartIPv4,
    handleStartIPv6,
}) {
    return (
        <div className="top-buttons">
            <button
                onClick={handleStartIPv4}
                className={`${attention ? "attention" : ""} start-btn`}
                onMouseEnter={() => setAttention(false)}
            >
                IPv4 erzeugen
            </button>
            <button
                onClick={handleStartIPv6}
                className={`start-btn ${ipVersion === "ipv6" ? "active" : ""}`}
            >
                IPv6 erzeugen
            </button>
        </div>
    );
}

export default IpVersionButtons;
