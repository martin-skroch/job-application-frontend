<script lang="ts" setup>
import type { Application } from '~/types'

definePageMeta({middleware: ['ulid']});

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
        <AppSection id="einleitung" class="min-h-dvh flex flex-col justify-end relative" spacing="">
            <AppHeading class="font-bold text-[16rem] leading-none text-primary/30">Moin</AppHeading>

            <div class="font-display text-3xl leading-relaxed -mt-28">
                <p>
                    Mein Name ist {{ application?.profile.name }}<template v-if="application?.profile.age">, ich bin {{ application?.profile.age }} Jahre alt</template>
                    und <template v-if="!application?.profile.age">ich</template> brenne für die Technologien des Internets.
                    Wirf einen Blick auf meinen <a href="#werdegang" class="text-primary">Werdegang</a>,
                    wenn du wissen möchtest, wie sich diese Leidenschaft in meinem Berufsleben widerspiegelt.
                    <!-- Ergänzend dazu findest du eine ehrliche und selbstkritische Einschätzung meiner <a href="#faehigkeiten" class="text-primary">Fähigkeiten</a>. -->
                    Einen Eindruck meines Privatlebens erhältst du unter <a href="#persoenliches" class="text-primary">Persönliches</a>.
                </p>
            </div>

            <AppSeparator />

            <div class="flex items-center gap-6">
                <div class="flex items-center gap-3 grow">
                    <AppAvatar :image="application?.profile.image" :name="application?.profile.name" class="size-8" />
                    <AppHeading tag="h1" class="font-medium" v-if="application?.profile.name">{{ application.profile.name }}</AppHeading>
                </div>

                <AppMetaNavigation :email="application?.profile.email" :phone="application?.profile.phone" />
            </div>

            <a href="#werdegang" role="button" class="absolute bottom-0 left-1/2 -translate-x-1/2 p-4">
                <svg class="stroke-current opacity-30 w-12 p-2 -m-2 h-auto stroke-[0.04em] animate-bounce" width="29.712"
                    height="8.8547" version="1.1" viewBox="0 0 29.712 8.8547" xmlns="http://www.w3.org/2000/svg">
                    <path d="m29.476 0.44055-14.62 7.8467-14.62-7.8467" fill="none" stroke="currentColor" />
                </svg>
            </a>
        </AppSection>

        <AppSection id="werdegang" class="bg-primary text-secondary relative overflow-x-hidden dark-mouse-tracker">
            <AppHeading tag="h2" class="text-[clamp(2rem,6dvw,5rem)] text-center">Berufliche Laufbahn</AppHeading>

            <div class="space-y-32">
                <AppExperience v-for="(experience, index) in application?.experiences" :key="experience.id" :experience="experience" :index="index" />
            </div>
        </AppSection>

        <!-- <AppSection id="faehigkeiten">
            <AppHeading tag="h2" class="text-[clamp(2rem,6dvw,5rem)] text-center">Meine Fähigkeiten</AppHeading>
        </AppSection> -->

        <AppSection id="persoenliches" class="border-b-8 border-primary">
            <AppHeading tag="h2" class="text-[clamp(2rem,6dvw,5rem)] text-center">So bin ich privat</AppHeading>

            <div class="space-y-4 sm:space-y-8 md:space-y-12 lg:space-y-16 xl:space-y-20">

                <div v-for="impression in application?.impressions" v-bind:key="impression.id"
                    class="group flex items-center even:flex-row-reverse gap-24">
                    <div class="w-2/6">
                        <img :src="impression.image" :alt="impression.title" class="size-full aspect-4/5 object-cover bg-primary rounded-2xl border border-primary shadow-[0_0.5rem_0_0_var(--color-primary)]" />
                    </div>
                    <div class="w-4/6 group-even:text-end space-y-4 font-serif leading-normal">
                        <h3 class="text-7xl text-primary font-bold" v-if="impression.title">{{ impression.title }}</h3>
                        <p class="text-3xl">{{ impression.description }}</p>
                    </div>
                </div>

            </div>
        </AppSection>

        <AppSection id="danke" class="min-h-dvh flex flex-col justify-end" spacing="">
            <AppHeading class="font-bold text-[16rem] leading-none text-primary/30">Danke</AppHeading>

            <div class="font-display text-3xl leading-relaxed -mt-28">
                <p>Ich freue mich sehr darauf, euch persönlich kennenzulernen und einen Eindruck davon zu bekommen, wie ihr  arbeitet. Solltet ihr Fragen haben, meldet euch gern bei mir. Ich würde mich freuen von euch zu hören.</p>
            </div>

            <AppSeparator />

            <div class="flex items-center gap-6">
                <div class="flex items-center gap-3 grow">
                    <AppAvatar :image="application?.profile.image ?? ''" :name="application?.profile.name ?? ''" class="size-8" />
                    <AppHeading tag="h1" class="font-medium" v-if="application?.profile.name">{{ application.profile.name }}</AppHeading>
                </div>

                <AppMetaNavigation :email="application?.profile.email" :phone="application?.profile.phone" />
            </div>
        </AppSection>
    </div>
</template>
