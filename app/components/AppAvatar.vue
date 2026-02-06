<script lang="ts" setup>
const props = defineProps<{
    image: string,
    name: string,
}>();
</script>

<template>
    <img :src="image" :alt="'Profilfoto von ' + name" class="inline rounded-full border-[0.1rem] border-primary object-cover" />
</template>