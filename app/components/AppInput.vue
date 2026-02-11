<script lang="ts" setup>
import { Field, ErrorMessage } from 'vee-validate';

const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    name: {
        type: String,
        default: null
    },
    label: {
        type: String,
        default: null
    },
    value: {
        type: String,
        default: null
    },
});

const model = defineModel<string | null>({
    type: String,
    default: null,
});
</script>

<template>
    <div class="space-y-1">
        <label class="flex text-xs font-medium" :for="props.name">{{ props.label }}</label>
        <Field class="flex w-full outline-0 transition-all bg-secondary/85 text-white/50 focus:bg-secondary focus:text-white rounded-md text-sm py-3 px-4" :id="props.name" :type="props.type" :name="props.name" :value="props.value" />
        <ErrorMessage :name="props.name" />
    </div>
</template>