<script lang="ts" setup>
import type { Application, Profile } from '~/types'

definePageMeta({middleware: ['id']});

const { profile, setProfile, email, phone, github } = useProfile();
const { apiUrl, apiKey } = useRuntimeConfig().public;
const { id, isId, deleteId } = useId();
const router = useRouter();

const application = ref<Application | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

watch(loading, (loading) => {
    if (import.meta.client) {
        document.body.style.overflow = loading ? 'hidden' : '';
    }
});

onMounted(async () => {
    if (!isId()) {
        error.value = 'The job application could not be loaded.';
        return;
    }

    loading.value = true;

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
    };

    const options = {
        baseURL: apiUrl,
        headers: headers,
    };

    try {
        application.value = await $fetch(`api/application/${id.value}`, options);

        if (application.value !== null) {
            setProfile(application.value.profile);
        }

    } catch (e) {
        error.value = e instanceof Error ? e.message : `The job application could not be loaded: ${id.value}`;

        await router.replace('/');
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>

<template>
    <Transition name="fade">
        <div v-if="loading" class="flex items-center justify-center fixed inset-0 bg-zinc-950 text-zinc-500 z-999">
            <div class="border border-b-transparent size-7 rounded-full animate-spin"></div>
        </div>
    </Transition>

    <div v-if="!loading">
        <AppSection id="einleitung" class="min-h-dvh flex flex-col justify-center items-center relative" spacing="">
            <div class="text-center space-y-8">
                <AppAvatar class="shrink-0 size-32 border-6 mx-auto" />

                <div>
                    <AppHeading tag="div" class="font-light md:text-lg">Moin, mein Name ist</AppHeading>
                    <AppHeading tag="h1" class="font-bold text-4xl md:text-5xl">{{ profile.name }}</AppHeading>
                    <AppHeading tag="h1" class="font-light text-xl md:text-2xl">Full Stack Web Developer</AppHeading>
                </div>

                <p class="max-w-lg">Exercitationem, illum laboriosam accusantium obcaecati voluptates blanditiis totam, vero voluptate asperiores, veritatis qui.</p>

                <nav class="inline-flex items-center gap-8 text-base">
                    <a class="gap-2 no-hover" :href="github" target="_blank" rel="noopener">
                        <Icon name="ph:github-logo-duotone" /> GitHub
                    </a>

                    <button class="as-link flex items-center gap-2 no-hover" @click="email">
                        <Icon name="ph:at-duotone" /> E-Mail
                    </button>

                    <button class="as-link flex items-center gap-2 no-hover" @click="phone">
                        <Icon name="ph:phone-duotone" /> Phone
                    </button>
                </nav>
            </div>

            <a href="#werdegang" role="button" class="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 no-hover">
                <svg class="stroke-current opacity-30 w-12 p-2 -m-2 h-auto stroke-[0.04em] animate-bounce" viewBox="0 0 29.712 8.8547" xmlns="http://www.w3.org/2000/svg">
                    <path d="m29.476 0.44055-14.62 7.8467-14.62-7.8467" fill="none" stroke="currentColor" />
                </svg>
            </a>

            <!-- <div class="bg-black/30 rounded-full max-w-4xl p-4 grid grid-cols-4 gap-3">
                <AppAvatar class="col-span-1" />

                <div class="col-span-3 flex flex-col justify-center gap-3 p-4">
                    <AppHeading tag="h1" class="font-bold text-7xl leading-none!">{{ profile.name }}</AppHeading>

                    <div class="flex gap-4">
                        <AppHeading tag="div" class="font-light text-3xl leading-none">{{ profile.age }} Jahre</AppHeading>
                        <span class="text-4xl leading-none">&bull;</span>
                        <AppHeading tag="h2" class="font-light text-3xl leading-none">Full Stack Web Developer</AppHeading>
                    </div>

                    <nav class="flex gap-4 items-center text-sm leading-none">
                        <a :href="github" target="_blank" rel="noopener">
                            <Icon name="ph:github-logo-duotone" /> GitHub
                        </a>

                        <a href="#" v-bind:click.prevent="profile.email">
                            <Icon name="ph:at-duotone" /> E-Mail
                        </a>

                        <button class="as-link">
                            <Icon name="ph:question-duotone" /> Bewerbung anfordern
                        </button>
                    </nav>
                </div>
            </div> -->
        </AppSection>

        <AppHero v-if="false" id="einleitung" class="min-h-dvh flex flex-col justify-end relative">
            <AppHeading class="font-bold text-[clamp(7rem,20dvw,16rem)] leading-none text-primary/30">Moin</AppHeading>

            <div class="font-display text-[clamp(1.5rem,3dvw,1.875rem)] leading-normal -mt-[clamp(4.5rem,11dvw,9rem)]">
                <p>
                    Mein Name ist {{ profile.name }}<template v-if="application?.profile.age">, ich bin {{ application?.profile.age }} Jahre alt</template>
                    und <template v-if="!application?.profile.age">ich</template> brenne für die Technologien des Internets.
                    Wirf einen Blick auf meinen <a href="#werdegang">Werdegang</a>, wenn du wissen möchtest, wie sich diese Leidenschaft in meinem Berufsleben widerspiegelt.
                    <!-- Ergänzend dazu findest du eine ehrliche und selbstkritische Einschätzung meiner <a href="#faehigkeiten" class="text-primary">Fähigkeiten</a>. -->
                    Einen Eindruck meines Privatlebens erhältst du unter <a href="#persoenliches">Persönliches</a>.
                </p>
            </div>

            <a href="#werdegang" role="button" class="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 no-hover">
                <svg class="stroke-current opacity-30 w-12 p-2 -m-2 h-auto stroke-[0.04em] animate-bounce" viewBox="0 0 29.712 8.8547" xmlns="http://www.w3.org/2000/svg">
                    <path d="m29.476 0.44055-14.62 7.8467-14.62-7.8467" fill="none" stroke="currentColor" />
                </svg>
            </a>
        </AppHero>

        <AppSection id="werdegang" class="bg-primary text-secondary relative overflow-x-hidden dark-mouse-tracker">
            <AppHeading tag="h2" class="text-[clamp(3rem,7dvw,5rem)] text-center">Werdegang</AppHeading>

            <div class="space-y-20 xl:space-y-32">
                <AppExperience v-for="(experience, index) in application?.experiences" :key="experience.id" :experience="experience" :index="index" />
            </div>
        </AppSection>

        <AppSection id="werdegang" class="bg-primary text-secondary relative overflow-x-hidden dark-mouse-tracker">
            <AppHeading tag="h2" class="text-[clamp(3rem,7dvw,5rem)] text-center">Fortbildung</AppHeading>

            <div class="space-y-20 xl:space-y-32">
                <AppExperience v-for="(education, index) in application?.educations" :key="education.id" :experience="education" :index="index" />
            </div>
        </AppSection>

        <AppSection v-if="false" id="faehigkeiten">
            <AppHeading tag="h2" class="text-[clamp(3rem,7dvw,5rem)] text-center">Meine Fähigkeiten</AppHeading>
        </AppSection>

        <AppSection id="persoenliches">
            <AppHeading tag="h2" class="text-[clamp(3rem,7dvw,5rem)] text-center">So bin ich privat</AppHeading>

            <div class="space-y-20 xl:space-y-32">
                <AppImpression v-for="impression in application?.impressions" :impression="impression" v-bind:key="impression.id" />
            </div>
        </AppSection>

        <AppHero id="danke">
            <AppHeading class="font-bold text-[clamp(7rem,20dvw,16rem)] leading-none text-primary/30">Danke</AppHeading>

            <div class="font-display text-[clamp(1.5rem,3dvw,1.875rem)] leading-normal -mt-[clamp(4.5rem,11dvw,9rem)]">
                <p>Ich freue mich sehr darauf, euch persönlich kennenzulernen und einen Eindruck davon zu bekommen, wie ihr  arbeitet. Solltet ihr Fragen haben, meldet euch gern bei mir. Ich würde mich freuen von euch zu hören.</p>
            </div>
        </AppHero>
    </div>
</template>
