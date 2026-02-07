<script lang="ts" setup>
import moment from 'moment';

const today = moment();
const birth = moment('1985-09-18');
const age = ref<number>();
age.value = moment.duration(today.diff(birth)).years();

const email = () => {
    window.open(window.atob('bWFpbHRvOm1hcnRpbkBza3JvY2guZGU='), '_self');
}
</script>

<style scoped>
@reference '../assets/css/main.css';

nav a,
nav button {
    @apply flex items-center gap-1 cursor-pointer bg-white/10 px-3 py-2 rounded-full;
}

nav a:hover,
nav button:hover {
    @apply transition-all duration-300 hover:bg-white/30;
}
</style>

<template>
    <AppSection id="einleitung" class="min-h-dvh flex items-center" spacing="">

        <!-- <div class="bg-black/30 rounded-full max-w-4xl p-4 grid grid-cols-4 gap-3">
            <div class="col-span-1">
                <AppAvatar name="Martin Skroch" />
            </div>

            <div class="col-span-3 flex flex-col justify-center gap-3 p-4">
                <AppHeading tag="h1" class="font-bold text-7xl leading-none">Martin Skroch</AppHeading>
                <div class="flex gap-4">
                    <AppHeading tag="div" class="font-light text-3xl leading-none">{{ age }} Jahre</AppHeading>
                    <span class="text-3xl leading-none">&bull;</span>
                    <AppHeading tag="h2" class="font-light text-3xl leading-none">Full Stack Web Developer</AppHeading>
                </div>
                <nav class="flex gap-4 items-center text-sm leading-none">
                    <a href="https://github.com/martin-skroch" target="_blank" rel="noopener">
                        <Icon name="ph:github-logo-duotone" /> GitHub
                    </a>
                    <a @click="email">
                        <Icon name="ph:at-duotone" /> E-Mail
                    </a>
                    <button>
                        <Icon name="ph:question-duotone" /> Bewerbung anfordern
                    </button>
                </nav>
            </div>
        </div> -->

        <AppHeading class="font-bold text-[16rem] leading-none text-primary/30">Moin</AppHeading>

        <div class="font-display text-3xl leading-relaxed -mt-28">
            <p>
                Mein Name ist Martin Skroch, ich bin 40 Jahre alt und entwickle moderne
                Weblösungen. Wenn du Interesse an einer vollständigen Onlinebewerbung mit
                Lebenslauf, einer  Selbsteinschätzung zu verschiedenen Technologien und weiteren
                Details hast, kannst du diese jederzeit über das Formular anfordern.
            </p>
        </div>

        <AppSeparator />

        <div class="flex items-center gap-6">
            <div class="flex items-center gap-3 grow">
                <AppAvatar name="Martin Skroch" class="size-8" />
                <AppHeading tag="h1" class="font-medium">Martin Skroch</AppHeading>
            </div>

            <AppMetaNavigation />
        </div>
    </AppSection>
</template>