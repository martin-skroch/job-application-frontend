<script lang="ts" setup>
import moment from 'moment';
import type { Application, Experience, Impression, Skill } from '~/types'

definePageMeta({ middleware: ['id'] });
useSeoMeta({robots: 'noindex, nofollow'});

const { apiUrl, apiKey } = useRuntimeConfig().public;
const { id, isId } = useApplication();
const { profile, mapLink, github, setProfile } = useProfile();
const router = useRouter();

const email = ref<string | null>(null);
const phone = ref<string | null>(null);

const application = ref<Application | null>(null);
const experiences = ref<Experience[]>([]);
const educations = ref<Experience[]>([]);
const training = ref<Experience[]>([]);
const school = ref<Experience[]>([]);
const skills = ref<Skill[]>([]);
const impressions = ref<Impression[]>([]);

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
            experiences.value = application.value.experiences;
            educations.value = application.value.educations;
            training.value = application.value.training;
            school.value = application.value.school;
            skills.value = application.value.skills;
            impressions.value = application.value.impressions;


            if (typeof profile.value.email === 'string' && profile.value.email !== '') {
                email.value = window.atob(profile.value.email).replace('mailto:', '');
            }

            if (typeof profile.value.phone === 'string' && profile.value.phone !== '') {
                phone.value = window.atob(profile.value.phone).replace('tel:', '').replace('+49', '0');
            }
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

.fade-enter-from,
.fade-leave-to {
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
        <AppSection id="einleitung" class="relative min-h-lvh flex flex-col justify-center items-center" spacing="">
            <div class="max-w-sm mx-auto space-y-8 text-center">
                <AppAvatar class="size-26 border-5 mx-auto" />

                <div class="space-y-3">
                    <AppHeading class="font-sans font-light text-[clamp(1rem,2dvw,1.2rem)]">
                        Moin, mein Name ist
                    </AppHeading>

                    <AppHeading tag="h1" class="font-bold text-[clamp(2.5rem,4dvw,3rem)] leading-none! text-primary">
                        {{ profile.name }}
                    </AppHeading>
                </div>

                <nav class="space-y-2">
                    <div v-if="profile.location" class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center gap-1"><Icon name="ph:map-pin-area-duotone" /> Wohnort</span>
                        <span class="grow border-b border-dashed border-zinc-500"></span>
                        <span v-if="!mapLink">{{ profile.location }}</span>
                        <a :href="mapLink" target="_blank" rel="noopener" v-else>{{ profile.location }}</a>
                    </div>

                    <div v-if="profile.birthdate" class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center gap-1"><Icon name="ph:cake-duotone" /> Geburtsdatum</span>
                        <span class="grow border-b border-dashed border-zinc-500"></span>
                        <span>{{ moment(profile.birthdate).format('DD.MM.YYYY') }}</span>
                    </div>

                    <div v-if="email" class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center gap-1"><Icon name="ph:at-duotone" /> E-Mail</span>
                        <span class="grow border-b border-dashed border-zinc-500"></span>
                        <a :href="'mailto:' + email">{{ email }}</a>
                    </div>

                    <div v-if="phone" class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center gap-1"><Icon name="ph:phone-duotone" /> Telefon</span>
                        <span class="grow border-b border-dashed border-zinc-500"></span>
                        <a :href="'tel:' + phone">{{ phone }}</a>
                    </div>

                    <div v-if="github" class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center gap-1"><Icon name="ph:github-logo-duotone" /> GitHub</span>
                        <span class="grow border-b border-dashed border-zinc-500"></span>
                        <a :href="github" target="_blank" rel="noopener">{{ github.replace('https://github.com/', '@') }}</a>
                    </div>
                </nav>
            </div>

            <a href="#anschreiben" role="button" class="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 no-hover">
                <svg class="stroke-current opacity-30 w-12 p-2 -m-2 h-auto stroke-[0.04em] animate-bounce" viewBox="0 0 29.712 8.8547" xmlns="http://www.w3.org/2000/svg">
                    <path d="m29.476 0.44055-14.62 7.8467-14.62-7.8467" fill="none" stroke="currentColor" />
                </svg>
            </a>
        </AppSection>

        <AppSection v-if="application?.text || application?.contact" id="anschreiben" class="bg-secondary text-zinc-300 border-t border-zinc-800 relative overflow-x-hidden">
            <div class="space-y-8">
                <AppHeading v-if="application?.title" tag="h2" class="font-display leading-tight text-primary text-[clamp(1.5rem,7dvw,3rem)] text-center">
                    Bewerbung als {{ application.title }}
                </AppHeading>

                <div v-if="application.text" class="max-w-3xl mx-auto font-light leading-relaxed text-center">
                    <p v-html="application.text.replace(/(?:\r\n|\r|\n)/g, '<br>')"></p>
                </div>
            </div>
        </AppSection>

        <AppSection v-if="experiences.length > 0" id="werdegang" heading="Werdegang" class="bg-primary text-secondary relative overflow-x-hidden dark-mouse-tracker">
            <div class="space-y-20 xl:space-y-32">
                <AppExperience v-for="(item, index) in experiences" :key="item.id" :experience="item" :index="index" />
            </div>
        </AppSection>

        <AppSection v-if="educations.length > 0" id="fortbildung" heading="Fortbildung" class="relative overflow-x-hidden dark-mouse-tracker">
            <div class="space-y-20 xl:space-y-32">
                <AppExperience v-for="(item, index) in educations" :key="item.id" :experience="item" :index="index" />
            </div>
        </AppSection>

        <AppSection v-if="training.length > 0" id="ausbildung" heading="Ausbildung" class="relative overflow-x-hidden dark-mouse-tracker">
            <div class="space-y-20 xl:space-y-32">
                <AppExperience v-for="(item, index) in training" :key="item.id" :experience="item" :index="index" />
            </div>
        </AppSection>

        <AppSection v-if="school.length > 0" id="schule" heading="Schule" class="relative overflow-x-hidden dark-mouse-tracker">
            <div class="space-y-20 xl:space-y-32">
                <AppExperience v-for="(item, index) in school" :key="item.id" :experience="item" :index="index" />
            </div>
        </AppSection>

        <AppSection v-if="skills.length > 0" id="faehigkeiten" heading="Fähigkeiten" class="bg-primary text-secondary ">
            <div class="grid md:grid-cols-2 gap-y-2 md:gap-y-4 gap-x-16">
                <AppSkill v-for="skill in skills" v-bind:key="skill.id" :skill="skill" />
            </div>
        </AppSection>

        <AppSection v-if="impressions.length > 0" id="persoenliches" heading="Perönliches">
            <div class="space-y-20 xl:space-y-32">
                <AppImpression v-for="item in impressions" :impression="item" v-bind:key="item.id" />
            </div>
        </AppSection>
    </div>
</template>
