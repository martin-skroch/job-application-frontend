<script lang="ts" setup>
const props = defineProps<{
    email?: string,
    phone?: string,
}>();
</script>

<style scoped>
@reference '../assets/css/main.css';

a {
    @apply flex items-center gap-1.5 cursor-pointer;
}

a:hover {
    @apply text-primary;
}
</style>

<template>
    <nav class="flex items-center justify-end gap-8 text-sm tracking-widest">
        <!-- <NuxtLink :to="{ name: 'test' }">Test</NuxtLink> -->

        <a href="https://github.com/martin-skroch" target="_blank" rel="noopener" title="Mein Profil auf GitHub">
            <Icon name="ph:github-logo-duotone" /> GitHub
        </a>

        <a v-if="props.phone" :href="'tel:' + props.phone" title="Ruf gerne durch">
            <Icon name="ph:phone-duotone" /> Telefon
        </a>

        <a v-if="props.email" :href="'mailto:' + props.email" title="Schreib mir gerne">
            <Icon name="ph:at-duotone" /> E-Mail
        </a>
    </nav>
</template>