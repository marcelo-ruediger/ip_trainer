# 🌐 IPv4/IPv6 Network Trainer

A comprehensive network training application designed for German **IHK Fachinformatiker** exam preparation. Master IPv4 and IPv6 networking through practical address calculations and subnet analysis.

> **🎓 Perfect for IHK Exam Prep** - Practice with real-world scenarios and essential addresses

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

-   **Automatic Calculations**: Network address, broadcast address, and host count
-   **Essential Addresses**: Critical DNS servers and gateways for exam preparation
-   **Smart Validation**: Multiple input formats with immediate feedback

### 🌍 IPv6 Training

-   **Address Formats**: Convert between full and abbreviated IPv6 notation
-   **Network Analysis**: Address types, prefix planning, and subnet calculations
-   **Real-World Focus**: 75% Global Unicast addresses for practical training
-   **DNS Training**: Google, Cloudflare, and Root DNS servers

### 🎨 User Experience

-   **Visual Feedback**: Color-coded validation results
-   **Empty Field Detection**: Gray highlighting for unfilled fields
-   **German Localization**: Complete German interface for IHK preparation
-   **Responsive Design**: Works on desktop, tablet, and mobile

## 🎯 How It Works

### IPv4 Mode

1. Enter IPv4 address and subnet mask → system calculates network/broadcast/hosts
2. Or system generates IPv4 → you calculate subnet mask and other fields
3. Validate with "Überprüfen" or reveal answers with "Antworten anzeigen"

### IPv6 Mode

1. System provides full or abbreviated IPv6 address with prefix
2. Complete missing fields and calculate network data
3. Analyze address type and extract subnet/interface portions

## 🎲 Address Generation

### IPv4 System

-   **35%** Essential addresses (DNS servers, gateways)
-   **65%** Educational addresses for subnet practice

### IPv6 System (Optimized for Real Networks)

-   **50%** Must-know addresses (DNS servers, documentation, special addresses)
-   **38%** Generated Global Unicast (web servers, mail servers, CDNs)
-   **15%** Documentation addresses (RFC 3849 examples)
-   **3%** Special addresses (Loopback, Multicast)

**Result**: ~75-80% Global Unicast addresses for maximum real-world relevance

## 🛠️ Technology Stack

-   **Frontend**: React.js 18.x with modern hooks
-   **Build Tool**: Vite 5.x
-   **Styling**: Custom CSS with responsive design
-   **Standards**: RFC compliant IPv4/IPv6 implementations

## 🎯 Target Audience

-   **IHK Fachinformatiker Students**: German IT certification exam prep
-   **Network Administration Trainees**: Practical IPv4/IPv6 skills
-   **IT Professionals**: Refreshing knowledge with realistic scenarios
-   **IT Educators**: Teaching with production-like examples

## 📄 License

MIT License - Free to use, modify, and share for educational purposes.

---

**Built with ❤️ for German IT Students**
