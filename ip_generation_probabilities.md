# IP Generation Probabilities

This document describes the probability distributions used for generating random IP addresses in the trainer.

**Note:** This file is auto-generated from source code. Do not edit manually.
Run `node scripts/generate-probability-docs.js` to regenerate.

## IPv6 Address Distribution

| Address Type | Probability | Examples |
|-------------|-------------|----------|
| Special Addresses | 10% | ::1 (Loopback), :: (Unspecified), ff02::1, ff02::2 |
| Documentation | 25% | 2001:db8:: range |
| Link-Local | 15% | fe80:: range |
| ULA (Unique Local) | 15% | fd00::, fc00:: ranges |
| Global Unicast | 20% | 2xxx, 3xxx ranges |
| Educational | 15% | Important addresses from knowledge base |

## IPv4 Address Distribution

### CIDR Probabilities

| CIDR Range | Probability | Usage |
|-----------|-------------|-------|
| /24 | 20% | Most common for small networks |
| /16 | 15% | Common for medium networks |
| /8 | 10% | Large enterprise networks |
| /25-/27 | 10% | Subnet divisions |
| /28-/30 | 10% | Small subnets |
| /31-/32 | 10% | Point-to-point and single host |
| /20-/23 | 8% | Medium subnets |
| /12-/15 | 7% | Larger networks |
| /17-/19 | 5% | Less common |
| /9-/11 | 3% | Uncommon |
| /1-/7 | 4% | Very rare (educational) |

### Special Address Probability

- Special/Important addresses (DNS servers, well-known addresses): 25%
- Regular addresses (private and public ranges): 75%
