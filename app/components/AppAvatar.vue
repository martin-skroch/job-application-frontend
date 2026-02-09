<script lang="ts" setup>
const profile = useAppConfig().profile;
</script>

<template>
    <img :src="profile.image" :alt="'Profilfoto von ' + profile.name" class="inline rounded-full border-[0.1rem] border-primary object-cover" />
</template>