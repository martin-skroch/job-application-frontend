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
    <AppSection class="relative min-h-svh flex flex-col justify-center items-center" :scroll-target="props.scrollTarget" spacing="">
        <div class="max-w-md mx-auto space-y-8 text-center">
            <AppAvatar class="size-26 border-5 mx-auto" />

            <div class="space-y-6">
                <AppHeading class="font-sans font-light text-[clamp(1rem,2dvw,1.2rem)]">
                    Hallo, ich bin
                </AppHeading>

                <AppHeading tag="h1" class="font-bold text-[clamp(2.5rem,4dvw,3rem)] leading-none! text-primary">
                    {{ profile.name }}
                </AppHeading>

                <slot />
            </div>

            <nav class="space-y-2">
                <div v-if="profile.location" class="flex items-center gap-2 text-sm">
                    <span class="inline-flex items-center gap-1"><Icon name="ph:map-pin-area-duotone" /> Wohnort</span>
                    <span class="grow border-b border-dashed border-current/50"></span>
                    <span v-if="!mapLink">{{ profile.location }}</span>
                    <a :href="mapLink" target="_blank" rel="noopener" v-else>{{ profile.location }}</a>
                </div>

                <div v-if="birthdate" class="flex items-center gap-2 text-sm">
                    <span class="inline-flex items-center gap-1"><Icon name="ph:cake-duotone" /> Geburtsdatum</span>
                    <span class="grow border-b border-dashed border-current/50"></span>
                    <span>{{ birthdate }}</span>
                </div>

                <div v-if="emailLabel" class="flex items-center gap-2 text-sm">
                    <span class="inline-flex items-center gap-1"><Icon name="ph:at-duotone" /> E-Mail</span>
                    <span class="grow border-b border-dashed border-current/50"></span>
                    <button @click.prevent.stop="email" class="as-link">{{ emailLabel }}</button>
                </div>

                <div v-if="phoneLabel" class="flex items-center gap-2 text-sm">
                    <span class="inline-flex items-center gap-1"><Icon name="ph:phone-duotone" /> Telefon</span>
                    <span class="grow border-b border-dashed border-current/50"></span>
                    <button @click.prevent.stop="phone" class="as-link">{{ phoneLabel }}</button>
                </div>

                <div v-if="github" class="flex items-center gap-2 text-sm">
                    <span class="inline-flex items-center gap-1"><Icon name="ph:github-logo-duotone" /> GitHub</span>
                    <span class="grow border-b border-dashed border-current/50"></span>
                    <a :href="github" target="_blank" rel="noopener">{{ github.replace('https://github.com/', '@') }}</a>
                </div>
            </nav>
        </div>
    </AppSection>
</template>