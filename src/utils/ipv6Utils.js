// IPv6 addresses essential for German IHK Fachinformatiker exam
const ihkEssentialIPv6Addresses = [
    // === GRUNDLAGEN (Basics) - Critical for IHK ===
    {
        address: "::1",
        type: "Loopback",
        commonUse: "IPv6 Loopback (localhost)",
        importance: "Critical",
        ihkTopic: "IPv6 Grundlagen",
    },
    {
        address: "::",
        type: "Unspecified",
        commonUse: "Unspezifizierte Adresse (alle Nullen)",
        importance: "Critical",
        ihkTopic: "IPv6 Grundlagen",
    },

    // === DOKUMENTATION - Critical for learning ===
    {
        address: "2001:db8::1",
        type: "Global Unicast",
        commonUse: "Dokumentations-/Beispieladresse",
        importance: "Critical",
        ihkTopic: "IPv6 Adressierung",
    },
    {
        address: "2001:db8::",
        type: "Global Unicast",
        commonUse: "Dokumentationsnetz (RFC 3849)",
        importance: "Critical",
        ihkTopic: "IPv6 Adressierung",
    },
    {
        address: "2001:db8:1::",
        type: "Global Unicast",
        commonUse: "Dokumentations-Subnetz",
        importance: "Important",
        ihkTopic: "IPv6 Subnetze",
    },

    // === LINK-LOCAL - Essential for IPv6 operation ===
    {
        address: "fe80::1",
        type: "Link-Local",
        commonUse: "Link-lokale Adresse (Router)",
        importance: "Critical",
        ihkTopic: "IPv6 Autokonfiguration",
    },
    {
        address: "fe80::",
        type: "Link-Local",
        commonUse: "Link-Local Netzwerk",
        importance: "Important",
        ihkTopic: "IPv6 Autokonfiguration",
    },

    // === MULTICAST - Basic knowledge ===
    {
        address: "ff02::1",
        type: "Multicast",
        commonUse: "Alle Knoten (All Nodes)",
        importance: "Critical",
        ihkTopic: "IPv6 Multicast",
    },
    {
        address: "ff02::2",
        type: "Multicast",
        commonUse: "Alle Router (All Routers)",
        importance: "Critical",
        ihkTopic: "IPv6 Multicast",
    },

    // === UNIQUE LOCAL - Private addressing ===
    {
        address: "fd00::1",
        type: "Unique Local",
        commonUse: "Private IPv6 Adresse (ULA)",
        importance: "Important",
        ihkTopic: "IPv6 Private Adressen",
    },
    {
        address: "fc00::1",
        type: "Unique Local",
        commonUse: "ULA Zentral zugewiesen",
        importance: "Moderate",
        ihkTopic: "IPv6 Private Adressen",
    },

    // === PRAKTISCHE DNS SERVER - Real world examples ===
    {
        address: "2001:4860:4860::8888",
        type: "Global Unicast",
        commonUse: "Google DNS primär",
        importance: "Important",
        ihkTopic: "IPv6 Praxis",
    },
    {
        address: "2606:4700:4700::1111",
        type: "Global Unicast",
        commonUse: "Cloudflare DNS primär",
        importance: "Important",
        ihkTopic: "IPv6 Praxis",
    },

    // === IPv4-MAPPED - Transition knowledge ===
    {
        address: "::ffff:192.0.2.1",
        type: "Global Unicast",
        commonUse: "IPv4-mapped IPv6 Adresse",
        importance: "Moderate",
        ihkTopic: "IPv4/IPv6 Übergang",
    },
];

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

// Optimized IPv6 generation for IHK Fachinformatiker exam
export const getRandomIPv6 = () => {
    // 50% must-know addresses for IHK, 50% educational realistic addresses
    const useMustKnow = Math.random() < 0.5;

    if (useMustKnow) {
        // Weighted selection focusing on IHK exam relevance
        const critical = ihkEssentialIPv6Addresses.filter(
            (a) => a.importance === "Critical"
        );
        const important = ihkEssentialIPv6Addresses.filter(
            (a) => a.importance === "Important"
        );
        const moderate = ihkEssentialIPv6Addresses.filter(
            (a) => a.importance === "Moderate"
        );

        const rand = Math.random();
        let pool;
        if (rand < 0.7) pool = critical; // 70% critical for IHK
        else if (rand < 0.95) pool = important; // 25% important
        else pool = moderate; // 5% moderate

        const chosen = pool[Math.floor(Math.random() * pool.length)];
        // Always expand the address to ensure full form
        return expandIPv6(chosen.address);
    }

    // Simplified realistic generation for educational purposes
    const rand = Math.random();
    if (rand < 0.6) {
        // 60% - Documentation addresses (most educational)
        return generateDocumentationIPv6();
    } else if (rand < 0.8) {
        // 20% - ULA addresses (private networking)
        return generateSimpleULA();
    } else if (rand < 0.9) {
        // 10% - Link-local addresses
        return generateSimpleLinkLocal();
    } else {
        // 10% - Simple Global Unicast
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

    // Generate simple, educational patterns
    const parts = [];
    for (let i = 0; i < remainingParts; i++) {
        if (Math.random() < 0.4) {
            parts.push("0000"); // Many zeros for compression practice
        } else if (Math.random() < 0.7) {
            // Simple values for learning - pad to 4 digits
            const simpleValues = [
                "0001",
                "0010",
                "0100",
                "000a",
                "00ab",
                "0abc",
            ];
            parts.push(
                simpleValues[Math.floor(Math.random() * simpleValues.length)]
            );
        } else {
            // Slightly more complex but still educational - ensure 4 digits
            const hex = Math.floor(Math.random() * 0x1000)
                .toString(16)
                .padStart(4, "0");
            parts.push(hex);
        }
    }

    const fullAddress = prefix + parts.join(":");
    const expanded = expandIPv6(fullAddress);

    // Validate the result - ensure it has exactly 8 groups
    const groups = expanded.split(":");
    if (groups.length !== 8 || groups.some((group) => group.length !== 4)) {
        // Fallback to a known good address if generation failed
        return expandIPv6("2001:db8::1");
    }

    return expanded;
};

// Generate simple ULA addresses for private networking education
const generateSimpleULA = () => {
    const prefixes = ["fd00:", "fd01:", "fd10:", "fc00:"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    // Calculate remaining parts correctly - ULA prefixes have 1 part
    const remainingParts = 7; // 8 total - 1 prefix part = 7 remaining

    const parts = [];
    for (let i = 0; i < remainingParts; i++) {
        if (Math.random() < 0.5) {
            parts.push("0000");
        } else if (i === 6 && Math.random() < 0.3) {
            parts.push("0001"); // Often ends with 1 - pad to 4 digits
        } else {
            const hex = Math.floor(Math.random() * 0x100)
                .toString(16)
                .padStart(4, "0");
            parts.push(hex);
        }
    }

    const fullAddress = prefix + parts.join(":");
    const expanded = expandIPv6(fullAddress);

    // Validate the result - ensure it has exactly 8 groups
    const groups = expanded.split(":");
    if (groups.length !== 8 || groups.some((group) => group.length !== 4)) {
        // Fallback to a known good ULA address if generation failed
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

// Generate simple Global Unicast addresses for education
const generateSimpleGlobalUnicast = () => {
    // Start with 2xxx for Global Unicast
    const firstPart =
        "2" +
        Math.floor(Math.random() * 0x100)
            .toString(16)
            .padStart(3, "0");
    const parts = [firstPart];

    // Generate 7 more parts for a complete IPv6 address
    for (let i = 0; i < 7; i++) {
        if (Math.random() < 0.5) {
            parts.push("0000"); // Lots of zeros for compression
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
        // Fallback to a known good global unicast address if generation failed
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

        // Validate the result - ensure it's not just ":"
        if (
            abbreviated === ":" ||
            abbreviated === "" ||
            abbreviated.startsWith(":::")
        ) {
            console.warn(
                "Invalid abbreviation result:",
                abbreviated,
                "from",
                ipv6
            );
            return groups.join(":"); // Return uncompressed if abbreviation failed
        }

        return abbreviated;
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

        return abbreviateIPv6(networkGroups.join(":"));
    } catch (error) {
        return "";
    }
};

// Helper function to calculate first subnet (more educational)
export const calculateFirstSubnet = (prefixLength) => {
    if (!prefixLength) return "";

    const prefix = parseInt(prefixLength.replace("/", ""));

    // Educational subnet calculations based on common scenarios
    if (prefix === 128) return "N/A"; // Host address, no subnetting
    if (prefix === 64) return "0"; // Standard /64 subnet
    if (prefix === 56) {
        // /56 to /64 allows for 256 subnets (8 bits)
        // First subnet would be /64
        return "0";
    }
    if (prefix === 48) {
        // /48 to /64 allows for 65,536 subnets (16 bits)
        // First subnet would be /64
        return "0";
    }
    if (prefix === 32) {
        // /32 to /64 allows for 4,294,967,296 subnets (32 bits)
        // First subnet would be /64
        return "0";
    }

    // For other prefixes, return the first subnet ID
    return "0";
};

export const calculateIPv6NetworkData = (ipv6, prefix) => {
    if (!ipv6 || !prefix) {
        return {
            networkAddress: "",
            type: "",
            usableIps: "",
        };
    }

    const addressType = getIPv6AddressType(ipv6);
    const networkAddress = calculateIPv6NetworkAddress(ipv6, prefix);
    const firstSubnet = calculateFirstSubnet(prefix);

    return {
        networkAddress: networkAddress,
        type: addressType,
        usableIps: firstSubnet,
    };
};

export const resetInputBorders = () => {
    document.querySelectorAll("input").forEach((input) => {
        input.classList.remove("correct", "wrong");
    });
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

    // Special addresses have specific prefix lengths
    if (address === "::1" || address === "::") {
        return "/128"; // Host addresses
    }

    switch (addressType) {
        case "Link-Local":
            // For IHK: Focus on /64 (subnet) and /10 (range)
            const linkLocalOptions = ["/10", "/64"];
            const linkLocalWeights = [0.3, 0.7];
            return weightedRandomChoice(linkLocalOptions, linkLocalWeights);

        case "Unique Local":
            // For IHK: Focus on practical business scenarios
            const ulaOptions = ["/48", "/56", "/64"]; // Removed /7 (too abstract for IHK)
            const ulaWeights = [0.4, 0.3, 0.3];
            return weightedRandomChoice(ulaOptions, ulaWeights);

        case "Multicast":
            // For IHK: Keep it simple
            const multicastOptions = ["/8", "/128"];
            const multicastWeights = [0.4, 0.6];
            return weightedRandomChoice(multicastOptions, multicastWeights);

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

// Simplified generation for IHK Fachinformatiker exam focus
export const generateIPv6WithPrefix = () => {
    // Simplified probabilities for educational focus
    const addressTypeRandom = Math.random();

    let targetType, targetPrefix, ipv6;

    if (addressTypeRandom < 0.1) {
        // 10% - Link-Local addresses (essential IPv6 knowledge)
        targetType = "Link-Local";
        targetPrefix = Math.random() < 0.7 ? "/64" : "/10";
        ipv6 = generateSimpleLinkLocal();
    } else if (addressTypeRandom < 0.15) {
        // 5% - Multicast addresses (basic IPv6 knowledge)
        targetType = "Multicast";
        targetPrefix = Math.random() < 0.6 ? "/128" : "/8";
        ipv6 = generateEducationalMulticast();
    } else if (addressTypeRandom < 0.25) {
        // 10% - ULA addresses (private IPv6)
        targetType = "Unique Local";
        targetPrefix = ["/48", "/56", "/64"][Math.floor(Math.random() * 3)];
        ipv6 = generateSimpleULA();
    } else {
        // 75% - Focus on educational addresses with realistic prefixes
        ipv6 = getRandomIPv6();
        targetPrefix = generateIPv6Prefix(ipv6);
        targetType = getIPv6AddressType(ipv6);
    }

    // Ensure we always have both full and abbreviated forms
    const fullAddress = expandIPv6(ipv6); // Always expand to full form
    const abbreviatedAddress = abbreviateIPv6(fullAddress); // Create proper abbreviation

    // Final validation - ensure we have valid addresses
    if (
        !isValidIPv6Address(fullAddress) ||
        !abbreviatedAddress ||
        abbreviatedAddress === ":"
    ) {
        console.warn(
            "Generated invalid IPv6 address, using fallback:",
            fullAddress,
            abbreviatedAddress
        );
        // Use a known good fallback
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
