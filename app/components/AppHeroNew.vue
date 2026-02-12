<script lang="ts" setup>
import type { Application } from '~/types';

const { profile } = useProfile();

const slots = useSlots();
const title = ref<string>();
const props = defineProps<{
    scrollTarget?: string,
    application?: Application | null
}>();

if (props.application?.title) {
    title.value = 'Bewerbung als ' + props.application.title;
} else {
    title.value = 'Full Stack Web Developer';
}

</script>

<template>
    <AppSection id="einleitung" class="min-h-dvh flex flex-col justify-center items-center relative" spacing="">
        <div class="text-center space-y-5">
            <AppAvatar class="shrink-0 size-26 border-5 mx-auto" />

            <div class="flex flex-col items-center gap-2">
                <AppHeading tag="h1" class="font-bold text-2xl md:text-4xl leading-none! text-primary">{{ profile.name }}</AppHeading>

                <div v-if="profile.address || profile.post_code || profile.location" class="lg:inline-flex flex-wrap items-center gap-1.5 text-sm">
                    <Icon name="ph:map-trifold-duotone" class="max-lg:sr-only" /> <span>{{ profile.address }}<span class="max-lg:sr-only">, </span><br class="lg:hidden">{{ profile.post_code }} {{ profile.location }}</span>
                </div>
            </div>

            <AppHeading tag="h2" class="font-light text-lg md:text-2xl lg:text-3xl" v-if="title">{{ title }}</AppHeading>

            <!-- <div v-if="slots.default" class="max-w-xl font-display text-base space-y-6 bg-white/5 shadow-2xl rounded-md p-4">
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