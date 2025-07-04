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
                onClick={() => {
                    handleStartIPv4();
                    setAttention(false);
                }}
                className={attention ? "attention" : ""}
            >
                IPv4 erzeugen
            </button>
            <button
                onClick={() => {
                    handleStartIPv6();
                    setAttention(false);
                }}
                className={[
                    attention ? "attention" : "",
                    ipVersion === "ipv6" ? "active" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                IPv6 erzeugen
            </button>
        </div>
    );
}

export default IpVersionButtons;
