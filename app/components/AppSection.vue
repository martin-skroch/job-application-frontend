<script lang="ts" setup>
const props = defineProps({
    tag: {
        type: String,
        default: 'section'
    },
    padding: {
        type: String,
        default: 'py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20',
    },
    spacing: {
        type: String,
        default: 'space-y-8 lg:space-y-16 xl:space-y-24',
    },
    container: {
        type: Boolean,
        default: true,
    }
});
</script>

<template>
    <component :is="props.tag" :class="props.padding">
        <div :class="`max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 ${props.spacing}`" v-if="props.container">
            <slot />
        </div>

        <template v-else>
            <slot />
        </template>
    </component>
</template>