<script lang="ts" setup>
import type { Impression } from '~/types';

const props = defineProps<{ impression: Impression }>();
</script>

<template>
    <div v-bind:key="impression.id" class="group flex max-md:flex-col md:items-center md:even:flex-row-reverse gap-8 md:gap-16">
        <div class="md:w-2/6">
            <AppImage :src="impression.image" :alt="impression.title" class="text-primary" />
        </div>
        <div class="md:w-4/6 group-even:text-end space-y-4">
            <AppHeading tag="h3" v-if="impression.title" class="text-[clamp(1.6rem,5dvw,2.5rem)] leading-tight text-primary font-bold">{{ impression.title }}</AppHeading>
            <p class="text-[clamp(1rem,3dvw,1.2rem)] leading-normal">{{ impression.description }}</p>
        </div>
    </div>
</template>