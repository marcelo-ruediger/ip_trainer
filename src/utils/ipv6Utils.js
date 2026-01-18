const createRandomHexGroup = (maxValue = 0x1000, ensureNonZero = false) => {
    const min = ensureNonZero ? 1 : 0;
    return (Math.floor(Math.random() * (maxValue - min)) + min)
        .toString(16)
        .padStart(4, "0");
};

const generateRandomIPv6Parts = (count, hasNonZeroRequirement = true) => {
    const parts = [];
    let hasNonZero = false;

    for (let i = 0; i < count; i++) {
        if (i === count - 1 && !hasNonZero && hasNonZeroRequirement) {
            parts.push(createRandomHexGroup(0x1000, true));
            hasNonZero = true;
        } else if (Math.random() < 0.3) {
            parts.push("0000");
        } else {
            const group = createRandomHexGroup();
            if (group !== "0000") hasNonZero = true;
            parts.push(group);
        }
    }

    return parts;
};

const validateIPv6Groups = (groups, fallbackAddress = "2001:db8::1") => {
    if (groups.length !== 8 || groups.some((group) => group.length !== 4)) {
        return expandIPv6(fallbackAddress);
    }

    if (groups.every((group) => group === "0000")) {
        return expandIPv6(fallbackAddress);
    }

    return groups.join(":");
};

const ihkEssentialIPv6Addresses = [
    // Loopback
    {
        address: "::1",
        type: "Loopback",
        commonUse: "IPv6 Localhost/Loopback",
        importance: "Critical",
        ihkTopic: "IPv6 Grundlagen",
        range: "::1/128",
        calculationSuitable: true,
        category: "Loopback",
    },
    // Unspecified
    {
        address: "::",
        type: "Unspecified",
        commonUse: "Unspezifizierte Adresse",
        importance: "Critical",
        ihkTopic: "IPv6 Grundlagen",
        range: "::/128",
        calculationSuitable: true,
        category: "Unspecified",
    },
    // Documentation
    {
        address: "2001:db8::",
        type: "Documentation",
        commonUse: "Dokumentationsbereich",
        importance: "Critical",
        ihkTopic: "IPv6 Adressierung",
        range: "2001:db8::/32",
        calculationSuitable: false,
        category: "Documentation",
    },
    // Link-Local
    {
        address: "fe80::",
        type: "Link-Local",
        commonUse: "Link-lokale Adressen",
        importance: "Critical",
        ihkTopic: "IPv6 Autokonfiguration",
        range: "fe80::/10",
        calculationSuitable: false,
        category: "Link-Local",
    },
    // Private Networks - ULA Central
    {
        address: "fc00::",
        type: "ULA",
        commonUse: "ULA Central Network",
        importance: "Moderate",
        ihkTopic: "IPv6 Private Adressen",
        range: "fc00::/7",
        calculationSuitable: false,
        category: "Private Networks",
    },
    // Private Networks - ULA Local
    {
        address: "fd00::",
        type: "ULA",
        commonUse: "ULA Local Network",
        importance: "Important",
        ihkTopic: "IPv6 Private Adressen",
        range: "fd00::/8",
        calculationSuitable: false,
        category: "Private Networks",
    },
    // Global Unicast - Global 2xxx
    {
        address: "2001::",
        type: "Global Unicast",
        commonUse: "Global Unicast 2xxx - Häufigster ISP-Bereich",
        importance: "Important",
        ihkTopic: "IPv6 Global Addressing",
        range: "2000::/3",
        calculationSuitable: false,
        category: "Global Unicast",
    },
    // Global Unicast - Global 3xxx
    {
        address: "3000::",
        type: "Global Unicast",
        commonUse: "Global Unicast 3xxx - Weiterer Global Bereich",
        importance: "Important",
        ihkTopic: "IPv6 Global Addressing",
        range: "3000::/4",
        calculationSuitable: false,
        category: "Global Unicast",
    },
    // Multicast - Multicast Base
    {
        address: "ff00::",
        type: "Multicast",
        commonUse: "Multicast Network",
        importance: "Important",
        ihkTopic: "IPv6 Multicast",
        range: "ff00::/8",
        calculationSuitable: false,
        category: "Multicast",
    },
    // Multicast - All Nodes
    {
        address: "ff02::1",
        type: "Multicast",
        commonUse: "Alle IPv6-Knoten (All Nodes)",
        importance: "Critical",
        ihkTopic: "IPv6 Multicast",
        calculationSuitable: true,
        category: "Multicast",
    },
    // Multicast - All Routers
    {
        address: "ff02::2",
        type: "Multicast",
        commonUse: "Alle IPv6-Router (All Routers)",
        importance: "Critical",
        ihkTopic: "IPv6 Multicast",
        calculationSuitable: true,
        category: "Multicast",
    },
    // IPv4 Mapped
    {
        address: "::ffff:0:0",
        type: "Transition",
        commonUse: "IPv4-mapped IPv6 (Grundlagen)",
        importance: "Moderate",
        ihkTopic: "IPv4/IPv6 Übergang",
        range: "::ffff:0:0/96",
        calculationSuitable: false,
        category: "Transition",
    },
    // IPv4-embedded IPv6
    {
        address: "64:ff9b::",
        type: "Transition",
        commonUse: "IPv4-embedded IPv6 Translation Prefix",
        importance: "Moderate",
        ihkTopic: "IPv4/IPv6 Übergang",
        range: "64:ff9b::/96",
        calculationSuitable: false,
        category: "Transition",
    },
];

const calculationSuitableIPv6Addresses = ihkEssentialIPv6Addresses.filter(
    (addr) => addr.calculationSuitable === true
);

export const getRandomIPv6 = () => {
    const rand = Math.random();

    // 10% - Special critical addresses (Loopback, Unspecified, critical Multicast)
    if (rand < 0.10) {
        const specialAddresses = [
            { address: "::1", type: "Loopback" },
            { address: "::", type: "Unspecified" },
            { address: "ff02::1", type: "Multicast" },
            { address: "ff02::2", type: "Multicast" },
        ];
        const chosen =
            specialAddresses[
                Math.floor(Math.random() * specialAddresses.length)
            ];
        return expandIPv6(chosen.address);
    }

    // 25% - Documentation addresses (most common for training/examples)
    if (rand < 0.35) {
        return generateDocumentationIPv6();
    }

    // 15% - Link-Local addresses (fe80::)
    if (rand < 0.50) {
        return generateSimpleLinkLocal();
    }

    // 15% - ULA addresses (fd00::, fc00::)
    if (rand < 0.65) {
        return generateSimpleULA();
    }

    // 20% - Global Unicast addresses
    if (rand < 0.85) {
        return generateSimpleGlobalUnicast();
    }

    // 15% - Educational/Important addresses from the knowledge base
    const critical = calculationSuitableIPv6Addresses.filter(
        (a) => a.importance === "Critical"
    );
    const important = calculationSuitableIPv6Addresses.filter(
        (a) => a.importance === "Important"
    );
    const moderate = calculationSuitableIPv6Addresses.filter(
        (a) => a.importance === "Moderate"
    );

    const allSuitable = [...critical, ...important, ...moderate];
    if (allSuitable.length === 0) {
        return generateDocumentationIPv6();
    }

    const poolRand = Math.random();
    let pool;
    if (poolRand < 0.6 && critical.length > 0) pool = critical;
    else if (poolRand < 0.9 && important.length > 0) pool = important;
    else if (moderate.length > 0) pool = moderate;
    else pool = allSuitable;

    const chosen = pool[Math.floor(Math.random() * pool.length)];
    return expandIPv6(chosen.address);
};

const generateDocumentationIPv6 = () => {
    const prefixes = [
        "2001:db8:",
        "2001:db8:1:",
        "2001:db8:a:",
        "2001:db8:10:",
    ];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    const prefixParts = prefix.split(":").filter((part) => part !== "");
    const remainingParts = 8 - prefixParts.length;

    if (remainingParts <= 0) {
        return expandIPv6("2001:db8::1");
    }

    const parts = generateRandomIPv6Parts(remainingParts);

    const fullAddress = prefix + parts.join(":");
    const expanded = expandIPv6(fullAddress);
    const groups = expanded.split(":");

    return validateIPv6Groups(groups, "2001:db8::1");
};

const generateSimpleULA = () => {
    const prefixes = ["fd00:", "fd01:", "fd10:", "fc00:"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    const parts = generateRandomIPv6Parts(7);
    const fullAddress = prefix + parts.join(":");
    const expanded = expandIPv6(fullAddress);
    const groups = expanded.split(":");

    return validateIPv6Groups(groups, "fd00::1");
};

const generateSimpleLinkLocal = () => {
    const parts = ["fe80", "0000", "0000", "0000"];
    const interfaceParts = generateRandomIPv6Parts(4, false);

    const fullAddress = [...parts, ...interfaceParts].join(":");
    const expanded = expandIPv6(fullAddress);
    const groups = expanded.split(":");

    return validateIPv6Groups(groups, "fe80::1");
};

const generateSimpleGlobalUnicast = () => {
    const firstPart =
        "2" +
        Math.floor(Math.random() * 0x100)
            .toString(16)
            .padStart(3, "0");
    const remainingParts = generateRandomIPv6Parts(7);

    const fullAddress = [firstPart, ...remainingParts].join(":");
    const expanded = expandIPv6(fullAddress);
    const groups = expanded.split(":");

    return validateIPv6Groups(groups, "2001:db8::1");
};

export const abbreviateIPv6 = (ipv6) => {
    if (!ipv6 || typeof ipv6 !== "string") return ipv6;

    const inputGroups = ipv6.split(":");
    if (
        inputGroups.length !== 8 ||
        inputGroups.some((group) => !/^[0-9a-fA-F]{4}$/.test(group))
    ) {
        console.warn("Invalid IPv6 address for abbreviation:", ipv6);
        return ipv6;
    }

    let groups = ipv6
        .split(":")
        .map((group) => group.replace(/^0+/, "") || "0");

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

    if (currentLength >= 2) {
        zeroSequences.push({ start: currentStart, length: currentLength });
    }

    if (zeroSequences.length > 0) {
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

        let result;

        if (maxSequence.start === 0) {
            if (maxSequence.length === 8) {
                result = "::";
            } else {
                const afterGroups = groups.slice(
                    maxSequence.start + maxSequence.length
                );
                result = "::" + afterGroups.join(":");
            }
        } else if (maxSequence.start + maxSequence.length === 8) {
            const beforeGroups = groups.slice(0, maxSequence.start);
            result = beforeGroups.join(":") + "::";
        } else {
            const beforeGroups = groups.slice(0, maxSequence.start);
            const afterGroups = groups.slice(
                maxSequence.start + maxSequence.length
            );
            result = beforeGroups.join(":") + "::" + afterGroups.join(":");
        }

        return result;
    }

    return groups.join(":");
};

export const expandIPv6 = (abbreviatedIPv6) => {
    if (!abbreviatedIPv6 || typeof abbreviatedIPv6 !== "string")
        return abbreviatedIPv6;

    if (
        abbreviatedIPv6 === ":" ||
        abbreviatedIPv6 === "" ||
        abbreviatedIPv6.startsWith(":::")
    ) {
        console.warn("Invalid IPv6 input for expansion:", abbreviatedIPv6);
        return "0000:0000:0000:0000:0000:0000:0000:0001";
    }

    let ipv6 = abbreviatedIPv6;

    if (ipv6.includes("::")) {
        const parts = ipv6.split("::");
        const leftPart = parts[0] ? parts[0].split(":") : [];
        const rightPart = parts[1] ? parts[1].split(":") : [];

        const leftFiltered = leftPart.filter((part) => part !== "");
        const rightFiltered = rightPart.filter((part) => part !== "");

        const missingGroups = 8 - leftFiltered.length - rightFiltered.length;

        if (missingGroups < 0) {
            console.warn(
                "Invalid IPv6 format - too many groups:",
                abbreviatedIPv6
            );
            return "0000:0000:0000:0000:0000:0000:0000:0001";
        }

        const zeroGroups = Array(missingGroups).fill("0000");
        const fullGroups = [...leftFiltered, ...zeroGroups, ...rightFiltered];
        ipv6 = fullGroups.join(":");
    }

    const groups = ipv6.split(":");

    if (groups.length !== 8) {
        console.warn(
            "Invalid IPv6 format - wrong number of groups:",
            abbreviatedIPv6,
            "groups:",
            groups.length
        );
        return "0000:0000:0000:0000:0000:0000:0000:0001";
    }

    const paddedGroups = groups.map((group) => {
        if (!/^[0-9a-fA-F]*$/.test(group)) {
            console.warn("Invalid hex characters in group:", group);
            return "0000";
        }
        return group.padStart(4, "0");
    });

    return paddedGroups.join(":");
};

export const getIPv6AddressType = (ipv6) => {
    if (!ipv6) return "Unknown";

    const address = ipv6.toLowerCase();

    if (
        address === "::1" ||
        address === "0000:0000:0000:0000:0000:0000:0000:0001"
    ) {
        return "Loopback";
    }

    if (
        address === "::" ||
        address === "0000:0000:0000:0000:0000:0000:0000:0000"
    ) {
        return "Unspecified";
    }

    if (address.startsWith("2001:db8:") || address.startsWith("2001:0db8:")) {
        return "Documentation";
    }

    if (address.startsWith("ff")) return "Multicast";

    if (
        address.startsWith("fe8") ||
        address.startsWith("fe9") ||
        address.startsWith("fea") ||
        address.startsWith("feb")
    ) {
        return "Link-Local";
    }

    if (address.startsWith("fc") || address.startsWith("fd")) {
        return "ULA";
    }

    return "Global Unicast";
};

export const calculateIPv6NetworkAddress = (ipv6, prefixLength) => {
    if (!ipv6 || !prefixLength) return "";

    try {
        const expanded = expandIPv6(ipv6);
        const groups = expanded.split(":");
        const prefix = parseInt(prefixLength.replace("/", ""));
        const completeGroups = Math.floor(prefix / 16);
        const remainingBits = prefix % 16;
        const networkGroups = [];
        for (let i = 0; i < completeGroups; i++) {
            const cleanGroup = groups[i].replace(/^0+/, "") || "0";
            networkGroups.push(cleanGroup);
        }

        if (remainingBits > 0 && completeGroups < 8) {
            const partialGroup = groups[completeGroups];
            const decimal = parseInt(partialGroup, 16);
            const binary = decimal.toString(2).padStart(16, "0");
            const networkBits = binary.substring(0, remainingBits);
            // Pad the network bits to 16 bits to preserve position (trailing zeros matter!)
            const paddedBinary = networkBits.padEnd(16, "0");
            const networkDecimal = parseInt(paddedBinary, 2);
            const networkHex = networkDecimal.toString(16).padStart(4, "0");
            // Remove only leading zeros, NOT trailing zeros
            const cleanedHex = networkHex.replace(/^0+/, "") || "0";
            
            networkGroups.push(cleanedHex);
        }

        if (networkGroups.length === 0) {
            return "::";
        }
        if (prefix === 128) {
            const fullAddress = networkGroups
                .map((group) => group.padStart(4, "0"))
                .join(":");
            return abbreviateIPv6(fullAddress);
        }

        const networkWithZeros = networkGroups.join(":") + "::";
        const paddedGroups = [...networkGroups];
        while (paddedGroups.length < 8) {
            paddedGroups.push("0000");
        }
        const fullNetworkAddress = paddedGroups
            .map((group) => (group.length < 4 ? group.padStart(4, "0") : group))
            .join(":");

        const abbreviated = abbreviateIPv6(fullNetworkAddress);
        if (abbreviated.length <= networkWithZeros.length) {
            return abbreviated;
        }

        return networkWithZeros;
    } catch (error) {
        console.error("Error calculating network address:", error);
        return "";
    }
};

export const calculateInterfaceId = (ipv6, prefixLength = 64) => {
    if (!ipv6) return "";

    try {
        if (prefixLength >= 65) {
            return "kein";
        }

        const expanded = expandIPv6(ipv6);
        const groups = expanded.split(":");
        const interfaceGroups = groups.slice(4);
        const cleanedGroups = interfaceGroups.map(
            (group) => group.replace(/^0+/, "") || "0"
        );
        if (cleanedGroups.every((group) => group === "0")) {
            return "::";
        }

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
                if (currentZeroLength > maxZeroLength) {
                    maxZeroStart = currentZeroStart;
                    maxZeroLength = currentZeroLength;
                }
                currentZeroStart = -1;
                currentZeroLength = 0;
            }
        }

        if (currentZeroLength > maxZeroLength) {
            maxZeroStart = currentZeroStart;
            maxZeroLength = currentZeroLength;
        }
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

        return cleanedGroups.join(":");
    } catch (error) {
        console.error("Error calculating interface ID:", error);
        return "";
    }
};

export const calculateSubnetId = (ipv6, prefixLength = 64) => {
    if (!ipv6) return "";

    try {
        const expanded = expandIPv6(ipv6);
        const groups = expanded.split(":");

        if (prefixLength >= 64) {
            return "kein";
        }

        const interfaceStartBit = 64;
        const subnetStartBit = prefixLength;
        const subnetBits = interfaceStartBit - subnetStartBit;

        if (subnetBits <= 0) {
            return "kein";
        }

        const subnetStartGroup = Math.floor(subnetStartBit / 16);
        const subnetEndGroup = Math.floor((interfaceStartBit - 1) / 16);

        const subnetGroups = [];
        for (let i = subnetStartGroup; i <= subnetEndGroup; i++) {
            if (i < groups.length) {
                subnetGroups.push(groups[i] || "0000");
            } else {
                subnetGroups.push("0000");
            }
        }

        if (subnetGroups.length === 1) {
            const group = subnetGroups[0];
            const bitsInFirstGroup = subnetStartBit % 16;
            const bitsInLastGroup = interfaceStartBit % 16;

            if (bitsInFirstGroup === 0 && bitsInLastGroup === 0) {
                return group.toLowerCase();
            } else {
                const groupValue = parseInt(group, 16);
                const groupBinary = groupValue.toString(2).padStart(16, "0");
                const startBit = bitsInFirstGroup;
                const endBit = bitsInLastGroup === 0 ? 16 : bitsInLastGroup;
                const subnetBinary = groupBinary.substring(startBit, endBit);
                const subnetValue = parseInt(subnetBinary, 2);
                const subnetBits = endBit - startBit;
                const hexDigits = Math.ceil(subnetBits / 4);

                return subnetValue
                    .toString(16)
                    .padStart(hexDigits, "0")
                    .toLowerCase();
            }
        } else {
            const cleanedGroups = subnetGroups.map((group) =>
                group.toLowerCase()
            );
            return cleanedGroups.join(":");
        }
    } catch (error) {
        console.error("Error calculating subnet ID:", error);
        return "";
    }
};

export const calculateIPv6NetworkData = (ipv6, prefix) => {
    if (!ipv6 || !prefix) {
        return {
            networkAddress: "",
            type: "",
            interfaceId: "",
        };
    }

    const addressType = getIPv6AddressType(ipv6);
    const prefixLength = parseInt(prefix.replace("/", ""));

    if (
        (addressType === "Loopback" || addressType === "Unspecified") &&
        prefixLength === 128
    ) {
        return {
            networkAddress: "kein",
            type: addressType,
            interfaceId: "kein",
        };
    }

    const networkAddress = calculateIPv6NetworkAddress(ipv6, prefix);
    const interfaceId = calculateInterfaceId(ipv6, prefixLength);

    return {
        networkAddress: networkAddress,
        type: addressType,
        interfaceId: interfaceId,
    };
};

export const resetInputBorders = () => {
    document.querySelectorAll("input").forEach((input) => {
        input.classList.remove("correct", "wrong", "empty");
    });
};

export const getIPv6AddressInfo = (ipv6) => {
    if (!ipv6) return null;

    const specialAddress = ihkEssentialIPv6Addresses.find(
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
            if (address.startsWith("2001:4860:")) {
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
        case "Documentation":
            description = "Documentation prefix (RFC 3849) - used in examples";
            educational = true;
            break;
        case "Link-Local":
            description = "Auto-configured on every interface, not routed";
            educational = true;
            break;
        case "ULA":
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

export const generateIPv6Prefix = (ipv6) => {
    if (!ipv6) return "/64";

    const addressType = getIPv6AddressType(ipv6);
    const address = ipv6.toLowerCase();

    if (
        address === "::1" ||
        address === "0000:0000:0000:0000:0000:0000:0000:0001" ||
        address === "::" ||
        address === "0000:0000:0000:0000:0000:0000:0000:0000"
    ) {
        return "/128";
    }

    switch (addressType) {
        case "Link-Local":
            return "/64";

        case "ULA":
            const ulaOptions = ["/48", "/56", "/64"];
            const ulaWeights = [0.5, 0.25, 0.25];
            return weightedRandomChoice(ulaOptions, ulaWeights);

        case "Documentation":
            const docOptions = ["/48", "/56", "/64"];
            const docWeights = [0.2, 0.3, 0.5];
            return weightedRandomChoice(docOptions, docWeights);

        case "Multicast":
            if (address.startsWith("ff")) {
                return "/128";
            } else {
                return "/8";
            }

        case "Global Unicast":
            const globalOptions = ["/32", "/48", "/56", "/64"];
            const globalWeights = [0.1, 0.3, 0.25, 0.35];
            return weightedRandomChoice(globalOptions, globalWeights);

        case "Loopback":
        case "Unspecified":
            return "/128";

        default:
            return "/64";
    }
};

const weightedRandomChoice = (options, weights) => {
    let random = Math.random();
    let cumulativeWeight = 0;

    for (let i = 0; i < options.length; i++) {
        cumulativeWeight += weights[i];
        if (random <= cumulativeWeight) {
            return options[i];
        }
    }

    return options[options.length - 1];
};

export const generateIPv6WithPrefix = () => {
    const ipv6 = getRandomIPv6();
    const targetPrefix = generateIPv6Prefix(ipv6);

    const fullAddress = expandIPv6(ipv6);
    const abbreviatedAddress = abbreviateIPv6(fullAddress);
    const actualType = getIPv6AddressType(fullAddress);

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
        ipv6: fullAddress,
        prefix: targetPrefix,
        abbreviated: abbreviatedAddress,
        networkData: calculateIPv6NetworkData(fullAddress, targetPrefix),
        addressInfo: getIPv6AddressInfo(fullAddress),
    };
};

const generateEducationalMulticast = () => {
    const commonMulticast = ["ff02::1", "ff02::2", "ff01::1", "ff05::2"];

    if (Math.random() < 0.8) {
        const chosen =
            commonMulticast[Math.floor(Math.random() * commonMulticast.length)];
        return expandIPv6(chosen);
    } else {
        const scopes = ["1", "2", "5", "8"];
        const scope = scopes[Math.floor(Math.random() * scopes.length)];
        const customAddress = `ff0${scope}::${createRandomHexGroup()}`;
        return expandIPv6(customAddress);
    }
};

export const isValidIPv6Address = (address) => {
    if (!address || typeof address !== "string") return false;

    if (address === "::" || address === "::1") return true;

    const ipv6Regex =
        /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$|^::$|^([0-9a-fA-F]{0,4}:){1,7}:$|^:([0-9a-fA-F]{0,4}:){1,7}$/;
    const fullFormatRegex = /^([0-9a-fA-F]{4}:){7}[0-9a-fA-F]{4}$/;

    if (!ipv6Regex.test(address) && !fullFormatRegex.test(address)) {
        return false;
    }

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

export const isNetworkPrefix = (address) => {
    if (!address || typeof address !== "string") return false;

    if (address.endsWith("::") && address !== "::") return true;

    const colonCount = (address.match(/:/g) || []).length;
    if (!address.includes("::") && colonCount < 7) return true;

    return false;
};

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

export const getAllSpecialAddresses = () => {
    return ihkEssentialIPv6Addresses;
};
