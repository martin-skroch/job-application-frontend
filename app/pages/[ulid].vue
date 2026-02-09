<script lang="ts" setup>
import type { Application, Profile } from '~/types'

definePageMeta({middleware: ['ulid']});

const { profile, setProfile } = useProfile();
const { apiUrl, apiKey } = useRuntimeConfig().public;
const { ulid, isUlid, deleteUlid } = useUlid();
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
    if (!isUlid()) {
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
        application.value = await $fetch(`api/application/${ulid.value}`, options);

        if (application.value !== null) {
            setProfile(application.value.profile);
            console.log('Proile has set');
        }

    } catch (e) {
        error.value = e instanceof Error ? e.message : `The job application could not be loaded: ${ulid.value}`;

        deleteUlid();

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
        <AppHero id="einleitung">
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
            <AppHeading tag="h2" class="text-[clamp(3rem,7dvw,5rem)] text-center">Berufliche Laufbahn</AppHeading>

            <div class="space-y-20 xl:space-y-32">
                <AppExperience v-for="(experience, index) in application?.experiences" :key="experience.id" :experience="experience" :index="index" />
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
