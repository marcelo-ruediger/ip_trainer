# 🌐 IPv4/IPv6 Network Trainer

A comprehensive network training application designed for German **IHK Fachinformatiker** exam preparation. Master IPv4 and IPv6 networking through practical address calculations, subnet analysis, and complete coverage of all address types including special cases.

> **🎓 Perfect for IHK Exam Prep** - Practice with real-world scenarios, essential addresses, and RFC-compliant special cases

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Manobrawn/ipv4_trainer.git
cd ipv4_trainer

# Install dependencies
npm install

# Start development server
npm run dev
```

Access the application at `http://localhost:5173`

## ✨ Features

### 📊 IPv4 Training

-   **Comprehensive Address Support**: All 15 IP address types (A-E, private/public, special addresses)
-   **RFC-Compliant Calculations**: Network address, broadcast address, and host count following exact standards
-   **Special Address Handling**: Proper treatment of Multicast, Loopback, Documentation, APIPA, and Carrier-Grade NAT
-   **Advanced CIDR Support**: /31 and /32 networks with correct point-to-point and host route logic
-   **Smart Validation**: Flexible input formats with immediate feedback

### 🌍 IPv6 Training

-   **Address Formats**: Convert between full and abbreviated IPv6 notation
-   **Network Analysis**: Address types, prefix planning, and subnet calculations
-   **Real-World Focus**: 75% Global Unicast addresses for practical training
-   **Special Addresses**: Proper handling of Link-Local, ULA, Multicast, and Documentation addresses

### 🎨 User Experience

-   **Visual Feedback**: Color-coded validation with red/green indicators
-   **Empty Field Recognition**: Gray highlighting identifies unfilled required fields
-   **Flexible Input**: Accepts "kein", "keine", "none", "0" for special address fields
-   **German Localization**: Complete German interface for IHK preparation
-   **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🎯 How It Works

### IPv4 Mode

1. **Practice Mode**: System generates an IP address with one field filled → calculate the remaining fields
2. **Input Mode**: Enter IP address and subnet mask → system calculates network/broadcast/hosts
3. **Validation**: Click "Überprüfen" to check answers or "Antworten anzeigen" to reveal solutions
4. **Special Cases**: System recognizes when special addresses require "kein" answers instead of calculations

### IPv6 Mode

1. System provides full or abbreviated IPv6 address with prefix
2. Complete missing fields and calculate network data
3. Analyze address type and extract subnet/interface portions
4. Click validation buttons to check work or reveal answers

## 🎲 Address Generation

### IPv4 System

-   **50%** Private networks (10.x.x.x, 172.16-31.x.x, 192.168.x.x) - Most common in practice
-   **24%** Public examples (DNS servers, Class A/B/C ranges) - Educational importance
-   **16%** Special purpose (APIPA, Carrier-Grade NAT, Documentation) - Modern networking
-   **10%** Special addresses (Multicast, Reserved, Loopback, Broadcast) - Complete coverage

All 15 dropdown address types are covered with appropriate educational weighting.

### IPv6 System

-   **50%** Must-know addresses (DNS servers, documentation, Link-Local, ULA, special addresses)
-   **38%** Generated Global Unicast (web servers, mail servers, CDNs)
-   **12%** Special and documentation addresses for complete learning coverage

Results in ~75-80% Global Unicast addresses for maximum real-world relevance.

## 🛠️ Technology Stack

-   **Frontend**: React.js 18.x with modern hooks
-   **Build Tool**: Vite 5.x for fast development
-   **Styling**: Custom CSS with responsive design
-   **Standards**: RFC compliant IPv4/IPv6 implementations
-   **Logic**: Comprehensive address classification following networking standards

## 🎯 Target Audience

-   **IHK Fachinformatiker Students**: German IT certification exam prep
-   **Network Administration Trainees**: Practical IPv4/IPv6 skills
-   **IT Professionals**: Refreshing knowledge with realistic scenarios
-   **IT Educators**: Teaching with production-like examples

## 📄 License

MIT License - Free to use, modify, and share for educational purposes.

---

**Built with ❤️ for German IT Students**
