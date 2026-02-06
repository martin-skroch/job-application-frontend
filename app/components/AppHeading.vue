<script lang="ts" setup>
const props = defineProps({
    level: {
        type: [Number, String],
        default: 1,
    }
})
</script>

<template>
    <component :is="'h' + props.level" class="font-serif ">
        <slot />
    </component>
</template>