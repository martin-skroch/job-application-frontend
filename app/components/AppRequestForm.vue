<script lang="ts" setup>
import { object, string } from 'yup';
import { Form, type GenericObject, type SubmissionHandler } from 'vee-validate';
import type { FormActions } from '~/types';

const { apiUrl, apiKey } = useRuntimeConfig().public;
const { isId } = useApplication();
const props = defineProps<{
    id?: string,
    layout?: 'dark' | 'light'
}>();

const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const success = ref<boolean>(false);

let schema: Record<string, any> | undefined;

if (!isId(props.id)) {
    schema = object({
        company: string().required('Firma ist erforderlich').typeError('Firma muss ein Text sein'),
        name: string().required('Name ist erforderlich').typeError('Name muss ein Text sein'),
        email: string().required('E-Mail ist erforderlich').email('E-Mail ist ungültig').typeError('E-Mail muss ein Text sein'),
    });
}

const request : SubmissionHandler<GenericObject, GenericObject, unknown> = async (values, { resetForm }: FormActions) => {
    success.value = false;
    loading.value = true;

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
    };

    if (isId(props.id)) {
        values = { id: props.id };
    }

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
    <Form @submit="request" class="space-y-6" :validation-schema="schema">
        <template v-if="!props.id">
            <AppInput type="text" name="company" label="Firma" />
            <AppInput type="text" name="name" label="Name" />
            <AppInput type="email" name="email" label="E-Mail" />

            <div v-if="error" class="bg-red-700 text-red-100 text-sm rounded-md py-3 px-4 flex items-baseline gap-2">
                <Icon name="ph:warning-circle" class="shrink-0 translate-y-0.5" />
                <div class="grow">
                    <p>{{ error }}</p>
                </div>
            </div>
        </template>

        <div v-if="success" class="bg-green-700 text-green-100 text-sm rounded-md py-3 px-4 flex items-baseline gap-2 text-start">
            <Icon name="ph:check-circle" class="shrink-0 translate-y-0.5" />
            <div class="grow">
                <p>Vielen Dank für deine Anfrage. Ich sende dir sobald wie möglich deinen persönlichen Zugang.</p>
            </div>
        </div>

        <button type="submit" :disabled="loading" class="inline-flex items-center gap-2 transition-colors border  disabled:opacity-50 disabled:cursor-not-allowed  text-sm font-medium cursor-pointer rounded-md py-2.5 px-4" :class="{
            'border-secondary bg-secondary hover:bg-secondary/85 text-white': !props.layout,
            'border-primary bg-primary hover:bg-primary/85 text-secondary': props.layout === 'light'
        }">
            <Icon name="ph:paper-plane-tilt" v-if="!loading" />
            <Icon name="ph:circle-notch" :class="{'animate-spin': loading}" v-else />
            Zugriff anfordern
        </button>
    </Form>
</template>