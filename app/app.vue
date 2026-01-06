<script setup lang="ts">
    const title: string = 'Martin Skroch - Full Stack Web Developer';
    const description: string | null = 'Lorem ipsum dolor sit amet';
    const image: string | null  = null;

    useSeoMeta({
        title: title,
        ogTitle: title,
        description: description,
        ogDescription: description,
        ogImage: image,
        twitterCard: image,
    })
</script>

<style></style>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>