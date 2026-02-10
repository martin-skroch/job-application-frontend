<script lang="ts" setup>
const { profile, email, phone, github } = useProfile();
</script>

<style scoped>
@reference '../assets/css/main.css';

nav a,
nav button {
    @apply transition-colors inline-flex items-center gap-1.5 leading-none cursor-pointer whitespace-nowrap rounded-md py-2 px-3;
}

nav a:hover,
nav button:hover {
    @apply bg-primary text-secondary;
}
</style>

<template>
    <nav class="inline-flex flex-wrap items-center justify-center gap-2 lg:gap-4 text-base">
        <button v-if="profile.email" @click="email" title="Schreibe mir eine E-Mail">
            <Icon name="ph:at-duotone" /> E-Mail
        </button>

        <button v-if="profile.phone" @click="phone" title="Ruf mich gerne an">
            <Icon name="ph:phone-duotone" /> Phone
        </button>

        <a v-if="github" class="no-hover" :href="github" target="_blank" rel="noopener" title="Mein Profil auf GitHub">
            <Icon name="ph:github-logo-duotone" /> GitHub
        </a>
    </nav>
</template>