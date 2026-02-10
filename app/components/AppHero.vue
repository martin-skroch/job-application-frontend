<script lang="ts" setup>
const profile = useAppConfig().profile;
</script>

<style scoped>
@reference '../assets/css/main.css';

nav a,
nav button {
    @apply bg-white/10 border-0 px-3 py-2 rounded-full transition-all;
}

nav a:hover,
nav button:hover {
    @apply duration-300 hover:bg-white/30 text-current;
}
</style>

<template>
    <AppSection spacing="">

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
                    <a href="https://github.com/martin-skroch" target="_blank" rel="noopener">
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

        <slot></slot>

        <AppSeparator />

        <div class="flex items-center gap-6">
            <div class="flex items-center gap-3 grow">
                <AppAvatar class="size-8" />
                <AppHeading tag="h1" class="font-medium">{{ profile.name }}</AppHeading>
            </div>

            <AppMetaNavigation />
        </div>
    </AppSection>
</template>