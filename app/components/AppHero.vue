<script lang="ts" setup>
import type { Application } from '~/types';

const slots = useSlots();
const config = useAppConfig();
const props = defineProps<{scrollTarget?: string, application?: Application | null}>();
const { setProfile, profile, birthdate, mapLink, email, emailLabel, phone, phoneLabel, github } = useProfile();

onMounted(() => {
    setProfile(config.profile);
});
</script>

<template>
    <AppSection class="relative min-h-lvh flex flex-col justify-center items-center" spacing="">
        <div class="max-w-md mx-auto space-y-8 text-center">
            <AppAvatar class="size-26 border-5 mx-auto" />

            <div class="space-y-3">
                <AppHeading class="font-sans font-light text-[clamp(1rem,2dvw,1.2rem)]">
                    Moin, mein Name ist
                </AppHeading>

                <AppHeading tag="h1" class="font-bold text-[clamp(2.5rem,4dvw,3rem)] leading-none! text-primary">
                    {{ profile.name }}
                </AppHeading>

                <slot />
            </div>

            <nav class="space-y-2">
                <div v-if="profile.location" class="flex items-center gap-2 text-sm">
                    <span class="inline-flex items-center gap-1"><Icon name="ph:map-pin-area-duotone" /> Wohnort</span>
                    <span class="grow border-b border-dashed border-zinc-500"></span>
                    <span v-if="!mapLink">{{ profile.location }}</span>
                    <a :href="mapLink" target="_blank" rel="noopener" v-else>{{ profile.location }}</a>
                </div>

                <div v-if="birthdate" class="flex items-center gap-2 text-sm">
                    <span class="inline-flex items-center gap-1"><Icon name="ph:cake-duotone" /> Geburtsdatum</span>
                    <span class="grow border-b border-dashed border-zinc-500"></span>
                    <span>{{ birthdate }}</span>
                </div>

                <div v-if="emailLabel" class="flex items-center gap-2 text-sm">
                    <span class="inline-flex items-center gap-1"><Icon name="ph:at-duotone" /> E-Mail</span>
                    <span class="grow border-b border-dashed border-zinc-500"></span>
                    <a @click="email" class="cursor-pointer">{{ emailLabel }}</a>
                </div>

                <div v-if="phoneLabel" class="flex items-center gap-2 text-sm">
                    <span class="inline-flex items-center gap-1"><Icon name="ph:phone-duotone" /> Telefon</span>
                    <span class="grow border-b border-dashed border-zinc-500"></span>
                    <a @click="phone" class="cursor-pointer">{{ phoneLabel }}</a>
                </div>

                <div v-if="github" class="flex items-center gap-2 text-sm">
                    <span class="inline-flex items-center gap-1"><Icon name="ph:github-logo-duotone" /> GitHub</span>
                    <span class="grow border-b border-dashed border-zinc-500"></span>
                    <a :href="github" target="_blank" rel="noopener">{{ github.replace('https://github.com/', '@') }}</a>
                </div>
            </nav>
        </div>

        <a v-if="props.scrollTarget" :href="'#' + props.scrollTarget" role="button" class="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 no-hover">
            <svg class="stroke-current opacity-30 w-12 p-2 -m-2 h-auto stroke-[0.04em] animate-bounce" viewBox="0 0 29.712 8.8547" xmlns="http://www.w3.org/2000/svg">
                <path d="m29.476 0.44055-14.62 7.8467-14.62-7.8467" fill="none" stroke="currentColor" />
            </svg>
        </a>
    </AppSection>
</template>