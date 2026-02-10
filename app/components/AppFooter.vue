<template>
    <AppSection tag="footer" class="bg-secondary border-t border-zinc-800">
        <div class="flex flex-col gap-4">
            <AppMetaNavigation />

            <div class="inline-flex flex-wrap items-center justify-center gap-3 text-xl">
                <span class="text-sm text-zinc-500">Verwendete Technologien:</span>

                <a href="https://laravel.com" target="_blank" rel="noopener" class="no-hover" title="Laravel - The PHP Framework For Web Artisans">
                    <Icon name="skill-icons:laravel-dark" />
                </a>

                <a href="https://vuejs.org" target="_blank" rel="noopener" class="no-hover" title="Vue.js - The Progressive JavaScript Framework">
                    <Icon name="skill-icons:vuejs-dark" />
                </a>

                <a href="https://tailwindcss.com" target="_blank" rel="noopener" class="no-hover" title="Tailwind CSS - A utility-first CSS framework">
                    <Icon name="skill-icons:tailwindcss-dark" />
                </a>
            </div>
        </div>
    </AppSection>
</template>