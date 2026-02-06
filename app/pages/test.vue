<script setup lang="ts">
const { isUlid } = useUlid();
</script>

<template>
    <AppSection>
        <AppHeading level="1">Test</AppHeading>

        <div class="space-y-4">
            <p v-if="isUlid()" class="text-green-600">✓ Du bist autorisiert!</p>
            <p v-else class="text-red-600">✗ Du bist nicht autorisiert.</p>

            <NuxtLink :to="{name: 'index'}">&laquo; Startseite</NuxtLink>
        </div>
    </AppSection>
</template>