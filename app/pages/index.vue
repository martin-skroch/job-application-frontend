<script lang="ts" setup>
import type { Profile, Skill } from '~/types'

const { apiUrl, apiKey } = useRuntimeConfig().public;
const { setProfile } = useProfile();

const skills = ref<Skill[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

watch(loading, (loading) => {
    if (import.meta.client) {
        document.body.style.overflow = loading ? 'hidden' : '';
    }
});

onMounted(async () => {
    loading.value = true;

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
    };

    const options = {
        baseURL: apiUrl,
        headers: headers,
    };

    await $fetch<Profile>('api/profile/01kgs4jms5nf07t06v6dmz59kh', options).then((value) => {

        setProfile(value);

        if (typeof value.skills !== 'undefined') {
            skills.value = value.skills;
        }

    }).catch(async (e) => {
        if (e instanceof Error) {
            error.value = e.message;
        } else {
            error.value = `The job application could not be loaded: ${id.value}`;
        }
    }).finally(() => {
        loading.value = false;
    });
});
</script>

<template>
    <Transition name="fade">
        <div v-if="loading" class="flex items-center justify-center fixed inset-0 bg-zinc-950 text-zinc-500 z-999">
            <div class="border border-b-transparent size-7 rounded-full animate-spin"></div>
        </div>
    </Transition>

    <template v-if="!loading">
        <AppHero>
            <AppHeading tag="h2" class="text-[clamp(1.4rem,3dvw,1.8rem)]">Full Stack Web Developer</AppHeading>
        </AppHero>

        <AppSection v-if="skills.length > 0" id="faehigkeiten" heading="Fähigkeiten" class="bg-primary text-secondary ">
            <div class="grid md:grid-cols-2 gap-y-2 md:gap-y-4 gap-x-16">
                <AppSkill v-for="skill in skills" v-bind:key="skill.id" :skill="skill" />
            </div>
        </AppSection>

        <AppSection id="onlinebewerbung" heading="Möchtest du mehr über mich erfahren?" class="bg-primary text-secondary border-t-8 border-secondary">
            <div class="flex max-md:flex-col md:items-start gap-8 md:gap-16">
                <div class="md:w-1/2 text-[clamp(1.3rem,3dvw,1.5rem)] leading-relaxed text-center md:text-end">
                    <p>Neugierig geworden? Wenn du mehr über mich erfahren möchtest, fülle einfach das folgende Formular aus. Anschließend erhältst du einen Einblick in meinen Lebenslauf.</p>
                </div>

                <div class="md:w-1/2">
                    <AppRequestForm />
                </div>
            </div>
        </AppSection>
    </template>
</template>