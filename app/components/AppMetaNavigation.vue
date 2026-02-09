<script lang="ts" setup>
const profile = useAppConfig().profile;
</script>

<style scoped>
@reference '../assets/css/main.css';

a {
    @apply p-1;
}

a:not(:hover) {
    @apply border-transparent;
}
</style>

<template>
    <nav class="flex items-center justify-end gap-6 text-sm tracking-widest">
        <!-- <NuxtLink :to="{ name: 'test' }">Test</NuxtLink> -->

        <a href="https://github.com/martin-skroch" target="_blank" rel="noopener" title="Mein Profil auf GitHub">
            <Icon name="ph:github-logo-duotone" />
            <span class="max-md:sr-only">GitHub</span>
        </a>

        <a v-if="profile.phone" :href="'tel:' + profile.phone" title="Ruf gerne durch">
            <Icon name="ph:phone-duotone" />
            <span class="max-md:sr-only">Telefon</span>
        </a>

        <a v-if="profile.email" :href="'mailto:' + profile.email" title="Schreib mir gerne">
            <Icon name="ph:at-duotone" />
            <span class="max-md:sr-only">E-Mail</span>
        </a>
    </nav>
</template>