<script lang="ts" setup>
const props = defineProps<{name?: string}>();
</script>

<template>
    <img src="~/assets/images/profile-image.webp" :alt="'Profilfoto von ' + name" class="inline rounded-full border-[0.1rem] border-primary object-cover" />
</template>