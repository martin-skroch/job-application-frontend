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
        <div class="font-serif font-medium text-[16rem] leading-none text-primary/30">
            Moin
        </div>

        <div class="font-display font-light text-3xl leading-normal -mt-22">
            <p>
                Mein Name ist {{ profile.name }}, ich bin {{ profile.age }} Jahre alt und ich brenne für die Technologien des Internets.
                <!-- Wenn du wissen möchtest, wie sich diese Leidenschaft in meinem Berufsleben widerspiegelt, dann kannst du gerne meine detaillierte Onlinebewerbung an. -->
            </p>
        </div>

        <AppSeparator />

        <div class="flex items-center gap-6">
            <div class="flex items-center gap-3 grow">
                <AppAvatar :image="profile?.image ?? ''" :name="profile.name ?? ''" class="size-8" />
                <AppHeading level="1" class="font-medium" v-if="profile.name">{{ profile.name }}</AppHeading>
            </div>

            <AppMetaNavigation :profile="profile" />
        </div>

        <!-- <a href="#werdegang" role="button" class="absolute bottom-0 left-1/2 -translate-x-1/2 p-4">
            <svg class="stroke-current opacity-30 w-12 p-2 -m-2 h-auto stroke-[0.04em] animate-bounce" width="29.712"
                height="8.8547" version="1.1" viewBox="0 0 29.712 8.8547" xmlns="http://www.w3.org/2000/svg">
                <path d="m29.476 0.44055-14.62 7.8467-14.62-7.8467" fill="none" stroke="currentColor" />
            </svg>
        </a> -->
    </AppSection>
</template>