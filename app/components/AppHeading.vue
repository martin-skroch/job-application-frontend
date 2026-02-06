<script lang="ts" setup>
const props = defineProps({
    tag: {
        type: String,
        default: 'div'
    },
})
</script>

<template>
    <component :is="props.tag" class="font-display">
        <slot />
    </component>
</template>