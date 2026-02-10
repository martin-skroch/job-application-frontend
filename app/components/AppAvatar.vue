<script lang="ts" setup>
const profile = useAppConfig().profile;
</script>

<template>
    <img :src="profile.image" :alt="'Profilfoto von ' + profile.name" class="inline-block rounded-full border-primary aspect-square object-cover" />
</template>