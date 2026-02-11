<script lang="ts" setup>
const profile = useAppConfig().profile;
</script>

<template>
    <img :src="profile.image" :alt="'Profilfoto von ' + profile.name" loading="lazy" class="inline-flex rounded-full border-primary aspect-square object-cover" />
</template>