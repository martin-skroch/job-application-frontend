<script lang="ts" setup>
import moment from 'moment';
import type { Profile } from '~/types';

const profile = ref<Profile>({
    id: '1',
    name: 'Martin Skroch',
    image: 'images/avatar.webp',
    birthdate: '1985-09-18',
    phone: '+491622420852',
    email: 'martin@skroch.de',
});

const today = moment();
const birth = moment(profile.value.birthdate);

profile.value.age = moment.duration(today.diff(birth)).years();
</script>

<template>
    <AppSection id="einleitung" class="min-h-dvh flex flex-col justify-end" spacing="">
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
                <AppAvatar :image="profile?.image ?? ''" :name="profile.name" class="size-8" />
                <AppHeading tag="h1" class="font-medium" v-if="profile.name">{{ profile.name }}</AppHeading>
            </div>

            <AppMetaNavigation :email="profile.email" />
        </div>
    </AppSection>
</template>