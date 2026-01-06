<script setup lang="ts">
    const links = [
        {
            label: 'Start',
            to: {name: 'index'},
        },
        {
            label: 'Werdegang',
            to: {name: 'career'},
        },
        {
            label: 'Fähigkeiten',
            to: {name: 'skills'},
        },
        {
            label: 'Kontakt',
            to: {name: 'contact'},
        },
    ];
</script>

<style scoped>
@reference "../assets/css/main.css";

.router-link-active {
    @apply text-primary;
}
</style>

<template>
    <nav>
        <ul class="list-none flex gap-4 p-0">
            <li v-for="link in links" v-bind:key="link.label">
                <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
            </li>
        </ul>
    </nav>
</template>