<script lang="ts" setup>
import type { Application, Experience, Impression, Skill } from '~/types'

definePageMeta({ middleware: ['id'] });
useSeoMeta({robots: 'noindex, nofollow'});

const { apiUrl, apiKey } = useRuntimeConfig().public;
const { id, isId } = useApplication();
const { setProfile } = useProfile();
const router = useRouter();

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
        <AppHeroNew id="einleitung" scroll-target="anschreiben" :application="application">
            {{ application?.text }}
        </AppHeroNew>

        <AppSection v-if="application?.text || application?.contact" id="anschreiben" class="relative overflow-x-hidden dark-mouse-tracker" spacing="">
            <AppHeading v-if="application.contact" tag="h2" class="text-[clamp(2rem,7dvw,4rem)] text-center text-primary">
                Hallo {{ application?.contact }},
            </AppHeading>

            <div class="max-w-3xl mx-auto font-display text-2xl/normal text-center space-y-6 bg-white/5 shadow-2xl rounded-md p-8 mt-6">
                <p v-html="application.text.replace(/(?:\r\n|\r|\n)/g, '<br>')"></p>
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
            <div class="grid md:grid-cols-2 gap-y-4 gap-x-16">
                <AppSkill v-for="skill in skills" v-bind:key="skill.id" :skill="skill" />
            </div>
        </AppSection>

        <AppSection v-if="impressions.length > 0" id="persoenliches" heading="Was ich privat so treibe">
            <div class="space-y-20 xl:space-y-32">
                <AppImpression v-for="item in impressions" :impression="item" v-bind:key="item.id" />
            </div>
        </AppSection>
    </div>
</template>
