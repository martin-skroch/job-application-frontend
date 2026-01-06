import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: false },

    app: {
        head: {
            htmlAttrs: { lang: 'de' },
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
                { rel: 'preconnect', href: 'https://fonts.bunny.net' },
                { rel: 'stylesheet', href: 'https://fonts.bunny.net/css?family=alexandria:100,200,300,400,500,600,700,800,900|bellefair:400|cormorant-infant:300,300i,400,400i,500,500i,600,600i,700,700i|josefin-slab:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i' },
            ],
        },
    },

    css: ['./app/assets/css/main.css'],

    vite: {
        plugins: [tailwindcss()],
    },

    modules: ['@nuxt/icon'],
})