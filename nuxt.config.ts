import tailwindcss from "@tailwindcss/vite";

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
            // title: 'Martin Skroch - Full Stack Web Developer',
            meta: [
                { property: 'og:type', content: 'website' },
                { property: 'og:locale', content: 'de_DE' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:site', content: '@martin_skroch' },
                { name: 'twitter:creator', content: '@martin_skroch' },
            ],
            link: [
                { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'icon', type: 'image/png', href: '/favicon.png' },
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