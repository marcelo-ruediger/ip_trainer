const createWeightedArray = (items) => {
    const weighted = [];
    items.forEach((item) => {
        for (let i = 0; i < item.weight; i++) {
            weighted.push(item);
        }
    });
    return weighted;
};

const getRandomWeightedItem = (weightedArray) => {
    return weightedArray[Math.floor(Math.random() * weightedArray.length)];
};

const generateRandomOctet = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomIp = (includeSpecialAddresses = false) => {
    if (includeSpecialAddresses) {
        return getRandomSpecialIp();
    }

    const useImportantAddress = Math.random() < 0.35;

    if (useImportantAddress) {
        const validAddresses = subnetCalculationAddresses;

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

    const usePrivateAddress = Math.random() < 0.85;

    if (usePrivateAddress) {
        const privateRanges = [
            { min: [192, 168, 1, 1], max: [192, 168, 254, 254], weight: 60 },
            { min: [10, 0, 0, 1], max: [10, 255, 255, 254], weight: 25 },
            { min: [172, 16, 0, 1], max: [172, 31, 255, 254], weight: 15 },
        ];

        const weightedRanges = createWeightedArray(privateRanges);
        const range = getRandomWeightedItem(weightedRanges);

        let ip;
        do {
            ip = [
                generateRandomOctet(range.min[0], range.max[0]),
                generateRandomOctet(range.min[1], range.max[1]),
                generateRandomOctet(range.min[2], range.max[2]),
                generateRandomOctet(range.min[3], range.max[3]),
            ];
        } while (
            ip[3] === 0 ||
            ip[3] === 255 ||
            (ip[0] === 192 && ip[1] === 168 && ip[2] === 0)
        );

        return ip.join(".");
    }

    const publicRanges = [
        { range: [1, 126], class: "A", weight: 20 },
        { range: [128, 191], class: "B", weight: 30 },
        { range: [193, 223], class: "C", weight: 50 },
    ];

    const weightedPublicRanges = createWeightedArray(publicRanges);
    const selectedRange = getRandomWeightedItem(weightedPublicRanges);

    let octets;
    do {
        const firstOctet = generateRandomOctet(
            selectedRange.range[0],
            selectedRange.range[1]
        );
        octets = [
            firstOctet,
            generateRandomOctet(0, 255),
            generateRandomOctet(0, 255),
            generateRandomOctet(1, 254),
        ];
    } while (
        octets[0] === 10 ||
        (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
        (octets[0] === 192 && octets[1] === 168) ||
        (octets[0] === 169 && octets[1] === 254) ||
        (octets[0] === 100 && octets[1] >= 64 && octets[1] <= 127) ||
        octets[0] === 127 ||
        (octets[0] === 192 && octets[1] === 0 && octets[2] === 2) ||
        (octets[0] === 198 && octets[1] === 51 && octets[2] === 100) ||
        (octets[0] === 203 && octets[1] === 0 && octets[2] === 113)
    );

    return octets.join(".");
};

const calculationSuitableSpecialAddresses = [
    { address: "192.168.0.0", weight: 25, type: "standard" },
    { address: "192.168.1.0", weight: 25, type: "standard" },
    { address: "10.0.0.0", weight: 20, type: "standard" },
    { address: "172.16.0.0", weight: 15, type: "standard" },
    { address: "192.168.100.0", weight: 12, type: "standard" },
    { address: "10.10.0.0", weight: 8, type: "standard" },
    { address: "172.20.0.0", weight: 5, type: "standard" },

    { address: "1.1.1.1", weight: 12, type: "standard" },
    { address: "8.8.8.8", weight: 12, type: "standard" },
    { address: "126.255.255.254", weight: 6, type: "standard" },

    { address: "128.0.0.1", weight: 8, type: "standard" },
    { address: "151.101.1.1", weight: 6, type: "standard" },
    { address: "191.255.255.254", weight: 6, type: "standard" },

    { address: "193.0.0.1", weight: 8, type: "standard" },
    { address: "208.67.222.222", weight: 6, type: "standard" },
    { address: "223.255.255.254", weight: 6, type: "standard" },

    { address: "169.254.1.1", weight: 8, type: "standard" },
    { address: "169.254.100.100", weight: 6, type: "standard" },

    { address: "100.64.0.1", weight: 7, type: "standard" },
    { address: "100.100.100.1", weight: 5, type: "standard" },

    { address: "192.0.2.1", weight: 8, type: "standard" },
    { address: "198.51.100.1", weight: 6, type: "standard" },
    { address: "203.0.113.1", weight: 6, type: "standard" },

    { address: "127.0.0.1", weight: 6, type: "special" },
    { address: "127.1.1.1", weight: 3, type: "special" },
    { address: "127.255.255.254", weight: 2, type: "special" },

    { address: "224.0.0.1", weight: 4, type: "special" },
    { address: "224.0.0.2", weight: 2, type: "special" },
    { address: "239.255.255.250", weight: 2, type: "special" },

    { address: "240.0.0.1", weight: 2, type: "special" },
    { address: "250.250.250.250", weight: 1, type: "special" },

    { address: "255.255.255.255", weight: 4, type: "special" },

    { address: "0.0.0.0", weight: 4, type: "special" },
];

const createWeightedAddressArray = () => {
    return createWeightedArray(calculationSuitableSpecialAddresses).map(
        (item) => item.address
    );
};

const weightedSpecialAddresses = createWeightedAddressArray();

export const getRandomSpecialIp = () => {
    const randomIndex = Math.floor(
        Math.random() * weightedSpecialAddresses.length
    );
    return weightedSpecialAddresses[randomIndex];
};

export const getAllSpecialAddresses = () => {
    return specialPurposeAddresses;
};

const subnetCalculationAddresses = [
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

const specialPurposeAddresses = [
    {
        address: "127.0.0.0",
        commonUse: "Loopback Netzwerk",
        importance: "Critical",
        category: "Loopback",
        range: "127.0.0.1 - 127.255.255.255/8",
        specialRules: "Always refers to local machine, cannot be subnetted",
    },

    {
        address: "169.254.0.0",
        commonUse: "APIPA Netzwerk",
        importance: "Important",
        category: "APIPA",
        range: "169.254.0.1 - 169.254.255.254/16 (+ Broadcast)",
        specialRules: "Auto-assigned when DHCP fails",
    },

    {
        address: "100.64.0.0",
        commonUse: "Carrier-Grade NAT Netzwerk",
        importance: "Important",
        category: "Carrier-Grade NAT",
        range: "100.64.0.1 - 100.127.255.254/10 (+ Broadcast)",
        specialRules: "Used by ISPs for shared customer connections (RFC 6598)",
    },

    {
        address: "255.255.255.255",
        commonUse: "Limitierter Broadcast",
        importance: "Critical",
        category: "Broadcast",
        range: "Einzeladresse",
        specialRules: "Broadcast to all hosts on local network",
    },

    {
        address: "0.0.0.0",
        commonUse: "Default Route - nicht zugewiesene Adresse",
        importance: "Critical",
        category: "Unspezifiziert",
        range: "Einzeladresse",
        specialRules: "Unspecified address and default route (RFC 1122)",
    },

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

export const getIPv4AddressInfo = (ipAddress) => {
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

export const getRandomCIDR = () => {
    const commonCidrs = [8, 16, 24, 25, 26, 27, 28, 29, 30, 31, 32];
    const allCidrs = Math.floor(Math.random() * 32) + 1;

    return Math.random() < 0.5
        ? commonCidrs[Math.floor(Math.random() * commonCidrs.length)]
        : allCidrs;
};

export const cidrToMask = (cidr) => {
    if (cidr < 1 || cidr > 32) {
        return null;
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
        if (subnetMask === "0.0.0.0") {
            return null;
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

        if (cidr === 0) return null;

        return cidr;
    } catch {
        return null;
    }
};

const getIPClass = (ipStr, ip) => {
    if (ipStr === "255.255.255.255") return "Broadcast";
    if (ip[0] === 0) return "Unspezifiziert";
    if (ip[0] === 127) return "Loopback";
    if (
        (ip[0] === 192 && ip[1] === 0 && ip[2] === 2) ||
        (ip[0] === 198 && ip[1] === 51 && ip[2] === 100) ||
        (ip[0] === 203 && ip[1] === 0 && ip[2] === 113)
    ) {
        return "Dokumentation";
    }
    if (ip[0] === 169 && ip[1] === 254) return "APIPA";
    if (ip[0] === 100 && ip[1] >= 64 && ip[1] <= 127)
        return "Carrier-Grade NAT";
    if (ip[0] === 10) return "A (privat)";
    if (ip[0] === 172 && ip[1] >= 16 && ip[1] <= 31) return "B (privat)";
    if (ip[0] === 192 && ip[1] === 168) return "C (privat)";
    if (ip[0] >= 224 && ip[0] <= 239) return "D";
    if (ip[0] >= 240 && ip[0] <= 254) return "E";
    if (ip[0] >= 1 && ip[0] <= 126) return "A (öffentlich)";
    if (ip[0] >= 128 && ip[0] <= 191 && !(ip[0] === 169 && ip[1] === 254)) {
        return "B (öffentlich)";
    }
    if (
        ip[0] >= 192 &&
        ip[0] <= 223 &&
        !(ip[0] === 192 && ip[1] === 168) &&
        !(ip[0] === 192 && ip[1] === 0 && ip[2] === 2) &&
        !(ip[0] === 198 && ip[1] === 51 && ip[2] === 100) &&
        !(ip[0] === 203 && ip[1] === 0 && ip[2] === 113)
    ) {
        return "C (öffentlich)";
    }
    return "";
};

export const calculateNetworkData = (ipStr, cidr) => {
    if (!ipStr || cidr === null || cidr === undefined) {
        return null;
    }

    const cidrNum =
        typeof cidr === "string"
            ? parseInt(cidr.toString().replace("/", ""))
            : cidr;
    if (isNaN(cidrNum) || cidrNum < 1 || cidrNum > 32) {
        return null;
    }

    if (typeof ipStr !== "string" || !ipStr.includes(".")) {
        return null;
    }

    const ipParts = ipStr.split(".");
    if (ipParts.length !== 4) {
        return null;
    }

    const ip = ipParts.map(Number);
    if (ip.some((octet) => isNaN(octet) || octet < 0 || octet > 255)) {
        return null;
    }

    if (ipStr === "255.255.255.255") {
        return {
            networkId: "kein",
            broadcast: "kein",
            ipClass: "Broadcast",
            usableIps: "kein",
            isPointToPoint: false,
            isSpecial: true,
        };
    }

    if (ipStr === "0.0.0.0") {
        return {
            networkId: "kein",
            broadcast: "kein",
            ipClass: "Unspezifiziert",
            usableIps: "kein",
            isPointToPoint: false,
            isSpecial: true,
        };
    }

    if (ip[0] >= 224 && ip[0] <= 239) {
        return {
            networkId: "kein",
            broadcast: "kein",
            ipClass: "D",
            usableIps: "kein",
            isPointToPoint: false,
            isSpecial: true,
        };
    }

    if (ip[0] >= 240 && ip[0] <= 254) {
        return {
            networkId: "kein",
            broadcast: "kein",
            ipClass: "E",
            usableIps: "kein",
            isPointToPoint: false,
            isSpecial: true,
        };
    }

    if (ip[0] === 127) {
        return {
            networkId: "kein",
            broadcast: "kein",
            ipClass: "Loopback",
            usableIps: "kein",
            isPointToPoint: false,
            isSpecial: true,
        };
    }

    const maskStr = cidrToMask(cidrNum);
    if (!maskStr) {
        return null;
    }

    const mask = maskStr.split(".").map(Number);
    const network = ip.map((octet, i) => octet & mask[i]);

    let broadcast, usable, networkId;

    if (cidrNum === 31) {
        networkId = "kein";
        broadcast = "kein";
        usable = 2;
    } else if (cidrNum === 32) {
        networkId = "kein";
        broadcast = "kein";
        usable = 1;
    } else {
        networkId = network.join(".");
        const broadcastArray = ip.map((octet, i) => octet | (~mask[i] & 255));
        broadcast = broadcastArray.join(".");
        usable = Math.pow(2, 32 - cidrNum);
        usable = usable - 2;
    }

    const ipClass = getIPClass(ipStr, ip);

    return {
        networkId: networkId,
        broadcast: broadcast,
        ipClass,
        usableIps: usable.toString(),
        isPointToPoint: cidrNum === 31 || cidrNum === 32,
        isSpecial: false,
    };
};

export const validateCIDRInput = (cidrInput) => {
    if (!cidrInput && cidrInput !== 0)
        return { isValid: false, error: "CIDR ist erforderlich" };

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

export const getSpecialAddressFixedNetwork = (ipAddress) => {
    if (!ipAddress || typeof ipAddress !== "string") return null;

    const ip = ipAddress.split(".").map(Number);
    if (
        ip.length !== 4 ||
        ip.some((octet) => isNaN(octet) || octet < 0 || octet > 255)
    ) {
        return null;
    }

    if (ipAddress === "255.255.255.255") {
        return {
            cidr: 32,
            subnetMask: "255.255.255.255",
            reason: "Limited Broadcast address /32",
        };
    }

    if (ipAddress === "0.0.0.0") {
        return {
            cidr: 32,
            subnetMask: "255.255.255.255",
            reason: "Unspecified address /32",
        };
    }

    if (ip[0] === 127) {
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

    if (ip[0] >= 224 && ip[0] <= 239) {
        return {
            cidr: 4,
            subnetMask: "240.0.0.0",
            reason: "Multicast class D /4",
        };
    }

    if (ip[0] >= 240 && ip[0] <= 254) {
        return {
            cidr: 4,
            subnetMask: "240.0.0.0",
            reason: "Reserved class E /4",
        };
    }

    return null;
};

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
        "0",
    ];

    return validNoneAnswers.includes(value.toLowerCase().trim());
};
