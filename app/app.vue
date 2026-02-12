<script setup lang="ts">
// const description: string | null = 'Lorem ipsum dolor sit amet';
// const image: string | null = null;

const { profile } = useProfile();

const title: string = profile.value.name + ' - Full Stack Web Developer';

useSeoMeta({
    title: title,
    ogTitle: title,
    // description: description,
    // ogDescription: description,
    // ogImage: image,
    // twitterCard: image,
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>