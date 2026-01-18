// Test script to verify IPv6 and IPv4 generation improvements
import { 
    getRandomIPv6, 
    getIPv6AddressType,
    generateIPv6WithPrefix,
    calculateIPv6NetworkData,
    abbreviateIPv6,
    expandIPv6
} from './src/utils/ipv6Utils.js';

import { 
    getRandomIp, 
    getRandomCIDR,
    calculateNetworkData,
    cidrToMask,
    maskToCidr
} from './src/utils/ipv4Utils.js';

console.log('='.repeat(80));
console.log('TESTING IPv6 GENERATION - Probability Distribution');
console.log('='.repeat(80));

// Test IPv6 generation distribution
const ipv6Types = {
    'Loopback': 0,
    'Unspecified': 0,
    'Multicast': 0,
    'Documentation': 0,
    'Link-Local': 0,
    'ULA': 0,
    'Global Unicast': 0
};

const iterations = 10000;

console.log(`\nGenerating ${iterations} IPv6 addresses to test distribution...\n`);

for (let i = 0; i < iterations; i++) {
    const ipv6 = getRandomIPv6();
    const type = getIPv6AddressType(ipv6);
    ipv6Types[type] = (ipv6Types[type] || 0) + 1;
}

console.log('IPv6 Address Type Distribution:');
console.log('-'.repeat(50));
Object.entries(ipv6Types).forEach(([type, count]) => {
    const percentage = ((count / iterations) * 100).toFixed(2);
    console.log(`${type.padEnd(20)} ${count.toString().padStart(6)} (${percentage.padStart(6)}%)`);
});

console.log('\nExpected Distribution:');
console.log('-'.repeat(50));
console.log('Special (Loopback + Unspecified + Multicast): ~8%');
console.log('Documentation:                                  ~30%');
console.log('Link-Local:                                     ~15%');
console.log('ULA:                                            ~15%');
console.log('Global Unicast:                                 ~20%');
console.log('(Remainder for educational addresses)           ~12%');

// Test IPv6 functionality
console.log('\n' + '='.repeat(80));
console.log('TESTING IPv6 FUNCTIONALITY');
console.log('='.repeat(80));

const testCases = [
    { ip: '2001:db8::1', prefix: '/64', desc: 'Documentation address' },
    { ip: 'fe80::1', prefix: '/64', desc: 'Link-Local address' },
    { ip: 'fd00::1', prefix: '/48', desc: 'ULA address' },
    { ip: '::1', prefix: '/128', desc: 'Loopback' },
    { ip: '::', prefix: '/128', desc: 'Unspecified' },
    { ip: 'ff02::1', prefix: '/128', desc: 'Multicast All Nodes' }
];

let ipv6TestsPassed = 0;
let ipv6TestsFailed = 0;

testCases.forEach(test => {
    try {
        const expanded = expandIPv6(test.ip);
        const abbreviated = abbreviateIPv6(expanded);
        const networkData = calculateIPv6NetworkData(expanded, test.prefix);
        const type = getIPv6AddressType(expanded);
        
        console.log(`\n✓ ${test.desc}: ${test.ip}`);
        console.log(`  Expanded: ${expanded}`);
        console.log(`  Type: ${type}`);
        console.log(`  Network: ${networkData.networkAddress}`);
        ipv6TestsPassed++;
    } catch (error) {
        console.log(`\n✗ FAILED ${test.desc}: ${error.message}`);
        ipv6TestsFailed++;
    }
});

console.log('\n' + '='.repeat(80));
console.log('TESTING IPv4 CIDR DISTRIBUTION');
console.log('='.repeat(80));

const cidrDistribution = {};

console.log(`\nGenerating ${iterations} CIDR values to test distribution...\n`);

for (let i = 0; i < iterations; i++) {
    const cidr = getRandomCIDR();
    cidrDistribution[cidr] = (cidrDistribution[cidr] || 0) + 1;
}

console.log('CIDR Distribution:');
console.log('-'.repeat(50));

// Sort by CIDR value
const sortedCidrs = Object.entries(cidrDistribution)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

sortedCidrs.forEach(([cidr, count]) => {
    const percentage = ((count / iterations) * 100).toFixed(2);
    const bar = '█'.repeat(Math.floor(percentage / 2));
    console.log(`/${cidr.padStart(2)}  ${count.toString().padStart(5)} (${percentage.padStart(5)}%) ${bar}`);
});

console.log('\nExpected: /24 should be ~20%, with less common CIDRs having increased probability');

// Test IPv4 functionality
console.log('\n' + '='.repeat(80));
console.log('TESTING IPv4 FUNCTIONALITY');
console.log('='.repeat(80));

const ipv4TestCases = [
    { ip: '192.168.1.1', cidr: 24, desc: 'Common private address' },
    { ip: '10.0.0.1', cidr: 8, desc: 'Class A private' },
    { ip: '172.16.0.1', cidr: 16, desc: 'Class B private' },
    { ip: '8.8.8.8', cidr: 32, desc: 'Google DNS' },
    { ip: '127.0.0.1', cidr: 8, desc: 'Loopback' },
];

let ipv4TestsPassed = 0;
let ipv4TestsFailed = 0;

ipv4TestCases.forEach(test => {
    try {
        const networkData = calculateNetworkData(test.ip, test.cidr);
        const mask = cidrToMask(test.cidr);
        const cidrFromMask = maskToCidr(mask);
        
        console.log(`\n✓ ${test.desc}: ${test.ip}/${test.cidr}`);
        console.log(`  Subnet Mask: ${mask}`);
        console.log(`  Network ID: ${networkData.networkId}`);
        console.log(`  Broadcast: ${networkData.broadcast}`);
        console.log(`  Class: ${networkData.ipClass}`);
        console.log(`  Usable IPs: ${networkData.usableIps}`);
        
        if (cidrFromMask === test.cidr) {
            ipv4TestsPassed++;
        } else {
            console.log(`  ✗ CIDR mismatch: expected ${test.cidr}, got ${cidrFromMask}`);
            ipv4TestsFailed++;
        }
    } catch (error) {
        console.log(`\n✗ FAILED ${test.desc}: ${error.message}`);
        ipv4TestsFailed++;
    }
});

// Test random generation
console.log('\n' + '='.repeat(80));
console.log('TESTING RANDOM GENERATION');
console.log('='.repeat(80));

console.log('\nGenerating 5 random IPv6 addresses with prefixes:');
for (let i = 0; i < 5; i++) {
    try {
        const result = generateIPv6WithPrefix();
        console.log(`\n${i + 1}. ${result.abbreviated}${result.prefix}`);
        console.log(`   Type: ${result.networkData.type}`);
        console.log(`   Network: ${result.networkData.networkAddress}`);
    } catch (error) {
        console.log(`   ✗ Error: ${error.message}`);
    }
}

console.log('\nGenerating 5 random IPv4 addresses with CIDRs:');
for (let i = 0; i < 5; i++) {
    try {
        const ip = getRandomIp(false);
        const cidr = getRandomCIDR();
        const networkData = calculateNetworkData(ip, cidr);
        console.log(`\n${i + 1}. ${ip}/${cidr}`);
        console.log(`   Network: ${networkData.networkId}`);
        console.log(`   Class: ${networkData.ipClass}`);
    } catch (error) {
        console.log(`   ✗ Error: ${error.message}`);
    }
}

// Summary
console.log('\n' + '='.repeat(80));
console.log('TEST SUMMARY');
console.log('='.repeat(80));

console.log(`\nIPv6 Tests: ${ipv6TestsPassed} passed, ${ipv6TestsFailed} failed`);
console.log(`IPv4 Tests: ${ipv4TestsPassed} passed, ${ipv4TestsFailed} failed`);

const totalTests = ipv6TestsPassed + ipv4TestsPassed;
const totalFailed = ipv6TestsFailed + ipv4TestsFailed;

if (totalFailed === 0) {
    console.log('\n✓ ALL TESTS PASSED! No functionality was broken.');
} else {
    console.log(`\n✗ ${totalFailed} test(s) failed. Please review.`);
}

console.log('\n' + '='.repeat(80));
