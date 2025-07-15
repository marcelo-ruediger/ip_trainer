export const getRandomIPv6 = () => {
    const groups = [];
    for (let i = 0; i < 8; i++) {
        let group = Math.floor(Math.random() * 0x10000).toString(16);
        group = group.padStart(4, "0");
        groups.push(group);
    }
    return groups.join(":");
};

export const abbreviateIPv6 = (ipv6) => {
    if (!ipv6 || typeof ipv6 !== "string") return ipv6;

    // Split into groups
    let groups = ipv6.split(":");

    // Remove leading zeros from each group
    groups = groups.map((group) => group.replace(/^0+/, "") || "0");

    // Find the longest sequence of consecutive zero groups
    let maxZeroStart = -1;
    let maxZeroLength = 0;
    let currentZeroStart = -1;
    let currentZeroLength = 0;

    for (let i = 0; i < groups.length; i++) {
        if (groups[i] === "0") {
            if (currentZeroStart === -1) {
                currentZeroStart = i;
                currentZeroLength = 1;
            } else {
                currentZeroLength++;
            }
        } else {
            if (currentZeroLength > maxZeroLength) {
                maxZeroStart = currentZeroStart;
                maxZeroLength = currentZeroLength;
            }
            currentZeroStart = -1;
            currentZeroLength = 0;
        }
    }

    // Check the last sequence
    if (currentZeroLength > maxZeroLength) {
        maxZeroStart = currentZeroStart;
        maxZeroLength = currentZeroLength;
    }

    // Only compress if we have at least 2 consecutive zeros
    if (maxZeroLength >= 2) {
        let result = [];

        // Add groups before the zero sequence
        for (let i = 0; i < maxZeroStart; i++) {
            result.push(groups[i]);
        }

        // Add the double colon
        if (maxZeroStart === 0) {
            result.push("", ""); // For leading zeros
        } else {
            result.push("");
        }

        // Add groups after the zero sequence
        for (let i = maxZeroStart + maxZeroLength; i < groups.length; i++) {
            result.push(groups[i]);
        }

        // Join and clean up multiple colons
        let abbreviated = result.join(":");
        abbreviated = abbreviated.replace(/:{3,}/g, "::");

        return abbreviated;
    }

    // If no compression possible, just return without leading zeros
    return groups.join(":");
};

export const expandIPv6 = (abbreviatedIPv6) => {
    if (!abbreviatedIPv6 || typeof abbreviatedIPv6 !== "string")
        return abbreviatedIPv6;

    let ipv6 = abbreviatedIPv6;

    // Handle double colon expansion
    if (ipv6.includes("::")) {
        const parts = ipv6.split("::");
        const leftPart = parts[0] ? parts[0].split(":") : [];
        const rightPart = parts[1] ? parts[1].split(":") : [];

        const missingGroups = 8 - leftPart.length - rightPart.length;
        const zeroGroups = Array(missingGroups).fill("0000");

        const fullGroups = [...leftPart, ...zeroGroups, ...rightPart];
        ipv6 = fullGroups.join(":");
    }

    // Pad each group to 4 digits
    const groups = ipv6.split(":");
    const paddedGroups = groups.map((group) => group.padStart(4, "0"));

    return paddedGroups.join(":");
};

export const calculateIPv6NetworkData = (ipv6, prefix) => {
    // Add your IPv6 calculation logic here
    return {
        netzwerkadresse: "",
        typ: "",
        benutzbareIps: "",
    };
};

export const resetInputBorders = () => {
    document.querySelectorAll("input").forEach((input) => {
        input.classList.remove("correct", "wrong");
    });
};
