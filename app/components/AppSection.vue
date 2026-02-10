<script lang="ts" setup>
const props = defineProps({
    tag: {
        type: String,
        default: 'section'
    },
    padding: {
        type: String,
        default: 'py-12 lg:py-16 xl:py-24',
    },
    spacing: {
        type: String,
        default: 'space-y-12 lg:space-y-16 xl:space-y-24',
    },
    container: {
        type: Boolean,
        default: true,
    },
    heading: {
        type: String,
        default: null,
    },
});
</script>

<template>
    <component :is="props.tag" :class="props.padding">
        <div v-if="props.container" :class="`max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 ${props.spacing}`">
            <AppHeading v-if="props.heading" tag="h2" class="text-[clamp(2.5rem,7dvw,5rem)] text-center">{{ props.heading }}</AppHeading>
            <slot />
        </div>

        <template v-else>
            <AppHeading v-if="props.heading" tag="h2" class="text-[clamp(2.5rem,7dvw,5rem)] text-center">{{ props.heading }}</AppHeading>
            <slot />
        </template>
    </component>
</template>