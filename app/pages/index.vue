<script setup>
const experiences = ref([
    {
        id: 1,
        entry: new Date(2025, 7, 1),
        exit: null,
        company: 'ZweiPunkt GmbH',
        location: 'Ilmenau',
        employees: '10 - 20',
        skills: ['PHP', 'MySQL', 'JavaScript', 'Symfony', 'Shopware', 'WordPress', 'Vue.js', 'Bootstrap', 'CSS', 'SASS', 'Git', 'Docker', 'Linux'],
    },
    {
        id: 2,
        entry: new Date(2024, 7, 30),
        exit: new Date(2025, 6, 30),
        company: 'Selbstständig',
        location: 'Ueckermünde',
        skills: ['PHP', 'MySQL', 'JavaScript', 'Laravel', 'WordPress', 'Vue.js', 'Nuxt', 'Tailwind CSS', 'CSS', 'PostCSS', 'Flutter/Dart', 'Git', 'Docker', 'Linux'],
    },
    {
        id: 3,
        entry: new Date(2022, 10, 1),
        exit: new Date(2024, 6, 30),
        company: 'Kontur & Farbe',
        location: 'Neubrandenburg',
        employees: '3',
        skills: ['PHP', 'MySQL', 'JavaScript', 'Laravel', 'WordPress', 'Vue.js', 'Nuxt', 'Tailwind CSS', 'CSS', 'PostCSS', 'Flutter/Dart', 'Git', 'Docker', 'Linux'],
        documents: [
            {
                label: 'Arbeitszeugnis',
                file: 'files/arbeitszeugnis-kontur-und-farbe.jpg',
            },
        ]
    },
    {
        id: 4,
        entry: new Date(2015, 9, 1),
        exit: new Date(2024, 9, 31),
        company: '13 Grad GmbH',
        location: 'Neubrandenburg',
        employees: '10 - 15',
        skills: ['PHP', 'MySQL', 'JavaScript', 'Laravel', 'WordPress', 'Vue.js', 'Tailwind CSS', 'Bootstrap', 'CSS', 'PostCSS', 'SASS/SCSS', 'LESS', 'Git', 'Docker', 'Linux'],
        documents: [
            {
                label: 'Arbeitszeugnis',
                file: 'files/arbeitszeugnis-13-grad-gmbh.jpg',
            },
        ]
    },
    {
        id: 5,
        entry: new Date(2015, 5, 1),
        exit: new Date(2015, 8, 31),
        company: 'Nordkurier Mediengruppe GmbH & Co. KG',
        location: 'Neubrandenburg',
        employees: '100 - 150',
        skills: ['PHP', 'MySQL', 'JavaScript', 'Drupal', 'Joomla', 'Bootstrap', 'CSS', 'SASS/SCSS', 'LESS', 'Linux'],
        documents: [
            {
                label: 'Arbeitszeugnis',
                file: 'files/arbeitszeugnis-nordkurier-mediengruppe-gmbh-co-kg.jpg',
            },
        ]
    },
    {
        id: 6,
        entry: new Date(2012, 0, 1),
        exit: new Date(2015, 0, 31),
        company: 'Bitskin GmbH',
        location: 'Berlin',
        employees: '15 - 20',
        skills: ['PHP', 'MySQL', 'JavaScript', 'Joomla', 'Bootstrap', 'CSS', 'SASS/SCSS', 'LESS'],
        documents: [
            {
                label: 'Arbeitszeugnis',
                file: 'files/arbeitszeugnis-bitskin-gmbh.jpg',
            },
        ]
    }
].map((experience) => {
    const options = {
        year: 'numeric',
        month: '2-digit'
    };

    experience.entry = experience.entry?.toLocaleString('de-DE', options).replace('.', '/');
    experience.exit = experience.exit?.toLocaleString('de-DE', options).replace('.', '/');
    experience.open = false;

    return experience;
}));
</script>

<template>
    <AppSection id="vorstellung" class="min-h-dvh flex flex-col justify-end relative">
        <AppContainer class="flex flex-col gap-4 select-none">

            <div class="font-serif font-medium text-[16rem] leading-none text-primary/30">Moin</div>

            <div class="font-serif font-light text-3xl leading-normal -mt-32">
                <p>Mein Name ist Martin und mein Herz brennt für die Technologien des Internets. Du brauchst Beweise?
                    Überzeige dich selbst indem du dich durch meinen beruflichen <a href="#werdegang"
                        class="text-primary">Werdegang</a> klickst. Zudem habe ich eine bescheidene und selbstkritische
                    Selbsteinschätzung meiner <a href="#faehigkeiten" class="text-primary">Fähigkeiten</a> zusammen
                    getragen.</p>
            </div>

            <AppSeparator />

            <div class="flex items-center gap-6">

                <div class="flex items-center gap-3 grow">
                    <AppAvatar class="size-8" alt="Foto von Martin Skroch" />
                    <span class="font-serif font-light tracking-wide">Martin Skroch</span>
                </div>

                <div class="flex items-center justify-end gap-8 font-serif text-sm tracking-widest">
                    <a href="#" class="flex items-center gap-1.5 hover:text-primary">
                        <Icon name="ph:github-logo-thin" class="translate-y-[-0.075em]" /> GitHub
                    </a>
                    <a href="#" class="flex items-center gap-1.5 hover:text-primary">
                        <Icon name="ph:at-thin" class="translate-y-[-0.075em]" /> E-Mail
                    </a>
                    <a href="#" class="flex items-center gap-1.5 hover:text-primary">
                        <Icon name="ph:device-mobile-thin" class="translate-y-[-0.075em]" /> Telefon
                    </a>
                </div>

            </div>

        </AppContainer>

        <a href="#werdegang" role="button" class="absolute bottom-0">
            <svg class="stroke-current opacity-50 w-12 p-2 -m-2 h-auto stroke-1 animate-bounce" width="29.712" height="8.8547" version="1.1" viewBox="0 0 29.712 8.8547" xmlns="http://www.w3.org/2000/svg">
                <path d="m29.476 0.44055-14.62 7.8467-14.62-7.8467" fill="none" stroke="currentColor" />
            </svg>
        </a>
    </AppSection>

    <AppSection id="werdegang" class="bg-primary text-secondary dark-mouse-tracker">
        <AppContainer>

            <h2 class="font-serif font-medium text-9xl">Werdegang</h2>

            <div class="grid my-12">
                <AppExperience v-for="experience in experiences" v-bind:key="experience.id" :experience="experience" />
            </div>

        </AppContainer>
    </AppSection>
</template>