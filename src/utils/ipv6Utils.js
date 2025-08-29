// IPv6 addresses essential for German IHK Fachinformatiker exam
const ihkEssentialIPv6Addresses = [
    // === GRUNDLAGEN (Basics) - Critical for IHK ===
    {
        address: "::1",
        type: "Loopback",
        commonUse: "IPv6 Loopback (localhost)",
        importance: "Critical",
        ihkTopic: "IPv6 Grundlagen",
        calculationSuitable: false, // Special address, not for network calculations
    },
    {
        address: "::",
        type: "Unspecified",
        commonUse: "Unspezifizierte Adresse (alle Nullen)",
        importance: "Critical",
        ihkTopic: "IPv6 Grundlagen",
        calculationSuitable: false, // Special address, not for network calculations
    },

    // === DOKUMENTATION - Critical for learning ===
    {
        address: "2001:db8::1",
        type: "Global Unicast",
        commonUse: "Dokumentations-/Beispieladresse",
        importance: "Critical",
        ihkTopic: "IPv6 Adressierung",
        calculationSuitable: true, // Good for network calculations
    },
    {
        address: "2001:db8::",
        type: "Global Unicast",
        commonUse: "Dokumentationsnetz (RFC 3849)",
        importance: "Critical",
        ihkTopic: "IPv6 Adressierung",
        calculationSuitable: false, // Network address, not suitable for host calculations
    },
    {
        address: "2001:db8:1::",
        type: "Global Unicast",
        commonUse: "Dokumentations-Subnetz",
        importance: "Important",
        ihkTopic: "IPv6 Subnetze",
        calculationSuitable: false, // Network address, not suitable for host calculations
    },

    // === LINK-LOCAL - Essential for IPv6 operation ===
    {
        address: "fe80::1",
        type: "Link-Local",
        commonUse: "Link-lokale Adresse (Router)",
        importance: "Critical",
        ihkTopic: "IPv6 Autokonfiguration",
        calculationSuitable: true, // Good for network calculations
    },
    {
        address: "fe80::",
        type: "Link-Local",
        commonUse: "Link-Local Netzwerk",
        importance: "Important",
        ihkTopic: "IPv6 Autokonfiguration",
        calculationSuitable: false, // Network address, not suitable for host calculations
    },

    // === MULTICAST - Basic knowledge ===
    {
        address: "ff02::1",
        type: "Multicast",
        commonUse: "Alle Knoten (All Nodes)",
        importance: "Critical",
        ihkTopic: "IPv6 Multicast",
        calculationSuitable: false, // Multicast address, not for network calculations
    },
    {
        address: "ff02::2",
        type: "Multicast",
        commonUse: "Alle Router (All Routers)",
        importance: "Critical",
        ihkTopic: "IPv6 Multicast",
        calculationSuitable: false, // Multicast address, not for network calculations
    },

    // === UNIQUE LOCAL - Private addressing ===
    {
        address: "fd00::1",
        type: "Unique Local",
        commonUse: "Private IPv6 Adresse (ULA)",
        importance: "Important",
        ihkTopic: "IPv6 Private Adressen",
        calculationSuitable: true, // Good for network calculations
    },
    {
        address: "fc00::1",
        type: "Unique Local",
        commonUse: "ULA Zentral zugewiesen",
        importance: "Moderate",
        ihkTopic: "IPv6 Private Adressen",
        calculationSuitable: true, // Good for network calculations
    },

    // === PRAKTISCHE DNS SERVER - Real world examples ===
    {
        address: "2001:4860:4860::8888",
        type: "Global Unicast",
        commonUse: "Google DNS primär",
        importance: "Important",
        ihkTopic: "IPv6 Praxis",
        calculationSuitable: true, // Good for network calculations
    },
    {
        address: "2606:4700:4700::1111",
        type: "Global Unicast",
        commonUse: "Cloudflare DNS primär",
        importance: "Important",
        ihkTopic: "IPv6 Praxis",
        calculationSuitable: true, // Good for network calculations
    },

    // === IPv4-MAPPED - Transition knowledge ===
    {
        address: "::ffff:192.0.2.1",
        type: "Global Unicast",
        commonUse: "IPv4-mapped IPv6 Adresse",
        importance: "Moderate",
        ihkTopic: "IPv4/IPv6 Übergang",
        calculationSuitable: false, // Special transition address, not for normal calculations
    },
];

// Check if an IPv6 address is a special-purpose address unsuitable for calculations
const isSpecialPurposeAddress = (address) => {
    if (!address || typeof address !== "string") return true;

    const addr = address.toLowerCase();

    // All zeros (unspecified address)
    if (addr === "0000:0000:0000:0000:0000:0000:0000:0000" || addr === "::") {
        return true;
    }

    // Loopback
    if (addr === "0000:0000:0000:0000:0000:0000:0000:0001" || addr === "::1") {
        return true;
    }

    // Multicast addresses (ff00::/8)
    if (addr.startsWith("ff")) {
        return true;
    }

    // IPv4-mapped addresses
    if (addr.includes("::ffff:")) {
        return true;
    }

    // Check if it's effectively all zeros after expansion
    const groups = addr.split(":");
    if (groups.length === 8 && groups.every((group) => group === "0000")) {
        return true;
    }

    return false;
};

// IPv6 addresses suitable for network calculations (filtered from essential list)
const calculationSuitableIPv6Addresses = ihkEssentialIPv6Addresses.filter(
    (addr) => addr.calculationSuitable === true
);

// Simplified realistic prefixes for IHK exam focus
const ihkRelevantPrefixes = [
    // Documentation addresses - most common in training
    "2001:db8:",
    "2001:db8:1:",
    "2001:db8:2:",
    "2001:db8:a:",
    "2001:db8:b:",
    "2001:db8:10:",
    "2001:db8:100:",

    // Simple ULA patterns
    "fd00:",
    "fd01:",
    "fd10:",
    "fc00:",

    // Basic Link-local
    "fe80:",

    // Simple Global Unicast for learning
    "2001::",
    "2002:",
    "2003:",
];

// Educational IPv6 addresses for training (IHK focused)
const specialIpv6Addresses = ihkEssentialIPv6Addresses;

// Optimized IPv6 generation for IHK Fachinformatiker exam - calculation suitable only
export const getRandomIPv6 = () => {
    // 50% must-know addresses for IHK, 50% educational realistic addresses
    const useMustKnow = Math.random() < 0.5;

    if (useMustKnow) {
        // Only use addresses suitable for network calculations
        const critical = calculationSuitableIPv6Addresses.filter(
            (a) => a.importance === "Critical"
        );
        const important = calculationSuitableIPv6Addresses.filter(
            (a) => a.importance === "Important"
        );
        const moderate = calculationSuitableIPv6Addresses.filter(
            (a) => a.importance === "Moderate"
        );

        // Ensure we have addresses available
        const allSuitable = [...critical, ...important, ...moderate];
        if (allSuitable.length === 0) {
            // Fallback to generated address if no suitable addresses
            return generateDocumentationIPv6();
        }

        const rand = Math.random();
        let pool;
        if (rand < 0.5 && critical.length > 0) pool = critical; // 50% critical
        else if (rand < 0.9 && important.length > 0)
            pool = important; // 40% important
        else if (moderate.length > 0) pool = moderate; // 10% moderate
        else pool = allSuitable; // Fallback to any suitable address

        const chosen = pool[Math.floor(Math.random() * pool.length)];
        // Always expand the address to ensure full form
        return expandIPv6(chosen.address);
    }

    // Simplified realistic generation for educational purposes
    const rand = Math.random();
    if (rand < 0.7) {
        // 70% - Documentation addresses (most educational and always calculation-suitable)
        return generateDocumentationIPv6();
    } else if (rand < 0.9) {
        // 20% - ULA addresses (private networking, calculation-suitable)
        return generateSimpleULA();
    } else {
        // 10% - Simple Global Unicast (calculation-suitable)
        return generateSimpleGlobalUnicast();
    }
};

// Generate educational documentation IPv6 addresses
const generateDocumentationIPv6 = () => {
    const prefixes = [
        "2001:db8:",
        "2001:db8:1:",
        "2001:db8:a:",
        "2001:db8:10:",
    ];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    // Calculate remaining parts correctly
    const prefixParts = prefix.split(":").filter((part) => part !== "");
    const remainingParts = 8 - prefixParts.length;

    // Ensure we have valid remaining parts
    if (remainingParts <= 0) {
        // Fallback to a simple known good address
        return expandIPv6("2001:db8::1");
    }

    // Generate simple, educational patterns - ensure at least one non-zero part
    const parts = [];
    let hasNonZero = false;

    for (let i = 0; i < remainingParts; i++) {
        if (i === remainingParts - 1 && !hasNonZero) {
            // Ensure the last part is non-zero if all others are zero
            const nonZeroValues = [
                "0001",
                "0010",
                "0100",
                "000a",
                "00ab",
                "0abc",
            ];
            parts.push(
                nonZeroValues[Math.floor(Math.random() * nonZeroValues.length)]
            );
            hasNonZero = true;
        } else if (Math.random() < 0.3) {
            parts.push("0000"); // Some zeros for compression practice, but not all
        } else if (Math.random() < 0.7) {
            // Simple values for learning - pad to 4 digits
            const simpleValues = [
                "0001",
                "0010",
                "0100",
                "000a",
                "00ab",
                "0abc",
                "1000",
                "0200",
            ];
            parts.push(
                simpleValues[Math.floor(Math.random() * simpleValues.length)]
            );
            hasNonZero = true;
        } else {
            // Slightly more complex but still educational - ensure 4 digits and non-zero
            const hex = (Math.floor(Math.random() * 0x1000) + 1) // +1 ensures non-zero
                .toString(16)
                .padStart(4, "0");
            parts.push(hex);
            hasNonZero = true;
        }
    }

    const fullAddress = prefix + parts.join(":");
    const expanded = expandIPv6(fullAddress);

    // Validate the result - ensure it has exactly 8 groups and is not all zeros
    const groups = expanded.split(":");
    if (groups.length !== 8 || groups.some((group) => group.length !== 4)) {
        // Fallback to a known good address if generation failed
        return expandIPv6("2001:db8::1");
    }

    // Ensure it's not all zeros (:: address)
    if (groups.every((group) => group === "0000")) {
        return expandIPv6("2001:db8::1");
    }

    return expanded;
};

// Generate simple ULA addresses for private networking education - calculation suitable
const generateSimpleULA = () => {
    const prefixes = ["fd00:", "fd01:", "fd10:", "fc00:"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    // Calculate remaining parts correctly - ULA prefixes have 1 part
    const remainingParts = 7; // 8 total - 1 prefix part = 7 remaining

    const parts = [];
    let hasNonZero = false;

    for (let i = 0; i < remainingParts; i++) {
        if (i === remainingParts - 1 && !hasNonZero) {
            // Ensure the last part is non-zero if all others are zero
            parts.push("0001");
            hasNonZero = true;
        } else if (Math.random() < 0.4) {
            parts.push("0000");
        } else if (i === 6 && Math.random() < 0.3) {
            parts.push("0001"); // Often ends with 1 - pad to 4 digits
            hasNonZero = true;
        } else {
            const hex = (Math.floor(Math.random() * 0x100) + 1) // +1 ensures non-zero
                .toString(16)
                .padStart(4, "0");
            parts.push(hex);
            hasNonZero = true;
        }
    }

    const fullAddress = prefix + parts.join(":");
    const expanded = expandIPv6(fullAddress);

    // Validate the result - ensure it has exactly 8 groups and is not all zeros
    const groups = expanded.split(":");
    if (groups.length !== 8 || groups.some((group) => group.length !== 4)) {
        // Fallback to a known good ULA address if generation failed
        return expandIPv6("fd00::1");
    }

    // Ensure it's not effectively all zeros (except prefix)
    const nonPrefixGroups = groups.slice(1); // Skip the first group (prefix)
    if (nonPrefixGroups.every((group) => group === "0000")) {
        return expandIPv6("fd00::1");
    }

    return expanded;
};

// Generate simple Link-Local addresses
const generateSimpleLinkLocal = () => {
    // Link-local addresses start with fe80:0000:0000:0000
    const parts = ["fe80", "0000", "0000", "0000"];

    // Add 4 more parts with simple patterns for the interface identifier
    for (let i = 0; i < 4; i++) {
        if (Math.random() < 0.4) {
            parts.push("0000");
        } else if (i === 3 && Math.random() < 0.3) {
            parts.push("0001"); // Often ends with 1 - pad to 4 digits
        } else {
            const hex = Math.floor(Math.random() * 0x1000)
                .toString(16)
                .padStart(4, "0");
            parts.push(hex);
        }
    }

    const fullAddress = parts.join(":");
    const expanded = expandIPv6(fullAddress);

    // Validate the result - ensure it has exactly 8 groups
    const groups = expanded.split(":");
    if (groups.length !== 8 || groups.some((group) => group.length !== 4)) {
        // Fallback to a known good link-local address if generation failed
        return expandIPv6("fe80::1");
    }

    return expanded;
};

// Generate simple Global Unicast addresses for education - calculation suitable
const generateSimpleGlobalUnicast = () => {
    // Start with 2xxx for Global Unicast
    const firstPart =
        "2" +
        Math.floor(Math.random() * 0x100)
            .toString(16)
            .padStart(3, "0");
    const parts = [firstPart];

    // Generate 7 more parts for a complete IPv6 address - ensure at least one non-zero
    let hasNonZero = false;
    for (let i = 0; i < 7; i++) {
        if (i === 6 && !hasNonZero) {
            // Ensure the last part is non-zero if all others are zero
            const hex = (Math.floor(Math.random() * 0x1000) + 1)
                .toString(16)
                .padStart(4, "0");
            parts.push(hex);
            hasNonZero = true;
        } else if (Math.random() < 0.4) {
            parts.push("0000"); // Some zeros for compression
        } else {
            const hex = (Math.floor(Math.random() * 0x1000) + 1) // +1 ensures non-zero
                .toString(16)
                .padStart(4, "0");
            parts.push(hex);
            hasNonZero = true;
        }
    }

    const fullAddress = parts.join(":");
    const expanded = expandIPv6(fullAddress);

    // Validate the result - ensure it has exactly 8 groups and is not all zeros
    const groups = expanded.split(":");
    if (groups.length !== 8 || groups.some((group) => group.length !== 4)) {
        // Fallback to a known good global unicast address if generation failed
        return expandIPv6("2001:db8::1");
    }

    // Ensure it's not effectively all zeros (except first part)
    const nonFirstGroups = groups.slice(1);
    if (nonFirstGroups.every((group) => group === "0000")) {
        return expandIPv6("2001:db8::1");
    }

    return expanded;
};

export const abbreviateIPv6 = (ipv6) => {
    if (!ipv6 || typeof ipv6 !== "string") return ipv6;

    // Validate input first
    const inputGroups = ipv6.split(":");
    if (
        inputGroups.length !== 8 ||
        inputGroups.some((group) => !/^[0-9a-fA-F]{4}$/.test(group))
    ) {
        console.warn("Invalid IPv6 address for abbreviation:", ipv6);
        return ipv6; // Return as-is if invalid
    }

    // Split into groups and remove leading zeros from each group
    let groups = ipv6
        .split(":")
        .map((group) => group.replace(/^0+/, "") || "0");

    // Find all sequences of consecutive zero groups
    let zeroSequences = [];
    let currentStart = -1;
    let currentLength = 0;

    for (let i = 0; i < groups.length; i++) {
        if (groups[i] === "0") {
            if (currentStart === -1) {
                currentStart = i;
                currentLength = 1;
            } else {
                currentLength++;
            }
        } else {
            if (currentLength >= 2) {
                zeroSequences.push({
                    start: currentStart,
                    length: currentLength,
                });
            }
            currentStart = -1;
            currentLength = 0;
        }
    }

    // Check the last sequence
    if (currentLength >= 2) {
        zeroSequences.push({ start: currentStart, length: currentLength });
    }

    // If we have zero sequences to compress
    if (zeroSequences.length > 0) {
        // Find the longest sequence. If there's a tie, choose the leftmost one.
        let maxSequence = zeroSequences.reduce((max, current) => {
            if (current.length > max.length) {
                return current;
            } else if (
                current.length === max.length &&
                current.start < max.start
            ) {
                return current;
            }
            return max;
        });

        // Create the abbreviated address
        let result;

        if (maxSequence.start === 0) {
            // Zero sequence starts at the beginning
            if (maxSequence.length === 8) {
                // All zeros
                result = "::";
            } else {
                // Leading zeros
                const afterGroups = groups.slice(
                    maxSequence.start + maxSequence.length
                );
                result = "::" + afterGroups.join(":");
            }
        } else if (maxSequence.start + maxSequence.length === 8) {
            // Zero sequence is at the end
            const beforeGroups = groups.slice(0, maxSequence.start);
            result = beforeGroups.join(":") + "::";
        } else {
            // Zero sequence is in the middle
            const beforeGroups = groups.slice(0, maxSequence.start);
            const afterGroups = groups.slice(
                maxSequence.start + maxSequence.length
            );
            result = beforeGroups.join(":") + "::" + afterGroups.join(":");
        }

        return result;
    }

    // If no compression possible, just return without leading zeros
    return groups.join(":");
};

export const expandIPv6 = (abbreviatedIPv6) => {
    if (!abbreviatedIPv6 || typeof abbreviatedIPv6 !== "string")
        return abbreviatedIPv6;

    // Handle edge cases
    if (
        abbreviatedIPv6 === ":" ||
        abbreviatedIPv6 === "" ||
        abbreviatedIPv6.startsWith(":::")
    ) {
        console.warn("Invalid IPv6 input for expansion:", abbreviatedIPv6);
        return "0000:0000:0000:0000:0000:0000:0000:0001"; // Return a fallback valid address
    }

    let ipv6 = abbreviatedIPv6;

    // Handle double colon expansion
    if (ipv6.includes("::")) {
        const parts = ipv6.split("::");
        const leftPart = parts[0] ? parts[0].split(":") : [];
        const rightPart = parts[1] ? parts[1].split(":") : [];

        // Remove empty strings from parts
        const leftFiltered = leftPart.filter((part) => part !== "");
        const rightFiltered = rightPart.filter((part) => part !== "");

        const missingGroups = 8 - leftFiltered.length - rightFiltered.length;

        // Ensure we have a valid number of missing groups
        if (missingGroups < 0) {
            console.warn(
                "Invalid IPv6 format - too many groups:",
                abbreviatedIPv6
            );
            return "0000:0000:0000:0000:0000:0000:0000:0001"; // Return fallback
        }

        const zeroGroups = Array(missingGroups).fill("0000");

        const fullGroups = [...leftFiltered, ...zeroGroups, ...rightFiltered];
        ipv6 = fullGroups.join(":");
    }

    // Pad each group to 4 digits
    const groups = ipv6.split(":");

    // Validate we have exactly 8 groups
    if (groups.length !== 8) {
        console.warn(
            "Invalid IPv6 format - wrong number of groups:",
            abbreviatedIPv6,
            "groups:",
            groups.length
        );
        return "0000:0000:0000:0000:0000:0000:0000:0001"; // Return fallback
    }

    const paddedGroups = groups.map((group) => {
        // Validate each group contains only hex characters
        if (!/^[0-9a-fA-F]*$/.test(group)) {
            console.warn("Invalid hex characters in group:", group);
            return "0000"; // Replace invalid group with zeros
        }
        return group.padStart(4, "0");
    });

    return paddedGroups.join(":");
};

// Helper function to determine IPv6 address type
export const getIPv6AddressType = (ipv6) => {
    if (!ipv6) return "Unknown";

    const address = ipv6.toLowerCase();

    // Loopback
    if (address === "::1") return "Loopback";

    // Unspecified
    if (address === "::") return "Unspecified";

    // Multicast (ff00::/8)
    if (address.startsWith("ff")) return "Multicast";

    // Link-Local (fe80::/10)
    if (
        address.startsWith("fe8") ||
        address.startsWith("fe9") ||
        address.startsWith("fea") ||
        address.startsWith("feb")
    ) {
        return "Link-Local";
    }

    // Unique Local (fc00::/7)
    if (address.startsWith("fc") || address.startsWith("fd")) {
        return "Unique Local";
    }

    // Global Unicast (everything else, primarily 2000::/3)
    return "Global Unicast";
};

// Helper function to calculate network address
export const calculateIPv6NetworkAddress = (ipv6, prefixLength) => {
    if (!ipv6 || !prefixLength) return "";

    try {
        // Expand the IPv6 address first
        const expanded = expandIPv6(ipv6);
        const groups = expanded.split(":");

        // Convert to binary representation
        let binaryAddress = "";
        for (const group of groups) {
            const decimal = parseInt(group, 16);
            binaryAddress += decimal.toString(2).padStart(16, "0");
        }

        // Apply prefix mask
        const prefix = parseInt(prefixLength.replace("/", ""));
        const networkBinary =
            binaryAddress.substring(0, prefix) + "0".repeat(128 - prefix);

        // Convert back to IPv6 format
        const networkGroups = [];
        for (let i = 0; i < 128; i += 16) {
            const groupBinary = networkBinary.substring(i, i + 16);
            const groupHex = parseInt(groupBinary, 2)
                .toString(16)
                .padStart(4, "0");
            networkGroups.push(groupHex);
        }

        const fullNetworkAddress = networkGroups.join(":");

        // For network addresses, we need to be careful about abbreviation
        // to preserve the network boundary indication
        const abbreviatedNetworkAddress = abbreviateIPv6(fullNetworkAddress);

        // Special handling: if the prefix length doesn't align with group boundaries,
        // we need to ensure the network boundary is preserved in the representation
        const groupBoundary = Math.floor(prefix / 16);
        const bitsInPartialGroup = prefix % 16;

        if (bitsInPartialGroup > 0) {
            // The prefix crosses a group boundary
            // We need to ensure the partial group is visible in the representation
            const cleanGroups = networkGroups.map(
                (group) => group.replace(/^0+/, "") || "0"
            );

            // Find the longest sequence of zeros starting from the partial group + 1
            let maxZeroStart = -1;
            let maxZeroLength = 0;
            let currentZeroStart = -1;
            let currentZeroLength = 0;

            // Only consider compression from the group after the partial group
            for (let i = groupBoundary + 1; i < cleanGroups.length; i++) {
                if (cleanGroups[i] === "0") {
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

            // Check if the last sequence was the longest
            if (currentZeroLength > maxZeroLength) {
                maxZeroStart = currentZeroStart;
                maxZeroLength = currentZeroLength;
            }

            // Only compress if we have 2 or more consecutive zeros after the network boundary
            if (maxZeroLength >= 2 && maxZeroStart > groupBoundary) {
                const before = cleanGroups.slice(0, maxZeroStart);
                const after = cleanGroups.slice(maxZeroStart + maxZeroLength);

                if (after.length === 0) {
                    return before.join(":") + "::";
                } else {
                    return before.join(":") + "::" + after.join(":");
                }
            }

            // No valid compression after network boundary, return without compression
            return (
                cleanGroups.slice(0, groupBoundary + 1).join(":") +
                (cleanGroups.slice(groupBoundary + 1).every((g) => g === "0")
                    ? "::"
                    : ":" + cleanGroups.slice(groupBoundary + 1).join(":"))
            );
        }

        // If prefix aligns with group boundary, use normal abbreviation
        return abbreviatedNetworkAddress;
    } catch (error) {
        console.error("Error calculating network address:", error);
        return "";
    }
};

// Helper function to calculate Interface ID (last 64 bits of IPv6 address)
// Calculate the Interface-Anteil (interface portion) from an IPv6 address
export const calculateInterfaceId = (ipv6, prefixLength = 64) => {
    if (!ipv6) return "";

    try {
        // For prefixes >= 65, there's no interface portion (all bits are network/host)
        // Standard IPv6 has 64-bit interface portion, so only /65 and higher have no interface
        if (prefixLength >= 65) {
            return "kein";
        }

        // Expand the IPv6 address first
        const expanded = expandIPv6(ipv6);
        const groups = expanded.split(":");

        // Get the last 4 groups (64 bits) - the interface portion (Interface-Anteil)
        const interfaceGroups = groups.slice(4);

        // Remove leading zeros from each group
        const cleanedGroups = interfaceGroups.map(
            (group) => group.replace(/^0+/, "") || "0"
        );

        // Check if all groups are zero
        if (cleanedGroups.every((group) => group === "0")) {
            return "::";
        }

        // Find the longest sequence of consecutive zero groups for compression
        let maxZeroStart = -1;
        let maxZeroLength = 0;
        let currentZeroStart = -1;
        let currentZeroLength = 0;

        for (let i = 0; i < cleanedGroups.length; i++) {
            if (cleanedGroups[i] === "0") {
                if (currentZeroStart === -1) {
                    currentZeroStart = i;
                    currentZeroLength = 1;
                } else {
                    currentZeroLength++;
                }
            } else {
                // End of current zero sequence
                if (currentZeroLength > maxZeroLength) {
                    maxZeroStart = currentZeroStart;
                    maxZeroLength = currentZeroLength;
                }
                currentZeroStart = -1;
                currentZeroLength = 0;
            }
        }

        // Check if the last sequence was the longest
        if (currentZeroLength > maxZeroLength) {
            maxZeroStart = currentZeroStart;
            maxZeroLength = currentZeroLength;
        }

        // Only compress if we have 2 or more consecutive zeros
        if (maxZeroLength >= 2) {
            const before = cleanedGroups.slice(0, maxZeroStart);
            const after = cleanedGroups.slice(maxZeroStart + maxZeroLength);

            if (before.length === 0 && after.length === 0) {
                return "::";
            } else if (before.length === 0) {
                return "::" + after.join(":");
            } else if (after.length === 0) {
                return before.join(":") + "::";
            } else {
                return before.join(":") + "::" + after.join(":");
            }
        }

        // No compression needed - return the interface groups without leading zeros
        return cleanedGroups.join(":");
    } catch (error) {
        console.error("Error calculating interface ID:", error);
        return "";
    }
};

// Calculate the Subnet-Anteil (subnet portion) from an IPv6 address
export const calculateSubnetId = (ipv6, prefixLength = 64) => {
    if (!ipv6) return "";

    try {
        // Expand the IPv6 address first
        const expanded = expandIPv6(ipv6);
        const groups = expanded.split(":");

        // The subnet portion depends on the prefix length
        // IPv6 structure: Network + Subnet + Interface (last 64 bits)
        // Interface is always the last 64 bits (groups 5-8)
        // Network + Subnet = first 64 bits (groups 1-4)

        if (prefixLength >= 64) {
            // For /64 or longer prefixes, there's no subnet portion - it's all network
            return "kein";
        }

        // Calculate how many bits are available for subnet (between network and interface)
        const interfaceStartBit = 64; // Interface always starts at bit 64
        const subnetStartBit = prefixLength;
        const subnetBits = interfaceStartBit - subnetStartBit;

        if (subnetBits <= 0) {
            return "kein"; // No subnet space available
        }

        // Determine which groups contain the subnet portion
        const subnetStartGroup = Math.floor(subnetStartBit / 16);
        const subnetEndGroup = Math.floor((interfaceStartBit - 1) / 16);

        // Extract subnet groups
        const subnetGroups = [];
        for (let i = subnetStartGroup; i <= subnetEndGroup; i++) {
            if (i < groups.length) {
                subnetGroups.push(groups[i] || "0000");
            } else {
                subnetGroups.push("0000");
            }
        }

        // For educational purposes, show the complete subnet representation
        if (subnetGroups.length === 1) {
            // Single group subnet (e.g., /48 to /64)
            const group = subnetGroups[0];

            // Check if we need partial group handling
            const bitsInFirstGroup = subnetStartBit % 16;
            const bitsInLastGroup = interfaceStartBit % 16;

            if (bitsInFirstGroup === 0 && bitsInLastGroup === 0) {
                // Complete group
                return group.toLowerCase();
            } else {
                // Partial group - extract only subnet bits
                const groupValue = parseInt(group, 16);
                const groupBinary = groupValue.toString(2).padStart(16, "0");

                const startBit = bitsInFirstGroup;
                const endBit = bitsInLastGroup === 0 ? 16 : bitsInLastGroup;

                const subnetBinary = groupBinary.substring(startBit, endBit);
                const subnetValue = parseInt(subnetBinary, 2);

                // For subnet portions, show the actual hex value without unnecessary padding
                // The number of hex digits should reflect the actual number of bits
                const subnetBits = endBit - startBit;
                const hexDigits = Math.ceil(subnetBits / 4);

                return subnetValue
                    .toString(16)
                    .padStart(hexDigits, "0")
                    .toLowerCase();
            }
        } else {
            // Multiple group subnet (e.g., /32 has 32-bit subnet = 2 groups)
            // Return all subnet groups joined with colons
            const cleanedGroups = subnetGroups.map((group) =>
                group.toLowerCase()
            );
            return cleanedGroups.join(":");
        }
    } catch (error) {
        console.error("Error calculating subnet ID:", error);
        return "";
    }
}; // Helper function to calculate possible subnets based on prefix length
export const calculateIPv6NetworkData = (ipv6, prefix) => {
    if (!ipv6 || !prefix) {
        return {
            networkAddress: "",
            type: "",
            interfaceId: "",
        };
    }

    const addressType = getIPv6AddressType(ipv6);
    const networkAddress = calculateIPv6NetworkAddress(ipv6, prefix);
    const prefixLength = parseInt(prefix.replace("/", ""));
    const interfaceId = calculateInterfaceId(ipv6, prefixLength);

    return {
        networkAddress: networkAddress,
        type: addressType,
        interfaceId: interfaceId,
    };
};

export const resetInputBorders = () => {
    document.querySelectorAll("input").forEach((input) => {
        input.classList.remove("correct", "wrong");
    });
};

// Get educational hints for IPv6 address types (helpful for IHK students)
export const getIPv6EducationalHints = (ipv6, prefix) => {
    if (!ipv6) return null;

    const addressType = getIPv6AddressType(ipv6);
    const prefixNum = prefix ? parseInt(prefix.replace("/", "")) : null;

    const hints = {
        type: addressType,
        hints: [],
        educational: true,
    };

    switch (addressType) {
        case "Global Unicast":
            hints.hints.push("🌍 Internet-routbare Adresse");
            if (ipv6.toLowerCase().startsWith("2001:db8:")) {
                hints.hints.push(
                    "📚 RFC 3849 Dokumentationsadresse - nur für Beispiele!"
                );
            }
            if (prefixNum === 64) {
                hints.hints.push("🏠 Typische Endnetz-Größe für SLAAC");
            }
            break;

        case "Link-Local":
            hints.hints.push("🔗 Nur im lokalen Netzwerksegment gültig");
            hints.hints.push(
                "⚙️ Automatisch auf jeder IPv6-Schnittstelle konfiguriert"
            );
            hints.hints.push("🚫 Wird nicht geroutet");
            break;

        case "Unique Local":
            hints.hints.push("🏢 Private IPv6-Adressen (wie RFC 1918 in IPv4)");
            hints.hints.push("🔒 Nicht im Internet routbar");
            if (ipv6.toLowerCase().startsWith("fd")) {
                hints.hints.push("🎲 Lokal generiert (häufigste Form)");
            }
            break;

        case "Multicast":
            hints.hints.push("📢 Ein-zu-viele Kommunikation");
            hints.hints.push("🔄 Ersetzt IPv4-Broadcast");
            if (ipv6.toLowerCase() === "ff02::1") {
                hints.hints.push("👥 Alle IPv6-Knoten (All Nodes)");
            }
            if (ipv6.toLowerCase() === "ff02::2") {
                hints.hints.push("🗂️ Alle IPv6-Router (All Routers)");
            }
            break;

        case "Loopback":
            hints.hints.push("🔄 IPv6 Localhost (wie 127.0.0.1 in IPv4)");
            hints.hints.push("🏠 Verweist immer auf den lokalen Rechner");
            break;

        case "Unspecified":
            hints.hints.push(
                "❓ Unspezifizierte Adresse (wie 0.0.0.0 in IPv4)"
            );
            hints.hints.push(
                "🚀 Wird bei der automatischen Konfiguration verwendet"
            );
            break;
    }

    // Add prefix-specific hints
    if (prefixNum) {
        if (prefixNum === 128) {
            hints.hints.push("🎯 Host-Adresse (keine Subnetze möglich)");
        } else if (prefixNum === 64) {
            hints.hints.push("📱 Standard-Subnetzgröße für IPv6-Endnetze");
        } else if (prefixNum === 48) {
            hints.hints.push(
                "🏢 Typische Unternehmenszuteilung (65.536 /64-Subnetze)"
            );
        } else if (prefixNum === 56) {
            hints.hints.push(
                "🏠 Kleine Unternehmen/Privathaushalte (256 /64-Subnetze)"
            );
        }
    }

    return hints;
};

// Get educational information about the IPv6 address
export const getIPv6AddressInfo = (ipv6) => {
    if (!ipv6) return null;

    const specialAddress = specialIpv6Addresses.find(
        (addr) =>
            expandIPv6(addr.address.toLowerCase()) ===
            expandIPv6(ipv6.toLowerCase())
    );

    if (specialAddress) {
        return {
            isSpecial: true,
            type: specialAddress.type,
            description: specialAddress.commonUse,
            educational: true,
        };
    }

    const type = getIPv6AddressType(ipv6);
    const address = ipv6.toLowerCase();

    let description = "";
    let educational = false;

    switch (type) {
        case "Global Unicast":
            if (address.startsWith("2001:db8:")) {
                description =
                    "Documentation prefix (RFC 3849) - used in examples";
                educational = true;
            } else if (address.startsWith("2001:4860:")) {
                description = "Google's address space";
                educational = true;
            } else if (address.startsWith("2606:4700:")) {
                description = "Cloudflare's address space";
                educational = true;
            } else if (address.startsWith("2001:470:")) {
                description = "Hurricane Electric tunnel broker";
                educational = true;
            } else {
                description = "Globally routable unicast address";
            }
            break;
        case "Link-Local":
            description = "Auto-configured on every interface, not routed";
            educational = true;
            break;
        case "Unique Local":
            description = "Private address space, similar to RFC 1918 in IPv4";
            educational = true;
            break;
        case "Multicast":
            description = "One-to-many communication address";
            educational = true;
            break;
        default:
            description = `${type} address`;
    }

    return {
        isSpecial: false,
        type,
        description,
        educational,
    };
};

// IHK-focused prefix generation for educational purposes
export const generateIPv6Prefix = (ipv6) => {
    if (!ipv6) return "/64";

    const addressType = getIPv6AddressType(ipv6);
    const address = ipv6.toLowerCase();

    // Special addresses have specific prefix lengths per RFC standards
    if (address === "::1" || address === "::") {
        return "/128"; // Host addresses (Loopback and Unspecified)
    }

    switch (addressType) {
        case "Link-Local":
            // Link-Local addresses are always /64 (RFC 4291, Section 2.5.6)
            // fe80::/10 is the overall range, but individual addresses use /64
            return "/64";

        case "Unique Local":
            // For IHK: Focus on practical business scenarios
            const ulaOptions = ["/48", "/56", "/64"]; // Removed /7 (too abstract for IHK)
            const ulaWeights = [0.4, 0.3, 0.3];
            return weightedRandomChoice(ulaOptions, ulaWeights);

        case "Multicast":
            // Multicast range is ff00::/8, but individual addresses are /128
            // For education: show both the range concept and specific addresses
            if (address.startsWith("ff")) {
                // For specific multicast addresses, use /128
                return "/128";
            } else {
                // For general multicast range
                return "/8";
            }

        case "Global Unicast":
            // Documentation addresses - focus on common educational prefixes
            if (address.startsWith("2001:db8:")) {
                const docOptions = ["/32", "/48", "/56", "/64"];
                const docWeights = [0.1, 0.3, 0.3, 0.3]; // More focus on practical sizes
                return weightedRandomChoice(docOptions, docWeights);
            }

            // For other Global Unicast - IHK relevant sizes only
            const globalOptions = ["/32", "/48", "/56", "/64", "/128"];
            const globalWeights = [0.1, 0.25, 0.25, 0.35, 0.05]; // Heavy focus on /64
            return weightedRandomChoice(globalOptions, globalWeights);

        case "Loopback":
        case "Unspecified":
            return "/128";

        default:
            // Default to /64 (most important for IHK)
            return "/64";
    }
};

// Helper function for weighted random selection
const weightedRandomChoice = (options, weights) => {
    let random = Math.random();
    let cumulativeWeight = 0;

    for (let i = 0; i < options.length; i++) {
        cumulativeWeight += weights[i];
        if (random <= cumulativeWeight) {
            return options[i];
        }
    }

    return options[options.length - 1]; // Fallback
};

// Simplified generation for IHK Fachinformatiker exam focus - calculation suitable only
export const generateIPv6WithPrefix = () => {
    // Focus only on addresses suitable for network calculations
    const addressTypeRandom = Math.random();

    let targetType, targetPrefix, ipv6;

    if (addressTypeRandom < 0.2) {
        // 20% - ULA addresses (private IPv6, good for calculations)
        targetType = "Unique Local";
        targetPrefix = ["/48", "/56", "/64"][Math.floor(Math.random() * 3)];
        ipv6 = generateSimpleULA();
    } else if (addressTypeRandom < 0.4) {
        // 20% - Simple Global Unicast (good for calculations)
        targetType = "Global Unicast";
        targetPrefix = ["/32", "/48", "/56", "/64"][
            Math.floor(Math.random() * 4)
        ];
        ipv6 = generateSimpleGlobalUnicast();
    } else {
        // 60% - Focus on calculation-suitable addresses from known list and documentation
        ipv6 = getRandomIPv6();
        targetPrefix = generateIPv6Prefix(ipv6);
        targetType = getIPv6AddressType(ipv6);
    }

    // Ensure we always have both full and abbreviated forms
    const fullAddress = expandIPv6(ipv6); // Always expand to full form
    const abbreviatedAddress = abbreviateIPv6(fullAddress); // Create proper abbreviation

    // Final validation - ensure we have valid calculation-suitable addresses
    if (
        !isValidIPv6Address(fullAddress) ||
        !abbreviatedAddress ||
        abbreviatedAddress === ":" ||
        isSpecialPurposeAddress(fullAddress)
    ) {
        console.warn(
            "Generated invalid or special-purpose IPv6 address, using fallback:",
            fullAddress,
            abbreviatedAddress
        );
        // Use a known good fallback suitable for calculations
        const fallbackFull = "2001:0db8:0000:0000:0000:0000:0000:0001";
        const fallbackAbbrev = "2001:db8::1";
        return {
            ipv6: fallbackFull,
            prefix: "/64",
            abbreviated: fallbackAbbrev,
            networkData: calculateIPv6NetworkData(fallbackFull, "/64"),
            addressInfo: getIPv6AddressInfo(fallbackFull),
        };
    }

    return {
        ipv6: fullAddress, // Always return full address as base
        prefix: targetPrefix,
        abbreviated: abbreviatedAddress,
        networkData: calculateIPv6NetworkData(fullAddress, targetPrefix),
        addressInfo: getIPv6AddressInfo(fullAddress),
    };
};

// Generate educational multicast addresses for IHK
const generateEducationalMulticast = () => {
    const commonMulticast = [
        "ff02::1", // All nodes - critical for IHK
        "ff02::2", // All routers - critical for IHK
        "ff01::1", // Interface-local all nodes
        "ff05::2", // Site-local all routers
    ];

    if (Math.random() < 0.8) {
        // 80% chance of well-known multicast (educational)
        const chosen =
            commonMulticast[Math.floor(Math.random() * commonMulticast.length)];
        return expandIPv6(chosen); // Ensure full format
    } else {
        // 20% chance of simple custom multicast
        const scopes = ["1", "2", "5", "8"]; // Interface, Link, Site, Organization
        const scope = scopes[Math.floor(Math.random() * scopes.length)];
        const customAddress = `ff0${scope}::${Math.floor(Math.random() * 0x100)
            .toString(16)
            .padStart(4, "0")}`;
        return expandIPv6(customAddress); // Ensure full format
    }
};

// Generate specific Link-Local address optimized for IHK learning
const generateLinkLocalAddress = () => {
    // Use the new simplified function
    return generateSimpleLinkLocal();
};

// Generate specific Multicast address optimized for IHK learning
const generateMulticastAddress = () => {
    // Use the new educational function
    return generateEducationalMulticast();
};

// Generate specific ULA address optimized for IHK learning
const generateULAAddress = () => {
    // Use the new simplified function
    return generateSimpleULA();
};

// Generate specific Global Unicast address optimized for IHK learning
const generateGlobalUnicastAddress = () => {
    // Focus on documentation addresses for education
    return generateDocumentationIPv6();
};

// Validate if a string is a complete IPv6 address
export const isValidIPv6Address = (address) => {
    if (!address || typeof address !== "string") return false;

    // Handle special cases
    if (address === "::") return true; // Unspecified address
    if (address === "::1") return true; // Loopback

    // Basic IPv6 format validation
    const ipv6Regex =
        /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$|^::$|^([0-9a-fA-F]{0,4}:){1,7}:$|^:([0-9a-fA-F]{0,4}:){1,7}$/;
    const fullFormatRegex = /^([0-9a-fA-F]{4}:){7}[0-9a-fA-F]{4}$/;

    // Check if it matches basic patterns
    if (!ipv6Regex.test(address) && !fullFormatRegex.test(address)) {
        return false;
    }

    // Additional validation: ensure we have exactly 8 groups when expanded
    try {
        const expanded = expandIPv6(address);
        const groups = expanded.split(":");
        return (
            groups.length === 8 &&
            groups.every(
                (group) => group.length === 4 && /^[0-9a-fA-F]{4}$/.test(group)
            )
        );
    } catch (error) {
        return false;
    }
};

// Check if an address is a network prefix (incomplete address)
export const isNetworkPrefix = (address) => {
    if (!address || typeof address !== "string") return false;

    // Ends with :: or has fewer than 8 groups when not using ::
    if (address.endsWith("::") && address !== "::") return true;

    // Count colons to estimate if it's incomplete
    const colonCount = (address.match(/:/g) || []).length;
    if (!address.includes("::") && colonCount < 7) return true;

    return false;
};

// IHK-focused IPv6 prefix information for German students
export const getIPv6PrefixInfo = (prefix) => {
    const prefixNum = parseInt(prefix.replace("/", ""));

    switch (prefixNum) {
        case 128:
            return {
                description: "Einzelne Host-Adresse (wie /32 bei IPv4)",
                usage: "Loopback, spezifische Host-Routen",
                example: "::1/128 (Loopback-Adresse)",
                ihkRelevance: "Hoch - Grundlagen IPv6",
            };
        case 64:
            return {
                description: "Standard-Subnetzgröße - am häufigsten verwendet",
                usage: "LAN-Segmente, SLAAC erforderlich, Endnetze",
                example: "2001:db8:1234:5678::/64",
                ihkRelevance: "Sehr hoch - Standard für IPv6-Subnetze",
            };
        case 56:
            return {
                description: "Kleine Unternehmen/Privathaushalte",
                usage: "Ermöglicht 256 /64-Subnetze, Heimnetzwerke",
                example: "2001:db8:1234:ab00::/56",
                ihkRelevance: "Mittel - Praxisrelevant für KMU",
            };
        case 48:
            return {
                description: "Site-Zuteilung für Organisationen",
                usage: "Ermöglicht 65.536 /64-Subnetze, typische Unternehmen",
                example: "2001:db8:1234::/48",
                ihkRelevance: "Hoch - Typische Unternehmensgröße",
            };
        case 32:
            return {
                description: "ISP/Große Organisationen",
                usage: "Regionale Zuweisungen, Service Provider",
                example: "2001:db8::/32",
                ihkRelevance: "Mittel - ISP-Ebene",
            };
        case 10:
            return {
                description: "Link-Local Adressbereich",
                usage: "Automatisch konfiguriert, nicht geroutet",
                example: "fe80::/10",
                ihkRelevance: "Hoch - Automatische IPv6-Konfiguration",
            };
        case 8:
            return {
                description: "Multicast-Adressbereich",
                usage: "Eins-zu-viele Kommunikation",
                example: "ff00::/8",
                ihkRelevance: "Mittel - IPv6-Multicast-Grundlagen",
            };
        default:
            if (prefixNum < 32) {
                return {
                    description: "Sehr große Netzwerkzuteilung",
                    usage: "RIR oder sehr große ISP-Zuteilung",
                    example: "Große Netzwerkblöcke",
                    ihkRelevance: "Niedrig - Zu abstrakt für IHK-Prüfung",
                };
            } else if (prefixNum < 48) {
                return {
                    description: "Große Organisationszuteilung",
                    usage: "Unternehmen oder ISP-Kundenzuteilung",
                    example: "Mittelgroße bis große Netzwerke",
                    ihkRelevance: "Mittel - Größere Unternehmen",
                };
            } else if (prefixNum < 64) {
                return {
                    description: "Mittlere Organisationszuteilung",
                    usage: "Mehrere Subnetze möglich",
                    example: "Mehrere /64-Subnetze verfügbar",
                    ihkRelevance: "Hoch - Praktische Subnetzplanung",
                };
            } else {
                return {
                    description: "Kleines Subnetz oder Host-Bereich",
                    usage: "Sehr spezifische Adressierung",
                    example: "Kleiner Adressbereich",
                    ihkRelevance: "Niedrig - Selten in der Praxis",
                };
            }
    }
};

// IPv6 Special Purpose Addresses for IHK Fachinformatiker exam
const specialPurposeAddresses = [
    // LOOPBACK - Critical for exam
    {
        address: "::1",
        commonUse: "IPv6 Localhost/Loopback",
        importance: "Critical",
        category: "Loopback",
        range: "::1/128",
        specialRules:
            "Verweist immer auf den lokalen Rechner, entspricht 127.0.0.1 in IPv4",
    },

    // UNSPECIFIED - Critical concept (equivalent to 0.0.0.0)
    {
        address: "::",
        commonUse: "Unspezifizierte Adresse",
        importance: "Critical",
        category: "Unspecified",
        range: "::/128",
        specialRules: "Unspezifizierte Adresse, entspricht 0.0.0.0 in IPv4",
    },

    // DOCUMENTATION - Critical for learning (equivalent to test networks)
    {
        address: "2001:db8::",
        commonUse: "Dokumentationsbereich",
        importance: "Critical",
        category: "Documentation",
        range: "2001:db8::/32",
        specialRules:
            "RFC 3849 - Ausschließlich für Dokumentation und Beispiele",
    },

    // LINK-LOCAL - Critical for IPv6 operation (equivalent to APIPA)
    {
        address: "fe80::",
        commonUse: "Link-lokale Adressen",
        importance: "Critical",
        category: "Link-Local",
        range: "fe80::/10",
        specialRules: "Automatisch konfiguriert, entspricht APIPA in IPv4",
    },

    // UNIQUE LOCAL - Critical for private networks (equivalent to RFC 1918)
    {
        address: "fc00::",
        commonUse: "ULA zentral zugewiesen",
        importance: "Important",
        category: "Private Networks",
        range: "fc00::/7 (zentral zugewiesen)",
        specialRules:
            "Zentral zugewiesene private IPv6-Adressen (seltener verwendet)",
    },
    {
        address: "fd00::",
        commonUse: "ULA lokal generiert - Häufigste private IPv6",
        importance: "Critical",
        category: "Private Networks",
        range: "fc00::/7 (lokal generiert)",
        specialRules:
            "Meist verwendete private IPv6-Adressen in Unternehmen, entspricht RFC 1918",
    },

    // GLOBAL UNICAST - Critical for understanding (equivalent to public IPv4)
    {
        address: "2001::",
        commonUse: "Global Unicast 2xxx - Häufigster ISP-Bereich",
        importance: "Critical",
        category: "Global Unicast",
        range: "2000::/3",
        specialRules:
            "Internet-routbare IPv6-Adressen, häufig von ISPs zugewiesen",
    },
    {
        address: "3000::",
        commonUse: "Global Unicast 3xxx - Weiterer Global Bereich",
        importance: "Important",
        category: "Global Unicast",
        range: "2000::/3",
        specialRules: "Weiterer Global Unicast Adressbereich, Internet-routbar",
    },

    // MULTICAST - Important concept (equivalent to Class D)
    {
        address: "ff00::",
        commonUse: "Multicast-Adressen",
        importance: "Critical",
        category: "Multicast",
        range: "ff00::/8",
        specialRules:
            "Gruppenkommunkation, ersetzt IPv4-Broadcast (224.0.0.0/4)",
    },
    {
        address: "ff02::1",
        commonUse: "Alle IPv6-Knoten (All Nodes)",
        importance: "Important",
        category: "Multicast",
        range: "ff00::/8",
        specialRules: "Ersetzt IPv4-Broadcast 255.255.255.255",
    },
    {
        address: "ff02::2",
        commonUse: "Alle IPv6-Router (All Routers)",
        importance: "Important",
        category: "Multicast",
        range: "ff00::/8",
        specialRules: "Spezielle Multicast-Adresse für alle Router",
    },

    // IPv4-COMPATIBLE (Basic transition concept)
    {
        address: "::ffff:0:0",
        commonUse: "IPv4-mapped IPv6 (Grundlagen)",
        importance: "Important",
        category: "Transition",
        range: "::ffff:0:0/96",
        specialRules: "Ermöglicht IPv4-Kompatibilität in IPv6-Umgebungen",
    },
];

// Function to get all IPv6 special addresses
export const getAllSpecialAddresses = () => {
    return specialPurposeAddresses;
};
