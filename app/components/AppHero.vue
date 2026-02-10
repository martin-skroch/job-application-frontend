<script lang="ts" setup>
import type { Application } from '~/types';

const props = defineProps<{application?: Application | null}>()

const { id } = useApplication();
const { profile } = useProfile();
</script>

<template>
    <AppSection id="einleitung" class="min-h-dvh flex flex-col justify-center items-center relative" spacing="">
        <div class="text-center space-y-8">
            <AppAvatar class="shrink-0 size-32 border-6 mx-auto" />

            <div>
                <AppHeading tag="div" class="font-light md:text-lg">Moin, mein Name ist</AppHeading>
                <AppHeading tag="h1" class="font-bold text-4xl md:text-5xl text-primary">{{ profile.name }}</AppHeading>
                <AppHeading tag="h2" class="font-light text-xl md:text-2xl">Full Stack Web Developer</AppHeading>
            </div>

            <p class="max-w-lg" v-if="application?.text">{{ application.text }}</p>
            <p class="max-w-lg" v-else>Assumenda, quibusdam sequi dolorem aperiam laboriosam provident odit praesentium odio necessitatibus natus ducimus magnam animi.</p>

            <AppMetaNavigation />
        </div>

        <a v-if="id" href="#werdegang" role="button" class="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 no-hover">
            <svg class="stroke-current opacity-30 w-12 p-2 -m-2 h-auto stroke-[0.04em] animate-bounce" viewBox="0 0 29.712 8.8547" xmlns="http://www.w3.org/2000/svg">
                <path d="m29.476 0.44055-14.62 7.8467-14.62-7.8467" fill="none" stroke="currentColor" />
            </svg>
        </a>
    </AppSection>
</template>