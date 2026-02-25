<script lang="ts" setup>
definePageMeta({ middleware: ['id'] });
const { id } = useApplication();
</script>

<template>
    <AppSection heading="Link Abgelaufen" class="relative min-h-svh flex flex-col justify-center items-center text-center">
        <div class="max-w-lg mx-auto space-y-6">
            <p>Der Zugriff auf diese Onlinebewerbung ist leider abgelaufen.</p>
            <p>Jetzt Zugriff ganz beqem neu anfordern.</p>
            <AppRequestForm :id="id" layout="light" />
        </div>
    </AppSection>
</template>