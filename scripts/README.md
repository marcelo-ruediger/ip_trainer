# Scripts

## generate-probability-docs.js

Auto-generates `ip-generation-probabilities.md` from source code.

**Usage:**
```bash
npm run docs:probabilities
```

**When to run:**
After changing probability values in `src/utils/ipv4Utils.js` or `src/utils/ipv6Utils.js`

**What it does:**
Parses probability thresholds and weights from source code, calculates percentages, and regenerates the documentation file.
