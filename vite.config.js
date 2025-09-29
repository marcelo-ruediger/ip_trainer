import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg}"],
            },
            includeAssets: ["src/images/ip_icon_138457.png"],
            manifest: {
                name: "IP Trainer - Netzwerktrainer",
                short_name: "IP Trainer",
                description:
                    "Learn IPv4 and IPv6 subnetting with interactive exercises. Perfect for IT students and network professionals.",
                theme_color: "#646cff",
                background_color: "#242424",
                display: "standalone",
                orientation: "portrait-primary",
                scope: "/",
                start_url: "/",
                categories: ["education", "utilities"],
                lang: "de",
                dir: "ltr",
                prefer_related_applications: false,
                icons: [
                    {
                        src: "src/images/ip_icon_138457.png",
                        sizes: "138x138",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "src/images/ip_icon_138457.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                    {
                        src: "src/images/ip_icon_138457.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },
            devOptions: {
                enabled: true,
            },
        }),
    ],
    base: "/ip_trainer/",
});
