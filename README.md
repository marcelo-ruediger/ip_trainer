# IPv4/IPv6 Network Trainer

A comprehensive network training application designed for German IHK Fachinformatiker exam preparation. Master IPv4 and IPv6 networking through practical address calculations and subnet analysis.

## Quick Start

```bash
git clone <repository-url>
cd ipv4_trainer
npm install
npm run dev
```

## Features

### IPv4 Training

-   **Automatic Calculations**: Enter an IPv4 address and subnet mask, automatically calculates network address, broadcast address, and host count
-   **Essential Addresses**: Critical DNS servers (8.8.8.8, 1.1.1.1), gateways, and network addresses students must know
-   **Special Address Reference**: Interactive guide to loopback (127.0.0.1), APIPA (169.254.x.x), private networks (RFC 1918), and routing addresses

### IPv6 Training

-   **Address Formats**: Practice converting between full and abbreviated IPv6 notation (::1, 2001:db8::)
-   **Network Analysis**: Address types (Global Unicast, Link-Local, ULA, Multicast), prefix planning
-   **Modern Calculations**: Subnetzanteil (subnet portion) and Interfaceanteil (interface portion) field analysis

## Training Fields

| IPv4 Mode                              | IPv6 Mode                                       |
| -------------------------------------- | ----------------------------------------------- |
| **IPv4-Adresse** (Input)               | **Vollständige IPv6-Adresse** (Input/Generated) |
| **Subnetzmaske** (Generated)           | **Netzwerkpräfix** (Generated)                  |
| **CIDR** (Generated)                   | **Abkürzung** (Input/Generated)                 |
| **Netzwerkadresse** (Calculated)       | **Netzwerkadresse** (Calculated)                |
| **Broadcast-Adresse** (Generated)      | **Typ** (Calculated)                            |
| **Anzahl von Hostadresse** (Generated) | **Subnetzanteil** (Calculated)                  |
| **IP-Klasse** (Calculated)             | **Interfaceanteil** (Calculated)                |

**Legend**:

-   _Input_ = You enter the value
-   _Generated_ = System provides the value
-   _Calculated_ = You calculate based on given data

## How It Works

### IPv4 Mode

1. **Input Method A**: Enter IPv4 address and subnet mask → system calculates network/broadcast/hosts
2. **Input Method B**: System generates IPv4 address → you calculate subnet mask and other fields
3. **Validation**: Check your calculations with "Prüfen" or reveal answers with "Antworten anzeigen"

### IPv6 Mode

1. **Generate Exercise**: System provides either full or abbreviated IPv6 address with prefix
2. **Complete Missing Fields**: Fill in the opposite format (full↔abbreviated) and calculate network data
3. **Analyze Components**: Determine address type and extract subnet/interface portions

## Address Generation Logic

### IPv4 System

-   **35% Essential Addresses**: Critical IHK exam addresses (DNS servers, common gateways)
-   **65% Educational Addresses**: Realistic private/public addresses for subnet practice
-   **Smart Filtering**: Only generates addresses suitable for standard subnet calculations

### IPv6 System

-   **60% IHK Essential**: Core IPv6 addresses every Fachinformatiker must know
-   **40% Educational**: Documentation addresses (2001:db8::), ULA addresses, practical examples
-   **Prefix Focus**: Business-relevant prefixes (/48, /56, /64) for real-world scenarios

## Educational Benefits

-   **IHK-Aligned Content**: German terminology and exam-relevant scenarios
-   **Smart Generation**: Mix of essential "must-know" addresses and realistic examples
-   **Interactive Learning**: Special address reference popups with color-coded categories
-   **Flexible Validation**: Accepts multiple valid input formats
-   **Visual Feedback**: Immediate color-coded results
-   **Unambiguous Exercises**: Network address is always calculated (never generated) to prevent cases where multiple CIDR values could be technically correct

## Technology

-   React.js with Vite
-   Responsive CSS design
-   German localization

## Target Audience

German IT students preparing for **IHK Fachinformatiker** certification, focusing on practical networking knowledge required for the exam.
