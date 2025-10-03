import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/PWAInstaller.css";

const PWAInstaller = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstall, setShowInstall] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setIsIOS(iOS);

        const standalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone ||
            document.referrer.includes("android-app://");
        setIsInStandaloneMode(standalone);

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            if (!iOS && !standalone) {
                setShowInstall(true);
            }
        };

        const handleAppInstalled = () => {
            setShowInstall(false);
            setDeferredPrompt(null);
            console.log("PWA installed successfully!");
        };

        if (iOS && !standalone) {
            const hasSeenIOSPrompt = localStorage.getItem(
                "ios-pwa-prompt-seen"
            );
            if (!hasSeenIOSPrompt) {
                setTimeout(() => setShowInstall(true), 3000);
            }
        }

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === "accepted") {
                setShowInstall(false);
            }
            setDeferredPrompt(null);
        }
    };

    const handleCloseClick = () => {
        setShowInstall(false);
        if (isIOS) {
            localStorage.setItem("ios-pwa-prompt-seen", "true");
        }
    };

    if (!showInstall || isInStandaloneMode) return null;

    if (isIOS) {
        return (
            <div className="pwa-install-prompt ios-prompt">
                <div className="install-content">
                    <div className="ios-install-header">
                        <span className="install-icon">📱</span>
                        <h3>{t("pwaInstaller.iosTitle")}</h3>
                        <button
                            onClick={handleCloseClick}
                            className="install-close"
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>
                    <div className="ios-install-steps">
                        <p>{t("pwaInstaller.iosDescription")}</p>
                        <ol>
                            <li>
                                <span className="step-icon">📤</span>
                                <span className="step-text">
                                    {t("pwaInstaller.iosStep1")}
                                </span>
                            </li>
                            <li>
                                <span className="step-icon">➕</span>
                                <span className="step-text">
                                    {t("pwaInstaller.iosStep2")}
                                </span>
                            </li>
                            <li>
                                <span className="step-icon">✅</span>
                                <span className="step-text">
                                    {t("pwaInstaller.iosStep3")}
                                </span>
                            </li>
                        </ol>
                        <div className="ios-note">
                            <small>{t("pwaInstaller.iosNote")}</small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pwa-install-prompt">
            <div className="install-content">
                <span className="install-icon">📱</span>
                <span className="install-text">
                    {t("pwaInstaller.installApp")}
                </span>
                <button onClick={handleInstallClick} className="install-button">
                    {t("pwaInstaller.install")}
                </button>
                <button onClick={handleCloseClick} className="install-close">
                    ×
                </button>
            </div>
        </div>
    );
};

export default PWAInstaller;
