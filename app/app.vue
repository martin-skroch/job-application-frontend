<script setup lang="ts">

const { profile } = useProfile();

const title = profile.value.name + ' - Full Stack Web Developer';
const description = 'Full Stack Web Developer mit Erfahrung in Laravel, Vue.js, Tailwind CSS und weiteren Webtechnologien.';
const image = '/images/og-image.webp';

useSeoMeta({
    title: title,
    ogTitle: title,
    description: description,
    ogDescription: description,
    ogImage: image,
    twitterImage: image,
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>