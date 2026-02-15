<script lang="ts" setup>
import { object, string } from 'yup';
import { Form, type GenericObject, type SubmissionHandler } from 'vee-validate';
import type { FormActions } from '~/types';

const { apiUrl, apiKey } = useRuntimeConfig().public;

const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const success = ref<boolean>(false);

const schema = object({
    company: string().required('Firma ist erforderlich').typeError('Firma muss ein Text sein'),
    name: string().required('Name ist erforderlich').typeError('Name muss ein Text sein'),
    email: string().required('E-Mail ist erforderlich').email('E-Mail ist ungültig').typeError('E-Mail muss ein Text sein'),
});

const request = async (values: SubmissionHandler<GenericObject>, { resetForm }: FormActions) => {
    success.value = false;
    loading.value = true;

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
    };

    try {
        await $fetch('api/application/request', {
            method: 'post',
            baseURL: apiUrl,
            headers: headers,
            body: values,
        });

        success.value = true;

        resetForm();
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Ein unerwarteter Fehler ist aufgetreten.';
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <AppHero>
        <AppHeading tag="h2" class="text-[clamp(1.5rem,4dvw,2rem)]">Full Stack Web Developer</AppHeading>
    </AppHero>

    <AppSection id="onlinebewerbung" heading="Ein Blick hinter die Kulissen" class="bg-primary text-secondary">
        <div class="flex max-md:flex-col md:items-start gap-8 md:gap-16">

            <div class="md:w-1/2 text-[clamp(1.3rem,3dvw,1.5rem)] leading-relaxed text-center md:text-end">
                <p>Neugierig, wer hinter dem Entwickler steckt? Mit einem persönlichen Zugang kannst du mehr über meinen Werdegang erfahren. Ich zeige dir, welche Technologien ich nutze und gebe dir auch einige private Einblicke.</p>
            </div>

            <div class="md:w-1/2">
                <Form @submit="request" class="space-y-6" :validation-schema="schema">
                    <AppInput type="text" name="company" label="Firma" />
                    <AppInput type="text" name="name" label="Name" />
                    <AppInput type="email" name="email" label="E-Mail" />

                    <div v-if="error" class="bg-red-700 text-red-100 text-sm rounded-md py-3 px-4 flex items-baseline gap-2">
                        <Icon name="ph:warning-circle" class="shrink-0 translate-y-0.5" />
                        <div class="grow">
                            <p>{{ error }}</p>
                        </div>
                    </div>

                    <div v-if="success" class="bg-green-700 text-green-100 text-sm rounded-md py-3 px-4 flex items-baseline gap-2">
                        <Icon name="ph:check-circle" class="shrink-0 translate-y-0.5" />
                        <div class="grow">
                            <p>Vielen Dank für deine Anfrage. Ich sende dir sobald wie möglich deinen persönlichen Zugang.</p>
                        </div>
                    </div>

                    <button type="submit" :disabled="loading" class="flex items-center gap-2 transition-colors border border-secondary bg-secondary hover:bg-secondary/85 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-light cursor-pointer rounded-md py-2.5 px-4">
                        <Icon name="ph:paper-plane-tilt" v-if="!loading" />
                        <Icon name="ph:circle-notch" :class="{'animate-spin': loading}" v-else />
                        Link anfordern
                    </button>
                </Form>
            </div>
        </div>
    </AppSection>
</template>