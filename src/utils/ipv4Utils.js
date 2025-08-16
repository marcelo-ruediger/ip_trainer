import { resetInputBorders } from "./commonUtils";

export const getRandomIp = (includeSpecialAddresses = false) => {
    if (includeSpecialAddresses) {
        // Return special addresses that have different calculation rules
        return getRandomSpecialIp();
    }

    const useImportantAddress = Math.random() < 0.35; // 35% chance for must-know addresses

    if (useImportantAddress) {
        // Only use addresses suitable for standard subnet calculations
        const validAddresses = subnetCalculationAddresses.filter((addr) => {
            return true; // All addresses in this array are pre-validated
        });

        // Weight addresses by importance from the filtered list
        const criticalAddresses = validAddresses.filter(
            (addr) => addr.importance === "Critical"
        );
        const importantAddresses = validAddresses.filter(
            (addr) => addr.importance === "Important"
        );
        const moderateAddresses = validAddresses.filter(
            (addr) => addr.importance === "Moderate"
        );

        const random = Math.random();
        let selectedArray;

        if (random < 0.6 && criticalAddresses.length > 0) {
            selectedArray = criticalAddresses;
        } else if (random < 0.85 && importantAddresses.length > 0) {
            selectedArray = importantAddresses;
        } else if (moderateAddresses.length > 0) {
            selectedArray = moderateAddresses;
        } else {
            selectedArray = validAddresses;
        }

        if (selectedArray.length > 0) {
            const randomAddress =
                selectedArray[Math.floor(Math.random() * selectedArray.length)];
            return randomAddress.address;
        }
    }

    // Generate realistic IPv4 addresses (65% of the time)
    const usePrivateAddress = Math.random() < 0.7; // 70% chance for private addresses

    if (usePrivateAddress) {
        const privateRanges = [
            { min: [192, 168, 1, 1], max: [192, 168, 254, 254] },
            { min: [10, 0, 0, 1], max: [10, 255, 255, 254] },
            { min: [172, 16, 0, 1], max: [172, 31, 255, 254] },
        ];

        const range =
            privateRanges[Math.floor(Math.random() * privateRanges.length)];

        let ip;
        do {
            ip = [
                Math.floor(Math.random() * (range.max[0] - range.min[0] + 1)) +
                    range.min[0],
                Math.floor(Math.random() * (range.max[1] - range.min[1] + 1)) +
                    range.min[1],
                Math.floor(Math.random() * (range.max[2] - range.min[2] + 1)) +
                    range.min[2],
                Math.floor(Math.random() * (range.max[3] - range.min[3] + 1)) +
                    range.min[3],
            ];
        } while (
            ip[3] === 0 ||
            ip[3] === 255 ||
            (ip[0] === 192 && ip[1] === 168 && ip[2] === 0)
        );

        return ip.join(".");
    }

    // Generate public addresses (30% of the time)
    let octets;
    do {
        octets = [
            Math.floor(Math.random() * 223) + 1, // 1-223 (avoid Class D/E)
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 254) + 1, // 1-254 (avoid network/broadcast)
        ];
    } while (
        // Avoid private ranges
        octets[0] === 10 ||
        (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
        (octets[0] === 192 && octets[1] === 168) ||
        // Avoid special ranges that shouldn't be in standard training
        (octets[0] === 169 && octets[1] === 254) || // Link-local/APIPA
        (octets[0] === 100 && octets[1] >= 64 && octets[1] <= 127) || // CGN range 100.64.0.0/10 FIXED
        octets[0] === 127 || // Loopback
        // Avoid documentation ranges (these are in special addresses)
        (octets[0] === 192 && octets[1] === 0 && octets[2] === 2) ||
        (octets[0] === 198 && octets[1] === 51 && octets[2] === 100) ||
        (octets[0] === 203 && octets[1] === 0 && octets[2] === 113)
    );

    return octets.join(".");
};

// New function for special addresses that don't follow standard subnet rules
export const getRandomSpecialIp = () => {
    const randomAddress =
        specialPurposeAddresses[
            Math.floor(Math.random() * specialPurposeAddresses.length)
        ];
    return randomAddress.address;
};

// Get all special addresses (for the toggle feature you'll create)
export const getAllSpecialAddresses = () => {
    return specialPurposeAddresses;
};

// Addresses suitable for standard subnet calculation training
const subnetCalculationAddresses = [
    // === PRIVATE ADDRESSES (RFC 1918) - Perfect for subnet training ===
    {
        address: "192.168.1.1",
        commonUse: "Home router gateway",
        importance: "Critical",
    },
    {
        address: "192.168.0.1",
        commonUse: "Home router gateway",
        importance: "Critical",
    },
    {
        address: "192.168.1.10",
        commonUse: "Common host address",
        importance: "Critical",
    },
    {
        address: "192.168.100.1",
        commonUse: "Common subnet gateway",
        importance: "Critical",
    },
    {
        address: "10.0.0.1",
        commonUse: "Enterprise gateway",
        importance: "Critical",
    },
    {
        address: "10.1.1.1",
        commonUse: "Enterprise network",
        importance: "Important",
    },
    {
        address: "10.10.10.10",
        commonUse: "Common test address",
        importance: "Important",
    },
    {
        address: "172.16.0.1",
        commonUse: "Private network gateway",
        importance: "Important",
    },
    {
        address: "172.20.1.1",
        commonUse: "Private network host",
        importance: "Important",
    },
    {
        address: "172.31.255.1",
        commonUse: "AWS VPC range",
        importance: "Important",
    },

    // === PUBLIC DNS SERVERS - Good for Class A/B training ===
    {
        address: "8.8.8.8",
        commonUse: "Google DNS primary",
        importance: "Critical",
    },
    {
        address: "8.8.4.4",
        commonUse: "Google DNS secondary",
        importance: "Critical",
    },
    {
        address: "1.1.1.1",
        commonUse: "Cloudflare DNS primary",
        importance: "Critical",
    },
    {
        address: "1.0.0.1",
        commonUse: "Cloudflare DNS secondary",
        importance: "Critical",
    },
    {
        address: "208.67.222.222",
        commonUse: "OpenDNS primary",
        importance: "Important",
    },
    {
        address: "208.67.220.220",
        commonUse: "OpenDNS secondary",
        importance: "Important",
    },
    {
        address: "9.9.9.9",
        commonUse: "Quad9 DNS",
        importance: "Important",
    },
    {
        address: "4.2.2.2",
        commonUse: "Level3/CenturyLink DNS",
        importance: "Moderate",
    },
    {
        address: "64.6.64.6",
        commonUse: "Verisign DNS",
        importance: "Moderate",
    },

    // === Additional useful training addresses ===
    {
        address: "192.168.50.1",
        commonUse: "Common subnet gateway",
        importance: "Important",
    },
    {
        address: "192.168.2.100",
        commonUse: "Host in second subnet",
        importance: "Moderate",
    },
    {
        address: "10.0.1.50",
        commonUse: "Enterprise host",
        importance: "Moderate",
    },
    {
        address: "172.25.1.1",
        commonUse: "Mid-range private network",
        importance: "Moderate",
    },
];

// Special purpose addresses that don't follow standard subnet calculation rules
const specialPurposeAddresses = [
    // === LOOPBACK ===
    {
        address: "127.0.0.1",
        commonUse: "Localhost/Loopback",
        importance: "Critical",
        category: "Loopback",
        range: "127.0.0.0/8",
        specialRules: "Always refers to local machine, cannot be subnetted",
    },
    {
        address: "127.1.1.1",
        commonUse: "Loopback range example",
        importance: "Moderate",
        category: "Loopback",
        range: "127.0.0.0/8",
    },

    // === APIPA/LINK-LOCAL ===
    {
        address: "169.254.1.1",
        commonUse: "APIPA/Link-local address",
        importance: "Important",
        category: "APIPA",
        range: "169.254.0.0/16",
        specialRules: "Auto-assigned when DHCP fails",
    },
    {
        address: "169.254.100.1",
        commonUse: "APIPA address",
        importance: "Moderate",
        category: "APIPA",
        range: "169.254.0.0/16",
    },
    {
        address: "169.254.255.254",
        commonUse: "APIPA broadcast-like",
        importance: "Moderate",
        category: "APIPA",
        range: "169.254.0.0/16",
    },

    // === DOCUMENTATION/TEST (RFC 5737) ===
    {
        address: "192.0.2.1",
        commonUse: "TEST-NET-1 documentation",
        importance: "Important",
        category: "Documentation",
        range: "192.0.2.0/24",
        specialRules: "Reserved for documentation and examples",
    },
    {
        address: "198.51.100.1",
        commonUse: "TEST-NET-2 documentation",
        importance: "Important",
        category: "Documentation",
        range: "198.51.100.0/24",
    },
    {
        address: "203.0.113.1",
        commonUse: "TEST-NET-3 documentation",
        importance: "Important",
        category: "Documentation",
        range: "203.0.113.0/24",
    },

    // === CARRIER GRADE NAT (RFC 6598) ===
    {
        address: "100.64.0.1",
        commonUse: "Carrier Grade NAT",
        importance: "Moderate",
        category: "CGN",
        range: "100.64.0.0/10",
        specialRules: "Shared address space for ISP NAT",
    },
    {
        address: "100.100.100.1",
        commonUse: "CGN address",
        importance: "Moderate",
        category: "CGN",
        range: "100.64.0.0/10",
    },

    // === BROADCAST/SPECIAL ===
    {
        address: "255.255.255.255",
        commonUse: "Limited broadcast",
        importance: "Critical",
        category: "Broadcast",
        range: "Single address",
        specialRules: "Broadcast to all hosts on local network",
    },
    {
        address: "0.0.0.0",
        commonUse: "Default route/Unspecified",
        importance: "Critical",
        category: "Special",
        range: "Single address",
        specialRules: "Default route or unspecified address",
    },

    // === MULTICAST (Class D) ===
    {
        address: "224.0.0.1",
        commonUse: "All Hosts multicast",
        importance: "Important",
        category: "Multicast",
        range: "224.0.0.0/4",
        specialRules: "Multicast - no traditional subnetting",
    },
    {
        address: "224.0.0.2",
        commonUse: "All Routers multicast",
        importance: "Important",
        category: "Multicast",
        range: "224.0.0.0/4",
    },
    {
        address: "239.255.255.255",
        commonUse: "Administrative multicast",
        importance: "Moderate",
        category: "Multicast",
        range: "224.0.0.0/4",
    },

    // === RESERVED (Class E) ===
    {
        address: "240.0.0.1",
        commonUse: "Reserved for future use",
        importance: "Moderate",
        category: "Reserved",
        range: "240.0.0.0/4",
        specialRules: "Reserved for experimental use",
    },
    {
        address: "255.255.255.254",
        commonUse: "Reserved address",
        importance: "Moderate",
        category: "Reserved",
        range: "240.0.0.0/4",
    },
];

// Updated function to check if an address is special
export const getIPv4AddressInfo = (ipAddress) => {
    // Check subnet calculation addresses first
    const foundStandardAddress = subnetCalculationAddresses.find(
        (addr) => addr.address === ipAddress
    );

    if (foundStandardAddress) {
        return {
            isImportant: true,
            importance: foundStandardAddress.importance,
            description: foundStandardAddress.commonUse,
            educational: true,
            type: "standard",
        };
    }

    // Check special addresses
    const foundSpecialAddress = specialPurposeAddresses.find(
        (addr) => addr.address === ipAddress
    );

    if (foundSpecialAddress) {
        return {
            isImportant: true,
            importance: foundSpecialAddress.importance,
            description: foundSpecialAddress.commonUse,
            educational: true,
            type: "special",
            category: foundSpecialAddress.category,
            range: foundSpecialAddress.range,
            specialRules: foundSpecialAddress.specialRules,
        };
    }

    // Check if it's in a known range
    const ip = ipAddress.split(".").map(Number);

    if (ip[0] === 10) {
        return {
            isImportant: false,
            description: "Private address (RFC 1918)",
            type: "standard",
        };
    } else if (ip[0] === 172 && ip[1] >= 16 && ip[1] <= 31) {
        return {
            isImportant: false,
            description: "Private address (RFC 1918)",
            type: "standard",
        };
    } else if (ip[0] === 192 && ip[1] === 168) {
        return {
            isImportant: false,
            description: "Private address (RFC 1918)",
            type: "standard",
        };
    } else if (ip[0] === 127) {
        return {
            isImportant: false,
            description: "Loopback address",
            type: "special",
            category: "Loopback",
        };
    } else if (ip[0] === 169 && ip[1] === 254) {
        return {
            isImportant: false,
            description: "Link-local/APIPA address",
            type: "special",
            category: "APIPA",
        };
    } else if (ip[0] >= 224 && ip[0] <= 239) {
        return {
            isImportant: false,
            description: "Multicast address",
            type: "special",
            category: "Multicast",
        };
    } else if (ip[0] >= 240) {
        return {
            isImportant: false,
            description: "Reserved address (Class E)",
            type: "special",
            category: "Reserved",
        };
    }

    return {
        isImportant: false,
        description: "Public address",
        type: "standard",
    };
};

// Keep existing utility functions
export const getRandomCIDR = () => {
    const commonCidrs = [8, 16, 24, 25, 26, 27, 28, 29, 30];
    const allCidrs = Math.ceil(Math.random() * 31);
    return Math.random() < 0.5
        ? commonCidrs[Math.floor(Math.random() * commonCidrs.length)]
        : allCidrs;
};

export const cidrToMask = (cidr) => {
    const mask = [];
    for (let i = 0; i < 4; i++) {
        const bits = Math.min(8, cidr);
        mask.push(256 - Math.pow(2, 8 - bits));
        cidr -= bits;
    }
    return mask.join(".");
};

export const maskToCidr = (subnetMask) => {
    try {
        const octets = subnetMask.split(".").map(Number);
        if (
            octets.length !== 4 ||
            octets.some((octet) => octet < 0 || octet > 255)
        ) {
            return null;
        }

        let binaryStr = "";
        for (let octet of octets) {
            binaryStr += octet.toString(2).padStart(8, "0");
        }

        const match = binaryStr.match(/^(1*)(0*)$/);
        if (!match) return null;

        return match[1].length;
    } catch {
        return null;
    }
};

export const calculateNetworkData = (ipStr, cidr) => {
    const ip = ipStr.split(".").map(Number);
    const mask = cidrToMask(cidr).split(".").map(Number);

    const network = ip.map((octet, i) => octet & mask[i]);
    const broadcast = ip.map((octet, i) => octet | (~mask[i] & 255));

    let usable = Math.pow(2, 32 - cidr);
    usable = cidr >= 31 ? 0 : usable - 2;

    let ipClass = "";
    // Enhanced class detection with special addresses
    if (ip[0] === 0) ipClass = "Reserved";
    else if (ip[0] === 127) ipClass = "Loopback";
    else if (ip[0] === 169 && ip[1] === 254) ipClass = "Link-Local";
    else if (ip[0] >= 100 && ip[0] <= 127) ipClass = "Carrier-Grade NAT";
    else if (ip[0] >= 1 && ip[0] <= 126) ipClass = "A";
    else if (ip[0] >= 128 && ip[0] <= 191) ipClass = "B";
    else if (ip[0] >= 192 && ip[0] <= 223) ipClass = "C";
    else if (ip[0] >= 224 && ip[0] <= 239) ipClass = "D (Multicast)";
    else if (ip[0] >= 240) ipClass = "E (Reserved)";

    return {
        networkId: network.join("."),
        broadcast: broadcast.join("."),
        ipClass,
        usableIps: usable.toString(),
    };
};
