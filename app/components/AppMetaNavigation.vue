<script lang="ts" setup>
const { profile, email, phone } = useProfile();
</script>

<style scoped>
@reference '../assets/css/main.css';

a,
.as-link {
    @apply p-1;
}

a:not(:hover),
.as-link:not(:hover) {
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

        <button class="as-link" v-if="profile.phone" @click="phone" title="Ruf gerne durch">
            <Icon name="ph:phone-duotone" />
            <span class="max-md:sr-only">Telefon</span>
        </button>

        <button class="as-link" v-if="profile.email" @click="email" title="Schreib mir gerne">
            <Icon name="ph:at-duotone" />
            <span class="max-md:sr-only">E-Mail</span>
        </button>
    </nav>
</template>