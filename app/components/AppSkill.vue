<script lang="ts" setup>
import type { Skill } from '~/types';

const props = defineProps<{skill: Skill}>();
</script>

<template>
    <div v-if="skill.rating > 0" class="flex items-center gap-4 text-current whitespace-nowrap">
        <h3 class="flex items-center gap-2">
            {{ props.skill.name }}
            <span v-if="props.skill.info" class="text-xs opacity-60">({{ props.skill.info }})</span>
        </h3>

        <div class="grow h-0 border-b-2 border-dotted border-current opacity-40"></div>

        <div class="flex gap-2" :title="props.skill.rating + ' von ' + 6">
            <span v-for="index in 6" class="size-2.5 lg:size-3 rounded-full bg-current" :class="{'opacity-25': index > props.skill.rating}">
                <span class="sr-only">{{ index }}</span>
            </span>
        </div>
    </div>
</template>