import tailwindcss from "@tailwindcss/vite";

const siteUrl = process.env.NUXT_SITE_URL || ''

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: false },
    ssr: false,

    runtimeConfig: {
        public: {
            apiUrl: '',
            apiKey: '',
        }
    },

    app: {
        head: {
            htmlAttrs: {
                lang: 'de',
                prefix: 'og: http://ogp.me/ns#',
             },
            title: 'Martin Skroch - Full Stack Web Developer',
            meta: [
                { property: 'og:type', content: 'website' },
                { property: 'og:locale', content: 'de_DE' },
                { property: 'og:title', content: 'Martin Skroch - Full Stack Web Developer' },
                { property: 'og:image', content: `${siteUrl}/images/og-image.webp` },
                { property: 'og:description', content: 'Full Stack Web Developer mit Erfahrung in PHP, Laravel, JavaScript, Vue.js, Tailwind CSS.' },
            ],
            link: [
                { rel: 'shortcut icon', type: 'image/x-icon', href: `${siteUrl}/favicon.ico` },
                { rel: 'icon', type: 'image/png', href: `${siteUrl}/favicon.png` },
            ]
        },
    },

    css: [
        './app/assets/css/main.css'
    ],

    modules: [
        '@nuxt/icon',
    ],

    vite: {
        plugins: [
            tailwindcss()
        ],
    },
})