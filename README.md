# 🌐 IPv4/IPv6 Network Trainer

> **🎓 Für deutsche IHK Fachinformatiker Prüfungsvorbereitung**  
> **⚡ Built with React.js & Vite** • **📄 MIT License (Free to use)**

A comprehensive network training application designed for German **IHK Fachinformatiker** exam preparation. Master IPv4 and IPv6 networking through practical address calculations and subnet analysis.

## 🌐 **[🚀 Launch Application](https://manobrawn.github.io/ipv4_trainer/)** 🌐

> 🎯 **Perfect for IHK Exam Prep** - Practice with real-world scenarios and essential addresses that appear in certification exams.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Manobrawn/ipv4_trainer.git
cd ipv4_trainer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Access the application at `http://localhost:5173`

## ✨ Features

### 📊 IPv4 Training

-   **🔢 Automatic Calculations**: Enter an IPv4 address and subnet mask, automatically calculates network address, broadcast address, and host count
-   **🎯 Essential Addresses**: Critical DNS servers (8.8.8.8, 1.1.1.1), gateways, and network addresses students must know
-   **📚 Special Address Reference**: Interactive guide to loopback (127.0.0.1), APIPA (169.254.x.x), private networks (RFC 1918), and routing addresses
-   **✅ Smart Validation**: Accepts multiple valid input formats and provides immediate feedback

### 🌍 IPv6 Training

-   **🔀 Address Formats**: Practice converting between full and abbreviated IPv6 notation (::1, 2001:db8::)
-   **🏗️ Network Analysis**: Address types (Global Unicast, Link-Local, ULA, Multicast), prefix planning
-   **⚡ Modern Calculations**: Subnetzanteil (subnet portion) and Interfaceanteil (interface portion) field analysis
-   **📋 Abbreviation Rules**: Interactive guide with RFC 5952 compliant compression rules

### 🎨 User Experience

-   **🎯 Visual Feedback**: Color-coded validation with detailed results display showing correct/incorrect field counts
-   **� Empty Field Detection**: Gray highlighting for unfilled fields during validation checks
-   **�📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
-   **🌙 Dark Theme**: Professional dark interface with blue accent colors
-   **🇩🇪 German Localization**: Complete German interface for IHK exam preparation
-   **📊 Progress Tracking**: Interactive validation results with field-by-field feedback

## 📋 Training Fields

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

-   📝 _Input_ = You enter the value
-   🎲 _Generated_ = System provides the value
-   🧮 _Calculated_ = You calculate based on given data

## 🎯 How It Works

### 🔢 IPv4 Mode

1. **📥 Input Method A**: Enter IPv4 address and subnet mask → system calculates network/broadcast/hosts
2. **🎲 Input Method B**: System generates IPv4 address → you calculate subnet mask and other fields
3. **✅ Validation**: Check your calculations with "Überprüfen" button for detailed field-by-field results or reveal answers with "Antworten anzeigen"

### 🌐 IPv6 Mode

1. **🎲 Generate Exercise**: System provides either full or abbreviated IPv6 address with prefix
2. **📝 Complete Missing Fields**: Fill in the opposite format (full↔abbreviated) and calculate network data
3. **🔍 Analyze Components**: Determine address type and extract subnet/interface portions
4. **✅ Smart Validation**: Accepts equivalent IPv6 address formats (e.g., `fd01:8e:0::` = `fd01:8e::`)

## 🎲 Address Generation Logic

### 🔢 IPv4 System

-   **35% Essential Addresses**: Critical IHK exam addresses (DNS servers, common gateways)
-   **65% Educational Addresses**: Realistic private/public addresses for subnet practice
-   **🎯 Smart Filtering**: Only generates addresses suitable for standard subnet calculations

### 🌐 IPv6 System

-   **47% Must-Know Addresses**: Critical IHK exam addresses from the essential address list
-   **30% Documentation**: Documentation addresses (2001:db8::) for learning examples
-   **9% ULA**: Private IPv6 addresses for enterprise networking scenarios
-   **9% Link-Local/Global**: Auto-configuration and internet addresses for networking basics
-   **5% Special Addresses**: Loopback (::1), Unspecified (::), and Multicast addresses
-   **🎯 Smart Filtering**: Only generates addresses suitable for standard network calculations
-   **✅ Enhanced Validation**: Accepts "kein" responses for network addresses in special cases (Loopback/Unspecified with /128)

## 🎓 Educational Benefits

-   **🎯 IHK-Aligned Content**: German terminology and exam-relevant scenarios
-   **🧠 Smart Generation**: Mix of essential "must-know" addresses and realistic examples
-   **💡 Interactive Learning**: Special address reference popups with color-coded categories
-   **🔄 Flexible Validation**: Accepts multiple valid input formats and equivalent address representations
-   **📊 Detailed Feedback**: Field-by-field validation results with correct/incorrect counts
-   **👀 Visual Feedback**: Immediate color-coded results with professional styling
-   **✨ Unambiguous Exercises**: Network address is always calculated (never generated) to prevent cases where multiple CIDR values could be technically correct

## 🛠️ Technology Stack

-   **Frontend**: React.js 18.x with modern hooks
-   **Build Tool**: Vite 5.x for fast development
-   **Styling**: Custom CSS with responsive design
-   **Localization**: Complete German interface
-   **Standards**: RFC compliant IPv4/IPv6 implementations

## 🎯 Target Audience

German IT students preparing for **IHK Fachinformatiker** certification, focusing on practical networking knowledge required for the exam.

## 📁 Project Structure

```
ipv4_trainer/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx
│   │   ├── ToggleElements.jsx
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   ├── useIpv4.js
│   │   └── useIpv6.js
│   ├── utils/              # Utility functions
│   │   ├── ipv4Utils.js
│   │   ├── ipv6Utils.js
│   │   └── commonUtils.js
│   └── images/             # Static assets
├── public/                 # Public assets
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 🎓 What this means for students:

-   ✅ **Free to use** for learning and exam preparation
-   ✅ **Free to modify** and adapt for your needs
-   ✅ **Free to share** with classmates
-   ✅ **No restrictions** on personal or educational use
-   ✅ **Perfect for IHK exam preparation**

The MIT License ensures this tool remains free and accessible for all German IT students! 🇩🇪

## 🙏 Acknowledgments

-   **IHK Standards**: Based on official German IT certification requirements
-   **RFC Standards**: IPv4 (RFC 791) and IPv6 (RFC 8200, RFC 5952) compliance
-   **Educational Focus**: Designed for practical exam preparation

---

**Made with ❤️ for German IT Students**
