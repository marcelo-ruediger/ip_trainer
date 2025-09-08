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

// Most important IPv4 addresses for IHK Fachinformatiker exam
const specialPurposeAddresses = [
    // LOOPBACK - Critical for exam
    {
        address: "127.0.0.0",
        commonUse: "Loopback Netzwerk",
        importance: "Critical",
        category: "Loopback",
        range: "127.0.0.1 - 127.255.255.255/8",
        specialRules: "Always refers to local machine, cannot be subnetted",
    },

    // APIPA - Important for DHCP troubleshooting
    {
        address: "169.254.0.0",
        commonUse: "APIPA Netzwerk",
        importance: "Important",
        category: "APIPA",
        range: "169.254.0.1 - 169.254.255.254/16 (+ Broadcast)",
        specialRules: "Auto-assigned when DHCP fails",
    },

    // CARRIER-GRADE NAT - Important for ISP networks
    {
        address: "100.64.0.0",
        commonUse: "Carrier-Grade NAT Netzwerk",
        importance: "Important",
        category: "Carrier-Grade NAT",
        range: "100.64.0.1 - 100.127.255.254/10 (+ Broadcast)",
        specialRules: "Used by ISPs for shared customer connections (RFC 6598)",
    },

    // BROADCAST - Critical concept
    {
        address: "255.255.255.255",
        commonUse: "Limitierter Broadcast",
        importance: "Critical",
        category: "Broadcast",
        range: "Einzeladresse",
        specialRules: "Broadcast to all hosts on local network",
    },

    // UNSPECIFIED/DEFAULT ROUTE - Critical for routing
    {
        address: "0.0.0.0",
        commonUse: "Default Route - nicht zugewiesene Adresse",
        importance: "Critical",
        category: "Unspezifiziert",
        range: "Einzeladresse",
        specialRules: "Unspecified address and default route (RFC 1122)",
    },

    // DOCUMENTATION ADDRESSES - Important for examples
    {
        address: "192.0.2.0",
        commonUse: "Testnetz-1",
        importance: "Important",
        category: "Other",
        range: "192.0.2.1 - 192.0.2.254/24 (+ Broadcast)",
        specialRules: "Reserved for documentation and examples (RFC 5737)",
    },

    {
        address: "198.51.100.0",
        commonUse: "Testnetz-2",
        importance: "Important",
        category: "Other",
        range: "198.51.100.1 - 198.51.100.254/24 (+ Broadcast)",
        specialRules: "Reserved for documentation and examples (RFC 5737)",
    },

    {
        address: "203.0.113.0",
        commonUse: "Testnetz-3",
        importance: "Important",
        category: "Other",
        range: "203.0.113.1 - 203.0.113.254/24 (+ Broadcast)",
        specialRules: "Reserved for documentation and examples (RFC 5737)",
    },

    // PRIVATE NETWORKS - Critical for exam (ordered A → B → C)
    {
        address: "10.0.0.0",
        commonUse: "Private Class A Network",
        importance: "Critical",
        category: "Private Networks",
        range: "10.0.0.1 - 10.255.255.254/8 (+ Broadcast)",
        specialRules: "Largest private address space - enterprise networks",
    },
    {
        address: "172.16.0.0",
        commonUse: "Private Class B Network",
        importance: "Critical",
        category: "Private Networks",
        range: "172.16.0.1 - 172.31.255.254/12 (+ Broadcast)",
        specialRules: "Medium-sized private networks - business environments",
    },
    {
        address: "192.168.0.0",
        commonUse: "Private Class C Network",
        importance: "Critical",
        category: "Private Networks",
        range: "192.168.0.1 - 192.168.255.254/16 (+ Broadcast)",
        specialRules: "Small private networks - home routers and small offices",
    },

    // PUBLIC NETWORKS - Critical for understanding public vs private (ordered A → B → C)
    {
        address: "1.0.0.0",
        commonUse: "Public Class A Network",
        importance: "Critical",
        category: "Public Networks",
        range: "1.0.0.1 - 126.255.255.254 (+ Broadcast)",
        specialRules: "Public Class A addresses - globally routable",
    },
    {
        address: "128.0.0.0",
        commonUse: "Public Class B Network",
        importance: "Critical",
        category: "Public Networks",
        range: "128.0.0.1 - 191.255.255.254 (+ Broadcast)",
        specialRules: "Public Class B addresses - globally routable",
    },
    {
        address: "192.0.0.0",
        commonUse: "Public Class C Network",
        importance: "Critical",
        category: "Public Networks",
        range: "192.0.0.1 - 223.255.255.254 (+ Broadcast)",
        specialRules: "Public Class C addresses - globally routable",
    },

    // CLASS D and E boundaries - Important for exam
    {
        address: "224.0.0.0",
        commonUse: "Klasse D Netzwerk (Multicast)",
        importance: "Important",
        category: "Classes D and E",
        range: "224.0.0.0 - 239.255.255.255/4 (Kein Broadcast, kein Hostanteil)",
        specialRules: "Start of Class D address space - multicast",
    },
    {
        address: "240.0.0.0",
        commonUse: "Klasse E Netzwerk (Reserviert)",
        importance: "Important",
        category: "Classes D and E",
        range: "240.0.0.0 - 255.255.255.254/4 (Kein Broadcast, kein Hostanteil)",
        specialRules: "Start of Class E - reserved for future use",
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
    // Exclude /0 as it's only used for default route (0.0.0.0/0)
    const commonCidrs = [8, 16, 24, 25, 26, 27, 28, 29, 30, 31, 32]; // Added 32
    const allCidrs = Math.floor(Math.random() * 32) + 1; // 1-32 instead of 1-31

    return Math.random() < 0.5
        ? commonCidrs[Math.floor(Math.random() * commonCidrs.length)]
        : allCidrs;
};

export const cidrToMask = (cidr) => {
    // Validate CIDR range - exclude /0 as it's only for default route
    if (cidr < 1 || cidr > 32) {
        return null; // Invalid CIDR
    }

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
        // Check for 0.0.0.0 subnet mask (invalid for practical subnetting)
        if (subnetMask === "0.0.0.0") {
            return null; // This is only valid for default route 0.0.0.0/0
        }

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

        const cidr = match[1].length;

        // Exclude /0 as it's only for default route
        if (cidr === 0) return null;

        return cidr;
    } catch {
        return null;
    }
};

export const calculateNetworkData = (ipStr, cidr) => {
    // More comprehensive validation
    if (!ipStr || cidr === null || cidr === undefined) {
        return null; // Missing required parameters
    }

    // Convert cidr to number and validate range - exclude /0 and invalid values
    const cidrNum =
        typeof cidr === "string"
            ? parseInt(cidr.toString().replace("/", ""))
            : cidr;
    if (isNaN(cidrNum) || cidrNum < 1 || cidrNum > 32) {
        return null; // Invalid CIDR for practical subnetting
    }

    // Validate IP format
    if (typeof ipStr !== "string" || !ipStr.includes(".")) {
        return null; // Invalid IP format
    }

    const ipParts = ipStr.split(".");
    if (ipParts.length !== 4) {
        return null; // Invalid IP format
    }

    const ip = ipParts.map(Number);
    if (ip.some((octet) => isNaN(octet) || octet < 0 || octet > 255)) {
        return null; // Invalid IP octets
    }

    // Get subnet mask - this could also return null for invalid CIDR
    const maskStr = cidrToMask(cidrNum);
    if (!maskStr) {
        return null; // Invalid CIDR conversion
    }

    const mask = maskStr.split(".").map(Number);

    const network = ip.map((octet, i) => octet & mask[i]);

    // Special handling for /31 and /32 networks
    let broadcast, usable;

    if (cidrNum === 31) {
        broadcast = "kein"; // No broadcast in /31 networks
        usable = 2; // Both addresses are usable in /31
    } else if (cidrNum === 32) {
        broadcast = "kein"; // Host route - no broadcast
        usable = 1; // Single host address - the /32 represents exactly 1 host
    } else {
        const broadcastArray = ip.map((octet, i) => octet | (~mask[i] & 255));
        broadcast = broadcastArray.join(".");
        usable = Math.pow(2, 32 - cidrNum);
        usable = usable - 2; // Subtract network and broadcast addresses
    }

    let ipClass = "";
    // Enhanced class detection with special addresses
    if (ip[0] === 0) ipClass = "Reserved";
    else if (ip[0] === 127) ipClass = "Loopback";
    else if (ip[0] === 169 && ip[1] === 254) ipClass = "Link-Local";
    else if (ip[0] === 100 && ip[1] >= 64 && ip[1] <= 127)
        ipClass = "Carrier-Grade NAT";
    else if (ip[0] >= 1 && ip[0] <= 126) ipClass = "A";
    else if (ip[0] >= 128 && ip[0] <= 191) ipClass = "B";
    else if (ip[0] >= 192 && ip[0] <= 223) ipClass = "C";
    else if (ip[0] >= 224 && ip[0] <= 239) ipClass = "D";
    else if (ip[0] >= 240) ipClass = "E";

    return {
        networkId: network.join("."),
        broadcast: broadcast, // This will be either "kein" or an IP address
        ipClass,
        usableIps: usable.toString(),
        isPointToPoint: cidrNum === 31 || cidrNum === 32, // Flag for /31 and /32 networks
    };
};

export const validateCIDRInput = (cidrInput) => {
    if (!cidrInput && cidrInput !== 0)
        return { isValid: false, error: "CIDR ist erforderlich" };

    // Handle string input like "/24" or "24"
    const cleanCidr = cidrInput.toString().replace("/", "");
    const cidrNum = parseInt(cleanCidr);

    if (isNaN(cidrNum)) {
        return { isValid: false, error: "CIDR muss eine Zahl sein" };
    }

    if (cidrNum < 1 || cidrNum > 32) {
        return {
            isValid: false,
            error: "CIDR muss zwischen 1 und 32 liegen (nicht 0)",
        };
    }

    return { isValid: true, cidr: cidrNum };
};

export const validateSubnetMaskInput = (maskInput) => {
    if (!maskInput)
        return { isValid: false, error: "Subnetzmaske ist erforderlich" };

    // Check for 0.0.0.0 specifically
    if (maskInput === "0.0.0.0") {
        return {
            isValid: false,
            error: "Subnetzmaske 0.0.0.0 ist nur für Default Route gültig",
        };
    }

    const cidr = maskToCidr(maskInput);
    if (cidr === null) {
        return { isValid: false, error: "Ungültige Subnetzmaske" };
    }

    return { isValid: true, cidr: cidr };
};
