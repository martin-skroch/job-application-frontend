<script lang="ts" setup>
import type { Application } from '~/types';

const { profile } = useProfile();

const slots = useSlots();

const props = defineProps<{
    scrollTarget?: string,
    application?: Application | null
}>();
</script>

<template>
    <AppSection id="einleitung" class="min-h-dvh flex flex-col justify-center items-center relative" spacing="">
        <div class="text-center space-y-6">
            <AppAvatar class="shrink-0 size-32 border-6 mx-auto" />

            <div>
                <AppHeading tag="h1" class="font-bold text-2xl md:text-4xl text-primary">{{ profile.name }}</AppHeading>
                <AppHeading tag="h2" class="font-light text-lg md:text-2xl" v-if="props.application?.title">Bewerbung als {{ props.application?.title }}</AppHeading>
            </div>

            <!-- <div v-if="slots.default" class="max-w-xl font-display text-lg space-y-6 bg-white/5 shadow-2xl rounded-md p-5">
                <slot />
            </div> -->

            <AppMetaNavigation />
        </div>

        <a v-if="props.scrollTarget" :href="'#' + props.scrollTarget" role="button" class="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 no-hover">
            <svg class="stroke-current opacity-30 w-12 p-2 -m-2 h-auto stroke-[0.04em] animate-bounce" viewBox="0 0 29.712 8.8547" xmlns="http://www.w3.org/2000/svg">
                <path d="m29.476 0.44055-14.62 7.8467-14.62-7.8467" fill="none" stroke="currentColor" />
            </svg>
        </a>
    </AppSection>
</template>