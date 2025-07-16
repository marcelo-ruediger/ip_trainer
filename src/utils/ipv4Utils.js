import { resetInputBorders } from "./commonUtils";

export const getRandomIp = () => {
    const useImportantAddress = Math.random() < 0.35; // 35% chance for must-know addresses

    if (useImportantAddress) {
        // Weight addresses by importance
        const criticalAddresses = MUST_KNOW_IPV4_ADDRESSES.filter(
            (addr) => addr.importance === "Critical"
        );
        const importantAddresses = MUST_KNOW_IPV4_ADDRESSES.filter(
            (addr) => addr.importance === "Important"
        );
        const moderateAddresses = MUST_KNOW_IPV4_ADDRESSES.filter(
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

    // Generate realistic IPv4 addresses (65% of the time)
    const usePrivateAddress = Math.random() < 0.7; // 70% chance for private addresses

    if (usePrivateAddress) {
        const privateRanges = [
            { min: [192, 168, 0, 1], max: [192, 168, 255, 254] }, // 192.168.x.x
            { min: [10, 0, 0, 1], max: [10, 255, 255, 254] }, // 10.x.x.x
            { min: [172, 16, 0, 1], max: [172, 31, 255, 254] }, // 172.16-31.x.x
        ];

        const range =
            privateRanges[Math.floor(Math.random() * privateRanges.length)];

        return [
            Math.floor(Math.random() * (range.max[0] - range.min[0] + 1)) +
                range.min[0],
            Math.floor(Math.random() * (range.max[1] - range.min[1] + 1)) +
                range.min[1],
            Math.floor(Math.random() * (range.max[2] - range.min[2] + 1)) +
                range.min[2],
            Math.floor(Math.random() * (range.max[3] - range.min[3] + 1)) +
                range.min[3],
        ].join(".");
    }

    // Generate public addresses (30% of the time)
    let octets;
    do {
        octets = Array(4)
            .fill(0)
            .map(() => Math.floor(Math.random() * 256));
        // Avoid private ranges, multicast (224-239), reserved (240-255), and 0.x.x.x
    } while (
        octets[0] === 10 ||
        (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
        (octets[0] === 192 && octets[1] === 168) ||
        (octets[0] === 169 && octets[1] === 254) ||
        octets[0] >= 224 ||
        octets[0] === 0 ||
        octets[0] === 127
    );

    return octets.join(".");
};

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

// Get information about important IPv4 addresses
export const getIPv4AddressInfo = (ipAddress) => {
    const foundAddress = MUST_KNOW_IPV4_ADDRESSES.find(
        (addr) => addr.address === ipAddress
    );

    if (foundAddress) {
        return {
            isImportant: true,
            importance: foundAddress.importance,
            description: foundAddress.commonUse,
            educational: true,
        };
    }

    // Check if it's in a known range
    const ip = ipAddress.split(".").map(Number);

    if (ip[0] === 10) {
        return {
            isImportant: false,
            description: "Private address (RFC 1918)",
        };
    } else if (ip[0] === 172 && ip[1] >= 16 && ip[1] <= 31) {
        return {
            isImportant: false,
            description: "Private address (RFC 1918)",
        };
    } else if (ip[0] === 192 && ip[1] === 168) {
        return {
            isImportant: false,
            description: "Private address (RFC 1918)",
        };
    } else if (ip[0] === 169 && ip[1] === 254) {
        return { isImportant: false, description: "Link-local/APIPA address" };
    } else if (ip[0] >= 224 && ip[0] <= 239) {
        return { isImportant: false, description: "Multicast address" };
    } else if (ip[0] >= 240) {
        return {
            isImportant: false,
            description: "Reserved address (Class E)",
        };
    }

    return { isImportant: false, description: "Public address" };
};

// Most important IPv4 addresses that every network professional must know
const MUST_KNOW_IPV4_ADDRESSES = [
    // === LOOPBACK & SPECIAL ===
    {
        address: "127.0.0.1",
        commonUse: "IPv4 localhost/loopback",
        importance: "Critical",
    },
    {
        address: "0.0.0.0",
        commonUse: "Default route/all networks",
        importance: "Critical",
    },
    {
        address: "255.255.255.255",
        commonUse: "Limited broadcast",
        importance: "Critical",
    },

    // === PRIVATE ADDRESSES (RFC 1918) ===
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
        address: "10.0.0.1",
        commonUse: "Enterprise gateway",
        importance: "Critical",
    },
    {
        address: "172.16.0.1",
        commonUse: "Private network gateway",
        importance: "Important",
    },
    {
        address: "192.168.1.254",
        commonUse: "Common gateway address",
        importance: "Important",
    },
    {
        address: "10.1.1.1",
        commonUse: "Enterprise network",
        importance: "Important",
    },
    {
        address: "172.31.255.254",
        commonUse: "AWS VPC default",
        importance: "Important",
    },

    // === PUBLIC DNS SERVERS ===
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
    { address: "9.9.9.9", commonUse: "Quad9 DNS", importance: "Important" },

    // === LINK-LOCAL (APIPA) ===
    {
        address: "169.254.1.1",
        commonUse: "APIPA/Link-local address",
        importance: "Important",
    },
    {
        address: "169.254.255.254",
        commonUse: "APIPA broadcast",
        importance: "Moderate",
    },

    // === DOCUMENTATION/TEST (RFC 5737) ===
    {
        address: "192.0.2.1",
        commonUse: "TEST-NET-1 documentation",
        importance: "Important",
    },
    {
        address: "198.51.100.1",
        commonUse: "TEST-NET-2 documentation",
        importance: "Important",
    },
    {
        address: "203.0.113.1",
        commonUse: "TEST-NET-3 documentation",
        importance: "Important",
    },

    // === MULTICAST ===
    {
        address: "224.0.0.1",
        commonUse: "All Systems multicast",
        importance: "Important",
    },
    {
        address: "224.0.0.2",
        commonUse: "All Routers multicast",
        importance: "Important",
    },
    {
        address: "224.0.0.5",
        commonUse: "OSPF routers",
        importance: "Important",
    },
    {
        address: "224.0.0.6",
        commonUse: "OSPF designated routers",
        importance: "Important",
    },
    { address: "224.0.0.9", commonUse: "RIP routers", importance: "Important" },
    {
        address: "224.0.0.10",
        commonUse: "EIGRP routers",
        importance: "Important",
    },

    // === CARRIER GRADE NAT (RFC 6598) ===
    {
        address: "100.64.0.1",
        commonUse: "Carrier Grade NAT",
        importance: "Moderate",
    },
    {
        address: "100.127.255.254",
        commonUse: "CGN range end",
        importance: "Moderate",
    },

    // === ROOT SERVERS & INFRASTRUCTURE ===
    {
        address: "198.41.0.4",
        commonUse: "A-Root DNS server",
        importance: "Important",
    },
    {
        address: "199.9.14.201",
        commonUse: "B-Root DNS server",
        importance: "Important",
    },
    {
        address: "192.33.4.12",
        commonUse: "C-Root DNS server",
        importance: "Important",
    },

    // === COMMON CORPORATE/ISP ===
    {
        address: "4.2.2.2",
        commonUse: "Level3/CenturyLink DNS",
        importance: "Moderate",
    },
    { address: "64.6.64.6", commonUse: "Verisign DNS", importance: "Moderate" },
    {
        address: "208.67.222.123",
        commonUse: "OpenDNS FamilyShield",
        importance: "Moderate",
    },

    // === BENCHMARKING & RESERVED ===
    {
        address: "192.18.0.1",
        commonUse: "Benchmarking (RFC 2544)",
        importance: "Moderate",
    },
    {
        address: "240.0.0.1",
        commonUse: "Reserved Class E",
        importance: "Moderate",
    },
];
