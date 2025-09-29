// Mobile Performance Utils
export const mobileUtils = {
    // Debounce function for input handling
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if device is mobile
    isMobile: () => {
        return (
            window.innerWidth <= 768 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        );
    },

    // Check if device has touch capability
    isTouchDevice: () => {
        return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    },

    // Optimize for mobile performance
    optimizeForMobile: () => {
        if (mobileUtils.isMobile()) {
            // Disable hover effects on touch devices
            if (mobileUtils.isTouchDevice()) {
                document.body.classList.add("touch-device");
            }

            // Add mobile-specific optimizations
            document.body.classList.add("mobile-device");
        }
    },

    // Handle device orientation change
    handleOrientationChange: () => {
        setTimeout(() => {
            window.scrollTo(0, 1); // Hide address bar on mobile
        }, 100);
    },

    // Prevent zoom on double tap for specific elements
    preventZoom: (element) => {
        let lastTouchEnd = 0;
        element.addEventListener(
            "touchend",
            (e) => {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            },
            false
        );
    },
};

// Initialize mobile optimizations
if (typeof window !== "undefined") {
    // Run on load
    window.addEventListener("load", mobileUtils.optimizeForMobile);

    // Run on orientation change
    window.addEventListener(
        "orientationchange",
        mobileUtils.handleOrientationChange
    );

    // Handle iOS viewport issues
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                window.scrollTo(0, 1);
            }, 0);
        });
    }
}
