import { resetInputBorders } from "./commonUtils";

export const getRandomIp = () => {
    return Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * 256))
        .join(".");
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
    if (ip[0] >= 1 && ip[0] <= 126) ipClass = "A";
    else if (ip[0] >= 128 && ip[0] <= 191) ipClass = "B";
    else if (ip[0] >= 192 && ip[0] <= 223) ipClass = "C";
    else if (ip[0] >= 224 && ip[0] <= 239) ipClass = "D";
    else ipClass = "E";

    return {
        networkId: network.join("."),
        broadcast: broadcast.join("."),
        ipClass,
        usableIps: usable.toString(),
    };
};
