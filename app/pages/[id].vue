<script lang="ts" setup>
import type { Application, Skill } from '~/types'

definePageMeta({ middleware: ['id'] });

const { apiUrl, apiKey } = useRuntimeConfig().public;
const { id, isId } = useApplication();
const { setProfile } = useProfile();
const router = useRouter();

const application = ref<Application | null>(null);
const skills = ref<Skill[]>([]);
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
            skills.value = application.value.skills;
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
        <AppHero id="einleitung" scroll-target="werdegang" :application="application ?? null">
            {{ application?.text }}
        </AppHero>

        <AppSection id="werdegang" heading="Werdegang"
            class="bg-primary text-secondary relative overflow-x-hidden dark-mouse-tracker">
            <div class="space-y-20 xl:space-y-32">
                <AppExperience v-for="(experience, index) in application?.experiences" :key="experience.id" :experience="experience" :index="index" />
            </div>
        </AppSection>

        <AppSection id="fortbildung" heading="Fortbildung" class="relative overflow-x-hidden dark-mouse-tracker">
            <div class="space-y-20 xl:space-y-32">
                <AppExperience v-for="(education, index) in application?.educations" :key="education.id" :experience="education" :index="index" />
            </div>
        </AppSection>

        <AppSection id="faehigkeiten" heading="Fähigkeiten" class="bg-primary text-secondary ">
            <div class="grid md:grid-cols-2 gap-y-4 gap-x-16">
                <AppSkill v-for="skill in skills" v-bind:key="skill.id" :skill="skill" />
            </div>
        </AppSection>

        <AppSection id="persoenliches" heading="Was ich privat so treibe">
            <div class="space-y-20 xl:space-y-32">
                <AppImpression v-for="impression in application?.impressions" :impression="impression" v-bind:key="impression.id" />
            </div>
        </AppSection>
    </div>
</template>
