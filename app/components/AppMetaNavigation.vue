<script lang="ts" setup>
import type { Profile } from '~/types';

const props = defineProps<{profile?: Profile}>();
</script>

<style scoped>
@reference '../assets/css/main.css';

a {
    @apply flex items-center gap-1.5 cursor-pointer hover:text-primary;
}
</style>

<template>
    <nav class="flex items-center justify-end gap-8 font-serif text-sm tracking-widest">
        <!-- <NuxtLink :to="{ name: 'test' }">
            Test
        </NuxtLink> -->

        <a href="https://github.com/martin-skroch" target="_blank" rel="noopener" title="Mein Profil auf GitHub">
            <Icon name="ph:github-logo-thin" /> GitHub
        </a>

        <a v-if="props.profile?.phone" :href="'tel:' + props.profile.phone">
            <Icon name="ph:phone-thin" /> Telefon
        </a>

        <a v-if="props.profile?.email" :href="'mailto:' + props.profile.email">
            <Icon name="ph:at-thin" /> E-Mail
        </a>
    </nav>
</template>