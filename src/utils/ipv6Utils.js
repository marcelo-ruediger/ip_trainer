// Most important IPv6 addresses that every network professional must know
const mustKnowIpv6Addresses = [
    // === LOOPBACK & UNSPECIFIED ===
    {
        address: "::1",
        type: "Loopback",
        commonUse: "IPv6 localhost/loopback",
        importance: "Critical",
    },
    {
        address: "::",
        type: "Unspecified",
        commonUse: "All-zeros/unspecified address",
        importance: "Critical",
    },

    // === LINK-LOCAL (fe80::/10) ===
    {
        address: "fe80::1",
        type: "Link-Local",
        commonUse: "Router link-local address",
        importance: "Critical",
    },
    {
        address: "fe80::200:5efe:192.168.1.1",
        type: "Link-Local",
        commonUse: "ISATAP tunnel address",
        importance: "Important",
    },
    {
        address: "fe80::a00:27ff:fe4e:66a1",
        type: "Link-Local",
        commonUse: "EUI-64 SLAAC address",
        importance: "Important",
    },

    // === MULTICAST WELL-KNOWN (ff00::/8) ===
    {
        address: "ff02::1",
        type: "Multicast",
        commonUse: "All nodes multicast",
        importance: "Critical",
    },
    {
        address: "ff02::2",
        type: "Multicast",
        commonUse: "All routers multicast",
        importance: "Critical",
    },
    {
        address: "ff02::5",
        type: "Multicast",
        commonUse: "OSPFv3 routers",
        importance: "Important",
    },
    {
        address: "ff02::6",
        type: "Multicast",
        commonUse: "OSPFv3 designated routers",
        importance: "Important",
    },
    {
        address: "ff02::9",
        type: "Multicast",
        commonUse: "RIPng routers",
        importance: "Important",
    },
    {
        address: "ff02::a",
        type: "Multicast",
        commonUse: "EIGRP routers",
        importance: "Important",
    },
    {
        address: "ff02::d",
        type: "Multicast",
        commonUse: "PIM routers",
        importance: "Important",
    },
    {
        address: "ff02::16",
        type: "Multicast",
        commonUse: "MLDv2 reports",
        importance: "Moderate",
    },
    {
        address: "ff05::2",
        type: "Multicast",
        commonUse: "Site-local all routers",
        importance: "Moderate",
    },
    {
        address: "ff01::1",
        type: "Multicast",
        commonUse: "Interface-local all nodes",
        importance: "Moderate",
    },
    {
        address: "ff01::2",
        type: "Multicast",
        commonUse: "Interface-local all routers",
        importance: "Moderate",
    },

    // === DOCUMENTATION (2001:db8::/32) ===
    {
        address: "2001:db8::1",
        type: "Global Unicast",
        commonUse: "Documentation/example prefix",
        importance: "Critical",
    },
    {
        address: "2001:db8:85a3::8a2e:370:7334",
        type: "Global Unicast",
        commonUse: "RFC 3849 example address",
        importance: "Important",
    },
    {
        address: "2001:db8:1234::",
        type: "Global Unicast",
        commonUse: "Documentation network",
        importance: "Important",
    },

    // === UNIQUE LOCAL (fc00::/7) ===
    {
        address: "fd00::1",
        type: "Unique Local",
        commonUse: "ULA private address",
        importance: "Important",
    },
    {
        address: "fc00::1",
        type: "Unique Local",
        commonUse: "ULA prefix example",
        importance: "Important",
    },
    {
        address: "fd12:3456:789a:1::1",
        type: "Unique Local",
        commonUse: "ULA network gateway",
        importance: "Moderate",
    },

    // === REAL-WORLD DNS SERVERS ===
    {
        address: "2001:4860:4860::8888",
        type: "Global Unicast",
        commonUse: "Google DNS primary",
        importance: "Critical",
    },
    {
        address: "2001:4860:4860::8844",
        type: "Global Unicast",
        commonUse: "Google DNS secondary",
        importance: "Critical",
    },
    {
        address: "2606:4700:4700::1111",
        type: "Global Unicast",
        commonUse: "Cloudflare DNS primary",
        importance: "Critical",
    },
    {
        address: "2606:4700:4700::1001",
        type: "Global Unicast",
        commonUse: "Cloudflare DNS secondary",
        importance: "Critical",
    },
    {
        address: "2001:4860:4860::64",
        type: "Global Unicast",
        commonUse: "Google DNS64",
        importance: "Moderate",
    },
    {
        address: "2001:4860:4860::6464",
        type: "Global Unicast",
        commonUse: "Google DNS64 secondary",
        importance: "Moderate",
    },

    // === TRANSITION MECHANISMS ===
    {
        address: "2002:c000:0204::1",
        type: "Global Unicast",
        commonUse: "6to4 tunnel (192.0.2.4)",
        importance: "Important",
    },
    {
        address: "2001:0000:4136:e378:8000:63bf:3fff:fdd2",
        type: "Global Unicast",
        commonUse: "Teredo tunnel",
        importance: "Important",
    },
    {
        address: "64:ff9b::192.0.2.1",
        type: "Global Unicast",
        commonUse: "Well-known prefix NAT64",
        importance: "Important",
    },

    // === ROOT SERVERS & INFRASTRUCTURE ===
    {
        address: "2001:500:200f::b",
        type: "Global Unicast",
        commonUse: "B-Root DNS server",
        importance: "Important",
    },
    {
        address: "2001:500:2::c",
        type: "Global Unicast",
        commonUse: "C-Root DNS server",
        importance: "Important",
    },
    {
        address: "2001:7fd::1",
        type: "Global Unicast",
        commonUse: "K-Root DNS server",
        importance: "Important",
    },

    // === SPECIAL USE ADDRESSES ===
    {
        address: "::ffff:192.0.2.1",
        type: "Global Unicast",
        commonUse: "IPv4-mapped IPv6 address",
        importance: "Important",
    },
    {
        address: "2001:db8::",
        type: "Global Unicast",
        commonUse: "Documentation prefix base",
        importance: "Critical",
    },
    {
        address: "::192.0.2.1",
        type: "Global Unicast",
        commonUse: "IPv4-compatible IPv6 (deprecated)",
        importance: "Moderate",
    },
];

// Educational IPv6 addresses for training (enhanced from previous)
const specialIpv6Addresses = mustKnowIpv6Addresses;

// Common realistic IPv6 prefixes for generation (enhanced with more zero patterns)
const realisticPrefixes = [
    // Global Unicast common prefixes
    "2001:db8:", // Documentation
    "2001:db8:0:", // Documentation with zero
    "2001:db8:0:0:", // Documentation with more zeros
    "2001:470:", // Hurricane Electric
    "2001:470:0:", // Hurricane Electric with zero
    "2001:4860:", // Google
    "2001:4860:4860:", // Google DNS
    "2606:4700:", // Cloudflare
    "2606:4700:0:", // Cloudflare with zero
    "2400:cb00:", // Cloudflare Asia
    "2a00:1450:", // Google Europe
    "2620:fe::", // Facebook
    "2001:500:", // Root servers

    // ISP common prefixes (enhanced with more zero patterns)
    "2001:558:", // Comcast
    "2001:558:0:", // Comcast with zero
    "2602::", // Various US ISPs
    "2602:0:", // US ISPs with zero
    "2602:0:0:", // US ISPs with more zeros
    "2607:f8b0:", // Google Fiber
    "2607:f8b0:0:", // Google Fiber with zero
    "240e::", // China Telecom
    "240e:0:", // China Telecom with zero
    "2400::", // APNIC region
    "2400:0:", // APNIC with zero
    "2a01::", // RIPE region
    "2a01:0:", // RIPE with zero
    "2800::", // LACNIC region
    "2800:0:", // LACNIC with zero

    // Common patterns with multiple zeros (very realistic)
    "2001::", // Common global unicast start
    "2002::", // 6to4 addresses
    "2003::", // Common allocation
    "2602:0:0:", // Common US ISP pattern
    "2001:db8:0:0:", // Documentation with zeros
    "fd00::", // ULA start
    "fc00::", // ULA start
    "fe80::", // Link-local start

    // More realistic zero-heavy patterns
    "2001:0:0:", // Global unicast with zeros
    "2606:4700:0:", // Cloudflare with zeros
    "2a00:1450:0:", // Google Europe with zeros
];

// Enhanced IPv6 generation with more must-know addresses
export const getRandomIPv6 = () => {
    const useSpecialAddress = Math.random() < 0.4; // 40% chance for must-know addresses

    if (useSpecialAddress) {
        // Weight addresses by importance
        const criticalAddresses = specialIpv6Addresses.filter(
            (addr) => addr.importance === "Critical"
        );
        const importantAddresses = specialIpv6Addresses.filter(
            (addr) => addr.importance === "Important"
        );
        const moderateAddresses = specialIpv6Addresses.filter(
            (addr) => addr.importance === "Moderate"
        );

        const random = Math.random();
        let selectedArray;

        if (random < 0.6) {
            selectedArray = criticalAddresses;
        } else if (random < 0.85) {
            selectedArray = importantAddresses;
        } else {
            selectedArray = moderateAddresses;
        }

        const randomAddress =
            selectedArray[Math.floor(Math.random() * selectedArray.length)];
        return randomAddress.address;
    }

    const useRealisticPrefix = Math.random() < 0.8; // 80% chance for realistic prefixes

    if (useRealisticPrefix) {
        // Generate with realistic prefix
        const prefix =
            realisticPrefixes[
                Math.floor(Math.random() * realisticPrefixes.length)
            ];
        const groups = prefix.split(":");

        // Fill remaining groups with realistic values that include more zeros
        while (groups.length < 8) {
            let group;

            // High chance of zeros in various positions (very common in IPv6)
            if (Math.random() < 0.4) {
                group = "0000";
            }
            // Interface ID often ends with ::1 for gateways
            else if (groups.length === 7 && Math.random() < 0.3) {
                group = "1";
            }
            // EUI-64 patterns (common in SLAAC)
            else if (groups.length === 4 && Math.random() < 0.2) {
                // Common EUI-64 middle parts
                group = Math.random() < 0.5 ? "fffe" : "ff";
            }
            // More zeros in the middle (subnet part)
            else if (
                groups.length >= 4 &&
                groups.length <= 6 &&
                Math.random() < 0.5
            ) {
                group = "0000";
            }
            // Generate realistic hex values
            else {
                if (Math.random() < 0.3) {
                    // Very small values (0-255, 0x00ff)
                    group = Math.floor(Math.random() * 0x100).toString(16);
                } else if (Math.random() < 0.6) {
                    // Lower values (0-4095, 0x0fff)
                    group = Math.floor(Math.random() * 0x1000).toString(16);
                } else {
                    // Full range but weighted towards lower values
                    group = Math.floor(Math.random() * 0x10000).toString(16);
                }
                group = group.padStart(4, "0");
            }
            groups.push(group);
        }

        return groups.join(":");
    }

    // Enhanced fallback: generate with more zeros and realistic patterns
    const groups = [];
    for (let i = 0; i < 8; i++) {
        let group;

        // First group: often starts with 2 for Global Unicast
        if (i === 0 && Math.random() < 0.6) {
            group =
                "2" +
                Math.floor(Math.random() * 0x1000)
                    .toString(16)
                    .padStart(3, "0");
        }
        // VERY high probability of zeros (extremely realistic for IPv6)
        else if (Math.random() < 0.55) {
            group = "0000";
        }
        // Network part (groups 0-3) - often has some structure
        else if (i < 4) {
            if (Math.random() < 0.4) {
                // Small network identifiers
                group = Math.floor(Math.random() * 0x100).toString(16);
            } else {
                group = Math.floor(Math.random() * 0x1000).toString(16);
            }
            group = group.padStart(4, "0");
        }
        // Subnet part (groups 4-5) - often zeros
        else if (i < 6 && Math.random() < 0.6) {
            group = "0000";
        }
        // Interface ID part (groups 6-7) - can be various patterns
        else {
            // Common interface ID patterns
            if (i === 7 && Math.random() < 0.2) {
                // Often ends with 1 for gateways
                group = "0001";
            } else if (i === 6 && Math.random() < 0.15) {
                // EUI-64 pattern
                group = "fffe";
            } else {
                if (Math.random() < 0.4) {
                    // Lower values for more realistic addresses
                    group = Math.floor(Math.random() * 0x1000).toString(16);
                } else {
                    group = Math.floor(Math.random() * 0x10000).toString(16);
                }
                group = group.padStart(4, "0");
            }
        }
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

// Generate appropriate prefix for IPv6 address based on its type and common usage
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
            // Link-local addresses can be /10 (for the range) or /64 (for subnet)
            const linkLocalOptions = ["/10", "/64"];
            const linkLocalWeights = [0.3, 0.7]; // Sometimes show the /10 range
            return weightedRandomChoice(linkLocalOptions, linkLocalWeights);

        case "Unique Local":
            // ULA can be /7 (for the range), /48 for sites, /64 for subnets
            const ulaOptions = ["/7", "/48", "/56", "/64"];
            const ulaWeights = [0.2, 0.3, 0.2, 0.3];
            return weightedRandomChoice(ulaOptions, ulaWeights);

        case "Multicast":
            // Multicast addresses can be /8 (for the range) or /128 (specific group)
            const multicastOptions = ["/8", "/128"];
            const multicastWeights = [0.4, 0.6];
            return weightedRandomChoice(multicastOptions, multicastWeights);

        case "Global Unicast":
            // Documentation addresses (2001:db8::/32)
            if (address.startsWith("2001:db8:")) {
                const docOptions = ["/32", "/48", "/56", "/64"];
                const docWeights = [0.05, 0.25, 0.3, 0.4];
                return weightedRandomChoice(docOptions, docWeights);
            }

            // Common ISP and enterprise allocations
            const globalOptions = [
                "/3", // Sometimes show the Global Unicast range
                "/32",
                "/36",
                "/40",
                "/44",
                "/48",
                "/52",
                "/56",
                "/60",
                "/64",
                "/128",
            ];
            const globalWeights = [
                0.1, 0.03, 0.02, 0.03, 0.05, 0.2, 0.05, 0.2, 0.05, 0.25, 0.02,
            ];
            return weightedRandomChoice(globalOptions, globalWeights);

        case "Loopback":
        case "Unspecified":
            return "/128";

        default:
            // Default to /64 (most common subnet size)
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

// Enhanced generation function that returns both IPv6 address and appropriate prefix
export const generateIPv6WithPrefix = () => {
    // Decide what type of address to generate with proper probabilities
    const addressTypeRandom = Math.random();

    let targetType, targetPrefix, ipv6;

    if (addressTypeRandom < 0.05) {
        // 5% - Generate Link-Local address with /10 prefix
        targetType = "Link-Local";
        targetPrefix = "/10";
        ipv6 = generateLinkLocalAddress();
    } else if (addressTypeRandom < 0.08) {
        // 3% - Generate Multicast address with /8 prefix
        targetType = "Multicast";
        targetPrefix = "/8";
        ipv6 = generateMulticastAddress();
    } else if (addressTypeRandom < 0.12) {
        // 4% - Generate ULA address with /7 prefix
        targetType = "Unique Local";
        targetPrefix = "/7";
        ipv6 = generateULAAddress();
    } else if (addressTypeRandom < 0.15) {
        // 3% - Generate Global Unicast with /3 prefix (to show the range)
        targetType = "Global Unicast";
        targetPrefix = "/3";
        ipv6 = generateGlobalUnicastAddress();
    } else {
        // 85% - Generate normal addresses with realistic prefixes
        ipv6 = getRandomIPv6();
        targetPrefix = generateIPv6Prefix(ipv6);
        targetType = getIPv6AddressType(ipv6);
    }

    return {
        ipv6: ipv6,
        prefix: targetPrefix,
        abbreviated: abbreviateIPv6(ipv6),
        networkData: calculateIPv6NetworkData(ipv6, targetPrefix),
        addressInfo: getIPv6AddressInfo(ipv6),
    };
};

// Generate specific Link-Local address (fe80::/10)
const generateLinkLocalAddress = () => {
    // Link-local addresses start with fe80::/10
    // fe80: to febf: (1111 1110 10xx xxxx)
    const firstGroup = "fe80"; // Most common
    const groups = [firstGroup];

    // Add remaining 7 groups
    for (let i = 1; i < 8; i++) {
        if (i < 4 && Math.random() < 0.7) {
            // Usually zeros in positions 1-3
            groups.push("0000");
        } else if (i === 7 && Math.random() < 0.3) {
            // Often ends with 1
            groups.push("0001");
        } else {
            // Generate realistic interface ID
            let group = Math.floor(Math.random() * 0x10000).toString(16);
            group = group.padStart(4, "0");
            groups.push(group);
        }
    }

    return groups.join(":");
};

// Generate specific Multicast address (ff00::/8)
const generateMulticastAddress = () => {
    // Multicast addresses start with ff
    const commonMulticast = [
        "ff02::1", // All nodes
        "ff02::2", // All routers
        "ff02::5", // OSPF routers
        "ff02::6", // OSPF designated routers
        "ff02::9", // RIP routers
        "ff02::a", // EIGRP routers
        "ff02::d", // PIM routers
        "ff05::2", // Site-local all routers
    ];

    if (Math.random() < 0.6) {
        // 60% chance of well-known multicast
        return commonMulticast[
            Math.floor(Math.random() * commonMulticast.length)
        ];
    } else {
        // 40% chance of custom multicast
        const flags = Math.floor(Math.random() * 16).toString(16); // 0-f
        const scope = Math.floor(Math.random() * 16).toString(16); // 0-f
        const firstGroup = `ff${flags}${scope}`;

        const groups = [firstGroup];
        for (let i = 1; i < 8; i++) {
            if (Math.random() < 0.5) {
                groups.push("0000");
            } else {
                let group = Math.floor(Math.random() * 0x1000).toString(16);
                group = group.padStart(4, "0");
                groups.push(group);
            }
        }

        return groups.join(":");
    }
};

// Generate specific ULA address (fc00::/7)
const generateULAAddress = () => {
    // ULA addresses start with fc or fd
    const prefix = Math.random() < 0.5 ? "fc" : "fd";
    const firstGroup =
        prefix +
        Math.floor(Math.random() * 0x100)
            .toString(16)
            .padStart(2, "0");

    const groups = [firstGroup];

    // Generate global ID (next 40 bits = next 2.5 groups)
    for (let i = 1; i < 8; i++) {
        if (i < 4 && Math.random() < 0.4) {
            // Some structure in global ID
            let group = Math.floor(Math.random() * 0x1000).toString(16);
            group = group.padStart(4, "0");
            groups.push(group);
        } else if (i >= 4 && i < 6 && Math.random() < 0.6) {
            // Subnet ID often zero
            groups.push("0000");
        } else if (i === 7 && Math.random() < 0.3) {
            // Interface ID often 1
            groups.push("0001");
        } else {
            let group = Math.floor(Math.random() * 0x10000).toString(16);
            group = group.padStart(4, "0");
            groups.push(group);
        }
    }

    return groups.join(":");
};

// Generate specific Global Unicast address (2000::/3)
const generateGlobalUnicastAddress = () => {
    // Global Unicast addresses start with 2 or 3 (001x xxxx)
    const firstBit = Math.random() < 0.9 ? "2" : "3"; // 2xxx much more common
    const firstGroup =
        firstBit +
        Math.floor(Math.random() * 0x1000)
            .toString(16)
            .padStart(3, "0");

    const groups = [firstGroup];

    // Generate rest with realistic patterns
    for (let i = 1; i < 8; i++) {
        if (Math.random() < 0.4) {
            // High chance of zeros
            groups.push("0000");
        } else if (i === 7 && Math.random() < 0.2) {
            // Sometimes end with 1
            groups.push("0001");
        } else {
            if (Math.random() < 0.6) {
                // Lower values more common
                let group = Math.floor(Math.random() * 0x1000).toString(16);
                group = group.padStart(4, "0");
                groups.push(group);
            } else {
                let group = Math.floor(Math.random() * 0x10000).toString(16);
                group = group.padStart(4, "0");
                groups.push(group);
            }
        }
    }

    return groups.join(":");
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

// Educational IPv6 prefix information
export const getIPv6PrefixInfo = (prefix) => {
    const prefixNum = parseInt(prefix.replace("/", ""));

    switch (prefixNum) {
        case 128:
            return {
                description: "Single host address (like /32 in IPv4)",
                usage: "Loopback, specific host routes",
                example: "::1/128 (loopback address)",
            };
        case 64:
            return {
                description: "Standard subnet size - most common",
                usage: "LAN segments, SLAAC required, end networks",
                example: "2001:db8:1234:5678::/64",
            };
        case 56:
            return {
                description: "Small business/residential allocation",
                usage: "Allows 256 /64 subnets, home networks",
                example: "2001:db8:1234:ab00::/56",
            };
        case 48:
            return {
                description: "Site allocation for organizations",
                usage: "Allows 65,536 /64 subnets, typical business",
                example: "2001:db8:1234::/48",
            };
        case 32:
            return {
                description: "ISP/Large organization allocation",
                usage: "Regional allocations, service providers",
                example: "2001:db8::/32",
            };
        case 10:
            return {
                description: "Link-local address range",
                usage: "Auto-configured addresses, not routed",
                example: "fe80::/10",
            };
        case 8:
            return {
                description: "Multicast address range",
                usage: "One-to-many communication",
                example: "ff00::/8",
            };
        case 7:
            return {
                description: "Unique Local Address range",
                usage: "Private addressing (like RFC 1918)",
                example: "fc00::/7",
            };
        case 3:
            return {
                description: "Global Unicast address range",
                usage: "Globally routable addresses",
                example: "2000::/3",
            };
        default:
            if (prefixNum < 32) {
                return {
                    description: "Very large network allocation",
                    usage: "RIR or very large ISP allocation",
                    example: `Large network block`,
                };
            } else if (prefixNum < 48) {
                return {
                    description: "Large organization allocation",
                    usage: "Enterprise or ISP customer allocation",
                    example: `Medium-large network`,
                };
            } else if (prefixNum < 64) {
                return {
                    description: "Medium organization allocation",
                    usage: "Multiple subnets possible",
                    example: `Multiple /64 subnets available`,
                };
            } else {
                return {
                    description: "Small subnet or host range",
                    usage: "Very specific addressing",
                    example: `Small address range`,
                };
            }
    }
};
