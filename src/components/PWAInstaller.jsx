import { useEffect, useState } from "react";
import "../styles/PWAInstaller.css";

const PWAInstaller = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstall, setShowInstall] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstall(true);
        };

        const handleAppInstalled = () => {
            setShowInstall(false);
            setDeferredPrompt(null);
            console.log("PWA installed successfully!");
        };

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
    };

    if (!showInstall) return null;

    return (
        <div className="pwa-install-prompt">
            <div className="install-content">
                <span className="install-icon">📱</span>
                <span className="install-text">Install App</span>
                <button onClick={handleInstallClick} className="install-button">
                    Install
                </button>
                <button onClick={handleCloseClick} className="install-close">
                    ×
                </button>
            </div>
        </div>
    );
};

export default PWAInstaller;
