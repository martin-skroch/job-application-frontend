import tailwindcss from "@tailwindcss/vite";

const siteUrl = process.env.NUXT_SITE_URL || ''

const title = 'Martin Skroch - Full Stack Web Developer';
const description = 'Erfahrener Entwickler mit Fokus auf PHP und Laravel sowie fundierten Kenntnissen in JavaScript, Vue.js und Tailwind CSS – spezialisiert auf moderne, performante Webanwendungen vom Backend bis zum Frontend.';

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
            title: title,
            meta: [
                { property: 'og:type', content: 'website' },
                { property: 'og:locale', content: 'de_DE' },
                { property: 'og:title', content: title },
                { property: 'og:image', content: `${siteUrl}/images/og-image.webp` },
                { property: 'og:description', content: description },
                { name: 'description', content: description },
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