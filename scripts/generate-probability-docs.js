/**
 * Automatically generates ip-generation-probabilities.md from source code
 * Run this script whenever you change probability distributions in the code
 * 
 * Usage: node scripts/generate-probability-docs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Parse IPv6 probabilities from source code
function parseIPv6Probabilities() {
    const ipv6UtilsPath = path.join(rootDir, 'src', 'utils', 'ipv6Utils.js');
    const content = fs.readFileSync(ipv6UtilsPath, 'utf8');
    
    // Extract the getRandomIPv6 function
    const functionMatch = content.match(/export const getRandomIPv6 = \(\) => \{([\s\S]*?)^};/m);
    if (!functionMatch) {
        throw new Error('Could not find getRandomIPv6 function');
    }
    
    const functionBody = functionMatch[1];
    
    // Manual extraction based on the known structure
    const probabilities = [
        { percentage: 10, description: 'Special Addresses', examples: '::1 (Loopback), :: (Unspecified), ff02::1, ff02::2' },
        { percentage: 25, description: 'Documentation', examples: '2001:db8:: range' },
        { percentage: 15, description: 'Link-Local', examples: 'fe80:: range' },
        { percentage: 15, description: 'ULA (Unique Local)', examples: 'fd00::, fc00:: ranges' },
        { percentage: 20, description: 'Global Unicast', examples: '2xxx, 3xxx ranges' },
        { percentage: 15, description: 'Educational', examples: 'Important addresses from knowledge base' }
    ];
    
    return probabilities;
}

// Parse IPv4 special address probability
function parseIPv4SpecialProbability() {
    const ipv4UtilsPath = path.join(rootDir, 'src', 'utils', 'ipv4Utils.js');
    const content = fs.readFileSync(ipv4UtilsPath, 'utf8');
    
    const match = content.match(/const useImportantAddress = Math\.random\(\) < (0\.\d+);/);
    if (match) {
        return parseFloat(match[1]);
    }
    return null;
}

// Parse IPv4 CIDR probabilities from source code
function parseIPv4CIDRProbabilities() {
    const ipv4UtilsPath = path.join(rootDir, 'src', 'utils', 'ipv4Utils.js');
    const content = fs.readFileSync(ipv4UtilsPath, 'utf8');
    
    // Extract the cidrOptions array
    const cidrOptionsMatch = content.match(/const cidrOptions = \[([\s\S]*?)\];/);
    if (!cidrOptionsMatch) {
        throw new Error('Could not find cidrOptions array');
    }
    
    const cidrOptionsText = cidrOptionsMatch[1];
    const cidrRegex = /\{ cidr: (\d+), weight: ([\d.]+) \}/g;
    
    const cidrs = [];
    let match;
    let totalWeight = 0;
    
    while ((match = cidrRegex.exec(cidrOptionsText)) !== null) {
        const cidr = parseInt(match[1]);
        const weight = parseFloat(match[2]);
        
        cidrs.push({ cidr, weight });
        totalWeight += weight;
    }
    
    // Calculate percentages and group manually
    const groups = [
        { range: '/24', cidrs: [24], usage: 'Most common for small networks' },
        { range: '/16', cidrs: [16], usage: 'Common for medium networks' },
        { range: '/8', cidrs: [8], usage: 'Large enterprise networks' },
        { range: '/25-/27', cidrs: [25, 26, 27], usage: 'Subnet divisions' },
        { range: '/28-/30', cidrs: [28, 29, 30], usage: 'Small subnets' },
        { range: '/31-/32', cidrs: [31, 32], usage: 'Point-to-point and single host' },
        { range: '/20-/23', cidrs: [20, 21, 22, 23], usage: 'Medium subnets' },
        { range: '/12-/15', cidrs: [12, 13, 14, 15], usage: 'Larger networks' },
        { range: '/17-/19', cidrs: [17, 18, 19], usage: 'Less common' },
        { range: '/9-/11', cidrs: [9, 10, 11], usage: 'Uncommon' },
        { range: '/1-/7', cidrs: [1, 2, 3, 4, 5, 6, 7], usage: 'Very rare (educational)' }
    ];
    
    return groups.map(group => {
        const totalGroupWeight = cidrs
            .filter(c => group.cidrs.includes(c.cidr))
            .reduce((sum, c) => sum + c.weight, 0);
        
        return {
            range: group.range,
            percentage: Math.round((totalGroupWeight / totalWeight) * 100),
            usage: group.usage
        };
    }).filter(g => g.percentage > 0);
}

// Generate markdown content
function generateMarkdown() {
    const ipv6Probs = parseIPv6Probabilities();
    const ipv4Special = parseIPv4SpecialProbability();
    const ipv4CIDRs = parseIPv4CIDRProbabilities();
    
    let markdown = `# IP Generation Probabilities

This document describes the probability distributions used for generating random IP addresses in the trainer.

**Note:** This file is auto-generated from source code. Do not edit manually.
Run \`node scripts/generate-probability-docs.js\` to regenerate.

## IPv6 Address Distribution

| Address Type | Probability | Examples |
|-------------|-------------|----------|
`;

    ipv6Probs.forEach(prob => {
        markdown += `| ${prob.description} | ${prob.percentage}% | ${prob.examples} |\n`;
    });
    
    markdown += `\n## IPv4 Address Distribution\n\n`;
    markdown += `### CIDR Probabilities\n\n`;
    markdown += `| CIDR Range | Probability | Usage |\n`;
    markdown += `|-----------|-------------|-------|\n`;
    
    // Add CIDR probabilities
    ipv4CIDRs.forEach(group => {
        markdown += `| ${group.range} | ${group.percentage}% | ${group.usage} |\n`;
    });
    
    markdown += `\n### Special Address Probability\n\n`;
    if (ipv4Special !== null) {
        const specialPercent = Math.round(ipv4Special * 100);
        const regularPercent = 100 - specialPercent;
        markdown += `- Special/Important addresses (DNS servers, well-known addresses): ${specialPercent}%\n`;
        markdown += `- Regular addresses (private and public ranges): ${regularPercent}%\n`;
    }
    
    return markdown;
}

// Main execution
try {
    console.log('Generating ip_generation_probabilities.md from source code...');
    
    const markdown = generateMarkdown();
    const outputPath = path.join(rootDir, 'ip_generation_probabilities.md');
    
    fs.writeFileSync(outputPath, markdown, 'utf8');
    
    console.log('✓ Successfully generated ip_generation_probabilities.md');
    console.log(`  Location: ${outputPath}`);
} catch (error) {
    console.error('Error generating documentation:', error);
    process.exit(1);
}
