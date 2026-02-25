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
        default: 'space-y-8 lg:space-y-12',
    },
    container: {
        type: Boolean,
        default: true,
    },
    heading: {
        type: String,
        default: null,
    },
    scrollTarget: {
        type: String,
        default: null,
    }
});
</script>

<template>
    <component :is="props.tag" :class="props.padding">
        <div v-if="props.container" :class="`max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-24 ${props.spacing}`">
            <AppHeading v-if="props.heading" tag="h2" class="text-[clamp(2.5rem,7dvw,5rem)] text-center">{{ props.heading }}</AppHeading>
            <slot />
        </div>

        <template v-else>
            <AppHeading v-if="props.heading" tag="h2" class="text-[clamp(2.5rem,7dvw,5rem)] text-center">{{ props.heading }}</AppHeading>
            <slot />
        </template>

        <a v-if="props.scrollTarget" :href="'#' + props.scrollTarget" role="button" class="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 no-hover">
            <svg class="stroke-current opacity-30 w-12 p-2 -m-2 h-auto stroke-[0.04em] animate-bounce" viewBox="0 0 29.712 8.8547" xmlns="http://www.w3.org/2000/svg">
                <path d="m29.476 0.44055-14.62 7.8467-14.62-7.8467" fill="none" stroke="currentColor" />
            </svg>
        </a>
    </component>
</template>