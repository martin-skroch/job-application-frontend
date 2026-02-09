<script lang="ts" setup>
import moment from 'moment';
import type { Profile } from '~/types';

const { profile } = useProfile();

const today = moment();
const birth = moment('1985-09-18');
const age = ref<number>();
age.value = moment.duration(today.diff(birth)).years();

const email = () => {
    window.open(window.atob('bWFpbHRvOm1hcnRpbkBza3JvY2guZGU='), '_self');
}
</script>

<template>
    <AppHero id="einleitung">
        <AppHeading class="font-bold text-[clamp(7rem,20dvw,16rem)] leading-none text-primary/30">Moin</AppHeading>

        <div class="font-display text-[clamp(1.5rem,3dvw,1.875rem)] leading-normal -mt-[clamp(4.5rem,11dvw,9rem)]">
            <p>
                Mein Name ist {{ profile.name }}, ich bin {{ profile.age }} Jahre alt und entwickle moderne Weblösungen.
                Wenn du Interesse an einer vollständigen Onlinebewerbung mit Lebenslauf, einer  Selbsteinschätzung zu
                verschiedenen Technologien und weiteren Details hast, kannst du diese jederzeit über das Formular anfordern.
            </p>
        </div>
    </AppHero>
</template>