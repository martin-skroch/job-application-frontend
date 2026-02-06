<script lang="ts" setup>
    const links = [
        {
            label: 'Start',
            to: {name: 'index'},
        },
    ];
</script>

<template>
    <AppSection tag="header">
        <nav>
            <ul class="list-none flex gap-4 p-0">
                <li v-for="link in links" v-bind:key="link.label">
                    <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </AppSection>
</template>