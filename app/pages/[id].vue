<script lang="ts" setup>
import type { Application, Experience, Impression, Skill } from '~/types'

definePageMeta({ middleware: ['id'] });
useSeoMeta({robots: 'noindex, nofollow'});

const { apiUrl, apiKey } = useRuntimeConfig().public;
const { id, isId } = useApplication();
const { profile, setProfile } = useProfile();
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

const extractDomain = (url?: string | null) => {
    if (typeof url !== 'string') {
        return url;
    }

    return new URL(url).hostname.replace(new RegExp('www.', 'i'), '');
}

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
        <AppHero id="einleitung" :scroll-target="typeof application?.text === 'string' ? 'anschreiben' : 'werdegang'" :application="application" />

        <AppSection v-if="typeof application?.text === 'string'" id="anschreiben" class="shadow-[0_0_30rem_0rem_#0007] bg-secondary text-zinc-300 border-t border-zinc-800 relative overflow-x-hidden">
            <div class="space-y-8 text-center">
                <AppHeading v-if="typeof application?.title === 'string'" tag="h2" class="text-primary text-[clamp(1.5rem,7dvw,3rem)]">
                    Bewerbung als {{ application.title }}
                </AppHeading>

                <AppHeading v-if="typeof application?.company === 'string'" tag="h3" class="font-bold text-[clamp(1rem,2dvw,1.5rem)]">
                    bei {{ application.company }}
                </AppHeading>

                <div v-if="typeof application.text === 'string'" class="max-w-3xl mx-auto font-light leading-relaxed text-center">
                    <p v-html="application.text.replace(/(?:\r\n|\r|\n)/g, '<br>')"></p>
                </div>

                <div class="max-w-md mx-auto space-y-2 text-center">
                    <div v-if="typeof application?.company === 'string'" class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center gap-1"><Icon name="ph:building-office-duotone" /> Firma</span>
                        <span class="grow border-b border-dashed border-current/50"></span>
                        <span>{{ application.company }}</span>
                    </div>
                    <div v-if="typeof application?.source === 'string'" class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center gap-1"><Icon name="ph:binoculars-duotone" />Stellenausschreibung</span>
                        <span class="grow border-b border-dashed border-current/50"></span>
                        <a :href="application.source" target="_blank" rel="noopener" :title="application.source">{{ extractDomain(application.source) }}</a>
                    </div>
                    <div v-if="typeof application?.salary_desire === 'string'" class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center gap-1"><Icon name="ph:calendar-dot-duotone" /> Gehaltswunsch<small class="text-zinc-500">(Brutto/Jahr)</small></span>
                        <span class="grow border-b border-dashed border-current/50"></span>
                        <span>{{ application.salary_desire }}</span>
                    </div>
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
