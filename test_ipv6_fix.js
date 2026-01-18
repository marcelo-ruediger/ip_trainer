import {
    calculateIPv6NetworkAddress,
    expandIPv6,
    abbreviateIPv6,
    calculateIPv6NetworkData,
    isValidIPv6Address
} from './src/utils/ipv6Utils.js';

console.log("=== Testing IPv6 Network Address Calculation Fix ===\n");

// Test cases with expected results
const testCases = [
    // The specific case mentioned by the user
    {
        ip: "207a:6c:b4e:b0e:fb0:efd:239:e11",
        prefix: "/56",
        expected: "207a:6c:b4e:b00::",
        description: "User's specific case - /56 with trailing zeros"
    },
    // More /56 cases to verify trailing zeros
    {
        ip: "2001:db8:1234:5678:abcd:ef01:2345:6789",
        prefix: "/56",
        expected: "2001:db8:1234:5600::",
        description: "/56 prefix - should preserve trailing zeros in 4th group"
    },
    {
        ip: "fd00:1234:5678:9abc:def0:1234:5678:9abc",
        prefix: "/56",
        expected: "fd00:1234:5678:9a00::",
        description: "/56 prefix - ULA with trailing zeros"
    },
    // /48 cases
    {
        ip: "2001:db8:abcd:1234:5678:9abc:def0:1234",
        prefix: "/48",
        expected: "2001:db8:abcd::",
        description: "/48 prefix - clean boundary"
    },
    // /52 cases (partial group)
    {
        ip: "2001:db8:1234:5678::",
        prefix: "/52",
        expected: "2001:db8:1234:5000::",
        description: "/52 prefix - should preserve trailing zeros"
    },
    // /60 cases (partial group)
    {
        ip: "2001:db8:1234:56ff::",
        prefix: "/60",
        expected: "2001:db8:1234:56f0::",
        description: "/60 prefix - should preserve trailing zero"
    },
    // /64 cases (clean boundary)
    {
        ip: "2001:db8:1234:5678:abcd:ef01:2345:6789",
        prefix: "/64",
        expected: "2001:db8:1234:5678::",
        description: "/64 prefix - standard case"
    },
    // /32 cases (clean boundary)
    {
        ip: "2001:db8:1234:5678::",
        prefix: "/32",
        expected: "2001:db8::",
        description: "/32 prefix - clean boundary"
    },
    // /128 cases (full address)
    {
        ip: "::1",
        prefix: "/128",
        expected: "::1",
        description: "/128 prefix - loopback"
    },
    // Edge case: /4 (very small prefix)
    {
        ip: "2001:db8:1234:5678::",
        prefix: "/4",
        expected: "2000::",
        description: "/4 prefix - first nibble only"
    },
    // Edge case: /12 (partial first group)
    {
        ip: "2abc:db8:1234:5678::",
        prefix: "/12",
        expected: "2ab0::",
        description: "/12 prefix - partial first group with trailing zero"
    },
    // Link-local with /10
    {
        ip: "fe80::1234:5678:9abc:def0",
        prefix: "/10",
        expected: "fe80::",
        description: "/10 prefix - link-local"
    }
];

let passed = 0;
let failed = 0;

testCases.forEach((test, index) => {
    console.log(`Test ${index + 1}: ${test.description}`);
    console.log(`  Input: ${test.ip}${test.prefix}`);
    
    const expanded = expandIPv6(test.ip);
    const result = calculateIPv6NetworkAddress(expanded, test.prefix);
    
    console.log(`  Expected: ${test.expected}`);
    console.log(`  Got:      ${result}`);
    
    if (result === test.expected) {
        console.log(`  ✓ PASSED\n`);
        passed++;
    } else {
        console.log(`  ✗ FAILED\n`);
        failed++;
    }
});

console.log("=== Testing Other Functions (Regression Test) ===\n");

// Test that abbreviateIPv6 still works correctly
const abbreviationTests = [
    { input: "2001:0db8:0000:0000:0000:0000:0000:0001", expected: "2001:db8::1" },
    { input: "fe80:0000:0000:0000:0000:0000:0000:0001", expected: "fe80::1" },
    { input: "2001:0db8:0001:0000:0000:0000:0000:0001", expected: "2001:db8:1::1" },
    { input: "0000:0000:0000:0000:0000:0000:0000:0000", expected: "::" },
];

abbreviationTests.forEach((test, index) => {
    const result = abbreviateIPv6(test.input);
    console.log(`Abbreviation Test ${index + 1}: ${test.input}`);
    console.log(`  Expected: ${test.expected}`);
    console.log(`  Got:      ${result}`);
    
    if (result === test.expected) {
        console.log(`  ✓ PASSED\n`);
        passed++;
    } else {
        console.log(`  ✗ FAILED\n`);
        failed++;
    }
});

// Test that expandIPv6 still works correctly
const expansionTests = [
    { input: "2001:db8::1", expected: "2001:0db8:0000:0000:0000:0000:0000:0001" },
    { input: "::1", expected: "0000:0000:0000:0000:0000:0000:0000:0001" },
    { input: "::", expected: "0000:0000:0000:0000:0000:0000:0000:0000" },
    { input: "fe80::", expected: "fe80:0000:0000:0000:0000:0000:0000:0000" },
];

expansionTests.forEach((test, index) => {
    const result = expandIPv6(test.input);
    console.log(`Expansion Test ${index + 1}: ${test.input}`);
    console.log(`  Expected: ${test.expected}`);
    console.log(`  Got:      ${result}`);
    
    if (result === test.expected) {
        console.log(`  ✓ PASSED\n`);
        passed++;
    } else {
        console.log(`  ✗ FAILED\n`);
        failed++;
    }
});

// Test calculateIPv6NetworkData
console.log("Testing calculateIPv6NetworkData:\n");
const networkDataTest = calculateIPv6NetworkData("207a:006c:0b4e:0b0e:0fb0:0efd:0239:0e11", "/56");
console.log(`Input: 207a:6c:b4e:b0e:fb0:efd:239:e11/56`);
console.log(`Network Address: ${networkDataTest.networkAddress}`);
console.log(`Type: ${networkDataTest.type}`);
console.log(`Interface ID: ${networkDataTest.interfaceId}`);

if (networkDataTest.networkAddress === "207a:6c:b4e:b00::") {
    console.log(`✓ PASSED\n`);
    passed++;
} else {
    console.log(`✗ FAILED\n`);
    failed++;
}

console.log("=== Summary ===");
console.log(`Total Tests: ${passed + failed}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
