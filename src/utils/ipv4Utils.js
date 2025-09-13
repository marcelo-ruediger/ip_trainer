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
    // Weighted heavily toward real-world usage patterns
    const usePrivateAddress = Math.random() < 0.85; // 85% private (reflects real usage)

    if (usePrivateAddress) {
        // Weighted private ranges based on real-world usage
        const privateRanges = [
            // 192.168.x.x - Most common (home networks, small business)
            { min: [192, 168, 1, 1], max: [192, 168, 254, 254], weight: 60 },
            // 10.x.x.x - Enterprise networks
            { min: [10, 0, 0, 1], max: [10, 255, 255, 254], weight: 25 },
            // 172.16-31.x.x - Less common but still important
            { min: [172, 16, 0, 1], max: [172, 31, 255, 254], weight: 15 },
        ];

        // Create weighted array
        const weightedRanges = [];
        privateRanges.forEach((range) => {
            for (let i = 0; i < range.weight; i++) {
                weightedRanges.push(range);
            }
        });

        const range =
            weightedRanges[Math.floor(Math.random() * weightedRanges.length)];

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

    // Generate public addresses (15% of the time - reflects real learning scenarios)
    // Focus on educational/common public ranges
    const publicRanges = [
        // Class A public - common examples
        { range: [1, 126], class: "A", weight: 20 },
        // Class B public - common examples
        { range: [128, 191], class: "B", weight: 30 },
        // Class C public - most common in examples
        { range: [193, 223], class: "C", weight: 50 },
    ];

    // Create weighted public array
    const weightedPublicRanges = [];
    publicRanges.forEach((range) => {
        for (let i = 0; i < range.weight; i++) {
            weightedPublicRanges.push(range);
        }
    });

    const selectedRange =
        weightedPublicRanges[
            Math.floor(Math.random() * weightedPublicRanges.length)
        ];

    let octets;
    do {
        const firstOctet =
            Math.floor(
                Math.random() *
                    (selectedRange.range[1] - selectedRange.range[0] + 1)
            ) + selectedRange.range[0];
        octets = [
            firstOctet,
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

// Special addresses suitable for network calculations (educational focus)
// Weighted by real-world importance and usage frequency
const calculationSuitableSpecialAddresses = [
    // === PRIVATE NETWORKS (Highest Weight for Practice) ===
    // Most common in real world - higher probability for subnet calculations
    { address: "192.168.0.0", weight: 25, type: "standard" }, // Most common home network
    { address: "192.168.1.0", weight: 25, type: "standard" }, // Most common home network
    { address: "10.0.0.0", weight: 20, type: "standard" }, // Enterprise standard
    { address: "172.16.0.0", weight: 15, type: "standard" }, // Business networks
    { address: "192.168.100.0", weight: 12, type: "standard" }, // Common subnet variant
    { address: "10.10.0.0", weight: 8, type: "standard" }, // Common enterprise variant
    { address: "172.20.0.0", weight: 5, type: "standard" }, // Mid-range private

    // === PUBLIC ADDRESS EXAMPLES (High Weight for Practice) ===
    // Class A public examples
    { address: "1.1.1.1", weight: 12, type: "standard" }, // Cloudflare DNS - very educational
    { address: "8.8.8.8", weight: 12, type: "standard" }, // Google DNS - very educational
    { address: "126.255.255.254", weight: 6, type: "standard" }, // Edge of Class A

    // Class B public examples
    { address: "128.0.0.1", weight: 8, type: "standard" }, // Class B start
    { address: "151.101.1.1", weight: 6, type: "standard" }, // Reddit CDN example
    { address: "191.255.255.254", weight: 6, type: "standard" }, // Class B end

    // Class C public examples
    { address: "193.0.0.1", weight: 8, type: "standard" }, // Class C start
    { address: "208.67.222.222", weight: 6, type: "standard" }, // OpenDNS
    { address: "223.255.255.254", weight: 6, type: "standard" }, // Class C end

    // === SPECIAL PURPOSE NETWORKS (Medium Weight) ===
    // APIPA - important for troubleshooting but still allows subnet calculations
    { address: "169.254.1.1", weight: 8, type: "standard" }, // Can be subnetted
    { address: "169.254.100.100", weight: 6, type: "standard" }, // Can be subnetted

    // Carrier-Grade NAT - modern ISP usage, can be subnetted
    { address: "100.64.0.1", weight: 7, type: "standard" }, // Can be subnetted
    { address: "100.100.100.1", weight: 5, type: "standard" }, // Can be subnetted

    // Documentation networks - educational importance, can be subnetted
    { address: "192.0.2.1", weight: 8, type: "standard" }, // Testnetz-1
    { address: "198.51.100.1", weight: 6, type: "standard" }, // Testnetz-2
    { address: "203.0.113.1", weight: 6, type: "standard" }, // Testnetz-3

    // === SPECIAL ADDRESSES (Lower Weight - Educational but Limited) ===
    // Loopback examples - educational but limited subnet calculation value
    { address: "127.0.0.1", weight: 6, type: "special" }, // Most common
    { address: "127.1.1.1", weight: 3, type: "special" }, // Variant
    { address: "127.255.255.254", weight: 2, type: "special" }, // Edge case

    // Class D (Multicast) examples - educational but no normal subnetting
    { address: "224.0.0.1", weight: 4, type: "special" }, // All Systems multicast
    { address: "224.0.0.2", weight: 2, type: "special" }, // All Routers multicast
    { address: "239.255.255.250", weight: 2, type: "special" }, // UPnP multicast

    // Class E (Reserved) examples - rare but educational
    { address: "240.0.0.1", weight: 2, type: "special" },
    { address: "250.250.250.250", weight: 1, type: "special" },

    // === CRITICAL INDIVIDUAL ADDRESSES (Lower Weight - Very Special) ===
    // Broadcast address - important but very limited calculation value
    { address: "255.255.255.255", weight: 4, type: "special" },

    // Unspecified/Default route - important but very limited calculation value
    { address: "0.0.0.0", weight: 4, type: "special" },
];

// Create weighted array for realistic probability distribution
const createWeightedAddressArray = () => {
    const weightedArray = [];
    calculationSuitableSpecialAddresses.forEach((item) => {
        for (let i = 0; i < item.weight; i++) {
            weightedArray.push(item.address);
        }
    });
    return weightedArray;
};

const weightedSpecialAddresses = createWeightedAddressArray();

// New function for special addresses suitable for subnet calculations
export const getRandomSpecialIp = () => {
    const randomIndex = Math.floor(
        Math.random() * weightedSpecialAddresses.length
    );
    return weightedSpecialAddresses[randomIndex];
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

    // === SPECIAL ADDRESS HANDLING (Before Normal Calculations) ===
    // Only addresses that should return "kein" (❌) for ALL network fields according to table

    // Limited Broadcast address (255.255.255.255) - Special case
    if (ipStr === "255.255.255.255") {
        return {
            networkId: "kein", // No network for limited broadcast
            broadcast: "kein", // No broadcast concept - this IS the broadcast
            ipClass: "Broadcast",
            usableIps: "kein", // No usable IPs - this IS the broadcast
            isPointToPoint: false,
            isSpecial: true,
        };
    }

    // Unspecified address (0.0.0.0) - Special case
    if (ipStr === "0.0.0.0") {
        return {
            networkId: "kein", // No network concept
            broadcast: "kein", // No broadcast concept
            ipClass: "Unspezifiziert",
            usableIps: "kein", // Not usable as host address
            isPointToPoint: false,
            isSpecial: true,
        };
    }

    // Class D (Multicast) - Special handling - NO network/broadcast concept
    if (ip[0] >= 224 && ip[0] <= 239) {
        return {
            networkId: "kein", // Multicast doesn't use network/host concept
            broadcast: "kein", // Multicast uses group addressing, not broadcast
            ipClass: "D",
            usableIps: "kein", // Multicast addressing model
            isPointToPoint: false,
            isSpecial: true,
        };
    }

    // Class E (Reserved/Experimental) - Special handling - NO network/broadcast concept
    if (ip[0] >= 240 && ip[0] <= 254) {
        return {
            networkId: "kein", // Reserved space, no standard subnetting
            broadcast: "kein", // Not used for standard networking
            ipClass: "E",
            usableIps: "kein", // Reserved, not for host addressing
            isPointToPoint: false,
            isSpecial: true,
        };
    }

    // Loopback addresses (127.x.x.x) - Special handling - NO network/broadcast concept
    if (ip[0] === 127) {
        return {
            networkId: "kein", // Loopback doesn't use network/host concept
            broadcast: "kein", // No broadcast for loopback
            ipClass: "Loopback",
            usableIps: "kein", // All loopback addresses refer to localhost
            isPointToPoint: false,
            isSpecial: true,
        };
    }

    // === NORMAL SUBNET CALCULATIONS (For all other addresses) ===

    // Get subnet mask - this could also return null for invalid CIDR
    const maskStr = cidrToMask(cidrNum);
    if (!maskStr) {
        return null; // Invalid CIDR conversion
    }

    const mask = maskStr.split(".").map(Number);
    const network = ip.map((octet, i) => octet & mask[i]);

    // Special handling for /31 and /32 networks (according to table)
    let broadcast, usable, networkId;

    if (cidrNum === 31) {
        // RFC 3021: /31 networks for point-to-point links
        // Table says: Network=❌, Broadcast=❌, Hosts=ja (both IPs as hosts)
        networkId = "kein"; // No network address concept in /31
        broadcast = "kein"; // No broadcast in /31 networks (Point-to-Point)
        usable = 2; // Both addresses are usable in /31 (point-to-point)
    } else if (cidrNum === 32) {
        // /32 is a host route - single host address
        // Table says: Network=❌, Broadcast=❌, Hosts=ja (only one host)
        networkId = "kein"; // Host route - no network address
        broadcast = "kein"; // Host route - no broadcast
        usable = 1; // Single host address - the /32 represents exactly 1 host
    } else {
        // Normal subnet calculations for all other CIDR values
        // This applies to ALL normal addresses: Class A/B/C (public/private),
        // Carrier-Grade NAT, Documentation, APIPA - they ALL get normal calculations
        networkId = network.join(".");
        const broadcastArray = ip.map((octet, i) => octet | (~mask[i] & 255));
        broadcast = broadcastArray.join(".");
        usable = Math.pow(2, 32 - cidrNum);
        usable = usable - 2; // Subtract network and broadcast addresses
    }

    // === COMPREHENSIVE IP CLASS DETECTION ===
    let ipClass = "";

    // Special individual addresses first (highest priority)
    if (ipStr === "255.255.255.255") ipClass = "Broadcast";
    else if (ip[0] === 0) ipClass = "Unspezifiziert";
    else if (ip[0] === 127) ipClass = "Loopback";
    // Documentation networks (RFC 5737) - all map to "Dokumentation"
    else if (ip[0] === 192 && ip[1] === 0 && ip[2] === 2)
        ipClass = "Dokumentation";
    else if (ip[0] === 198 && ip[1] === 51 && ip[2] === 100)
        ipClass = "Dokumentation";
    else if (ip[0] === 203 && ip[1] === 0 && ip[2] === 113)
        ipClass = "Dokumentation";
    // APIPA (Automatic Private IP Addressing)
    else if (ip[0] === 169 && ip[1] === 254) ipClass = "APIPA";
    // Carrier-Grade NAT (RFC 6598)
    else if (ip[0] === 100 && ip[1] >= 64 && ip[1] <= 127)
        ipClass = "Carrier-Grade NAT";
    // Private address ranges - distinguish from public (RFC 1918)
    else if (ip[0] === 10) ipClass = "A (privat)";
    else if (ip[0] === 172 && ip[1] >= 16 && ip[1] <= 31)
        ipClass = "B (privat)";
    else if (ip[0] === 192 && ip[1] === 168) ipClass = "C (privat)";
    // Class D (Multicast) and E (Reserved) - before public classes
    else if (ip[0] >= 224 && ip[0] <= 239) ipClass = "D";
    else if (ip[0] >= 240 && ip[0] <= 254) ipClass = "E";
    // Public address classes (what remains after excluding special ranges)
    else if (ip[0] >= 1 && ip[0] <= 126) {
        // Class A public range: 1-126, but exclude already handled special cases
        ipClass = "A (öffentlich)";
    } else if (ip[0] >= 128 && ip[0] <= 191) {
        // Class B public range: 128-191, but exclude already handled 169.254.x.x
        if (!(ip[0] === 169 && ip[1] === 254)) {
            ipClass = "B (öffentlich)";
        }
    } else if (ip[0] >= 192 && ip[0] <= 223) {
        // Class C public range: 192-223, but exclude already handled ranges
        if (
            !(ip[0] === 192 && ip[1] === 168) && // Private 192.168.x.x
            !(ip[0] === 192 && ip[1] === 0 && ip[2] === 2) && // Documentation
            !(ip[0] === 198 && ip[1] === 51 && ip[2] === 100) && // Documentation
            !(ip[0] === 203 && ip[1] === 0 && ip[2] === 113)
        ) {
            // Documentation
            ipClass = "C (öffentlich)";
        }
    }

    return {
        networkId: networkId, // This will be either "kein" for /31 and /32, or the actual network address
        broadcast: broadcast, // This will be either "kein" or an IP address
        ipClass,
        usableIps: usable.toString(),
        isPointToPoint: cidrNum === 31 || cidrNum === 32, // Flag for /31 and /32 networks
        isSpecial: false, // Normal subnet calculation
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

// Function to detect special addresses that have fixed CIDR/Subnet Mask
export const getSpecialAddressFixedNetwork = (ipAddress) => {
    if (!ipAddress || typeof ipAddress !== "string") return null;

    const ip = ipAddress.split(".").map(Number);
    if (
        ip.length !== 4 ||
        ip.some((octet) => isNaN(octet) || octet < 0 || octet > 255)
    ) {
        return null;
    }

    // ONLY addresses that return "kein" (❌) for ALL network fields should have fixed values
    // According to table, these are the ONLY special addresses that don't do normal calculations:

    // Limited Broadcast address - always /32
    if (ipAddress === "255.255.255.255") {
        return {
            cidr: 32,
            subnetMask: "255.255.255.255",
            reason: "Limited Broadcast address /32",
        };
    }

    // Unspezifiziert (default route) - always /32 for the specific address
    if (ipAddress === "0.0.0.0") {
        return {
            cidr: 32,
            subnetMask: "255.255.255.255",
            reason: "Unspecified address /32",
        };
    }

    // Loopback network - these return "kein" so get fixed values
    if (ip[0] === 127) {
        // For the common 127.0.0.1, use /32, for others in range, use /8
        if (ipAddress === "127.0.0.1") {
            return {
                cidr: 32,
                subnetMask: "255.255.255.255",
                reason: "Localhost address /32",
            };
        } else {
            return {
                cidr: 8,
                subnetMask: "255.0.0.0",
                reason: "Loopback network /8",
            };
        }
    }

    // Class D (Multicast) - these return "kein" so get fixed values
    if (ip[0] >= 224 && ip[0] <= 239) {
        return {
            cidr: 4,
            subnetMask: "240.0.0.0",
            reason: "Multicast class D /4",
        };
    }

    // Class E (Reserved) - these return "kein" so get fixed values
    if (ip[0] >= 240 && ip[0] <= 254) {
        return {
            cidr: 4,
            subnetMask: "240.0.0.0",
            reason: "Reserved class E /4",
        };
    }

    // ALL OTHER ADDRESSES get normal network calculations with user-provided CIDR
    // This includes:
    // - Class A, B, C (both public and private)
    // - Carrier-Grade NAT (100.64.x.x) - table says "ja" for all fields
    // - Documentation (192.0.2.x, etc.) - table says "ja" for all fields
    // - APIPA (169.254.x.x) - table says "ja" for all fields

    return null; // Allow user input for CIDR/mask - normal calculations
};

// Utility function to check if user input represents "none/kein" for special address fields
export const isValidNoneValue = (value) => {
    if (!value || typeof value !== "string") return false;

    const validNoneAnswers = [
        "kein",
        "keine",
        "keiner",
        "nicht",
        "nichts",
        "none",
        "no",
        "nothing",
        "0", // Also accept "0" as valid "none" answer
    ];

    return validNoneAnswers.includes(value.toLowerCase().trim());
};
