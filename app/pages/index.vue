<script lang="ts" setup>
import { object, string } from 'yup';
import { Form } from 'vee-validate';
import moment from 'moment';

const { apiUrl, apiKey } = useRuntimeConfig().public;

const today = moment();
const birth = moment('1985-09-18');
const age = ref<number>();
age.value = moment.duration(today.diff(birth)).years();

const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const open = ref<boolean>(false);

const schema = object({
    company: string().required(),
    name: string().required(),
    email: string().required().email(),
});

const request = async (values: object) => {
    loading.value = true;

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
    };

    try {
        const data = await $fetch(`api/application/request`, {
            method: 'post',
            baseURL: apiUrl,
            headers: headers,
            body: values,
        });

        console.log(data);
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Unexpected Error.';
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <AppHero id="einleitung">
        <!-- <p>Als Full Stack Developer verbinde ich Backend, Datenbank und Frontend zu durchdachten Gesamtlösungen. Ich arbeite präzise, pragmatisch und mit dem Ziel, langfristig funktionierenden Code zu liefern. Qualität steht für mich über schnellen Kompromissen.</p> -->
        <p>Ich entwickle Webanwendungen mit technischem Tiefgang und einem klaren Blick für das Wesentliche. Erfahrung bedeutet für mich, Projekte strukturiert umzusetzen und Verantwortung zu übernehmen. Wer einen Entwickler sucht, der mitdenkt, ist hier richtig.</p>
    </AppHero>

    <AppSection v-if="false" id="onlinebewerbung" class="bg-primary text-secondary">
        <div class="group flex max-md:flex-col md:items-start md:even:flex-row-reverse gap-8 md:gap-16">
            <div class="md:w-1/2">
                <div class="size-3/5 md:size-full group-even:ms-auto group-odd:-rotate-2 group-even:rotate-2 aspect-square bg-white rounded-2xl border border-secondary shadow-[0_0.5rem_0_0_var(--color-secondary)] flex items-center justify-center overflow-hidden">
                    <!-- <img src="http://localhost:3000/images/avatar.webp" alt="" loading="lazy" class="size-full object-cover" /> -->
                    <Icon name="ph:image-square-duotone" class="size-full! text-secondary my-8" />
                </div>
            </div>
            <div class="md:w-1/2 group-even:text-end space-y-6 py-16">
                <AppHeading class="text-[clamp(2rem,6dvw,4rem)] font-bold">
                    Ein Blick hinter die Kulissen
                </AppHeading>

                <div class="text-[clamp(1rem,3dvw,1.2rem)] leading-normal space-y-6">
                    <p>Neugierig, wer hinter dem Entwickler steckt? Mit einem persönlichen Zugang kannst du mehr über meinen Werdegang erfahren. Ich zeige dir, welche Technologien ich nutze und gebe dir auch einige private Einblicke.</p>
                </div>

                <div class="flex items-center gap-2 border p-3 rounded-md bg-secondary/10">
                    <Icon name="ph:info-duotone" class="shrink-0" /> Demnächst verfügbar
                </div>

                <template v-if="false">
                    <button @click="open = !open" class="transition-colors bg-secondary hover:bg-secondary/85 text-white font-medium rounded-md py-3 px-6 cursor-pointer">
                        Zugang anfordern
                    </button>

                    <Form v-if="open" @submit="request" class="space-y-4" :validation-schema="schema">
                        <AppInput type="text" name="company" label="Firma" value="ACME GmbH" />
                        <AppInput type="text" name="name" label="Name" value="Max Mustermann" />
                        <AppInput type="text" name="email" label="E-Mail" value="max@mustermann.de" />
                        <button type="submit" class="transition-colors bg-secondary hover:bg-secondary/85 text-white text-sm font-medium rounded-md py-2 px-4 cursor-pointer">
                            Link anfordern
                        </button>
                    </Form>
                </template>
            </div>
        </div>
    </AppSection>
</template>