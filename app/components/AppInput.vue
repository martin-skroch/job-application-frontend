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
        <label class="block text-xs font-medium" :for="props.name">{{ props.label }}</label>
        <Field class="block w-full outline-0 transition-all border border-current/85 not-focus:bg-current/10 text-sm rounded-md py-2.5 px-3" :id="props.name" :type="props.type" :name="props.name" :value="props.value" />
        <ErrorMessage :name="props.name" class="text-xs text-red-800" />
    </div>
</template>