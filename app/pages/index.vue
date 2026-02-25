<template>
    <AppHero>
        <AppHeading tag="h2" class="text-[clamp(1.4rem,3dvw,1.8rem)]">Full Stack Web Developer</AppHeading>
    </AppHero>

    <AppSection id="onlinebewerbung" heading="Ein Blick hinter die Kulissen" class="shadow-[0_0_30rem_0rem_#0008] bg-primary text-secondary">
        <div class="flex max-md:flex-col md:items-start gap-8 md:gap-16">

            <div class="md:w-1/2 text-[clamp(1.3rem,3dvw,1.5rem)] leading-relaxed text-center md:text-end">
                <p>Neugierig, wer hinter dem Entwickler steckt? Mit einem persönlichen Zugang kannst du mehr über meinen Werdegang erfahren. Ich zeige dir, welche Technologien ich nutze und gebe dir auch einige private Einblicke.</p>
            </div>

            <div class="md:w-1/2">
                <AppRequestForm />
            </div>
        </div>
    </AppSection>
</template>