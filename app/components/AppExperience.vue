<script lang="ts" setup>
import type { Skill, Experience } from '~/types';
import moment from 'moment';

const props = defineProps<{index: number, experience: Experience}>();
const entry = ref<moment.Moment>(moment(props.experience.entry));
const exit = ref<moment.Moment>(moment(props.experience.exit).add(1, 'day'));
const skills = ref<Skill[]>([...props.experience.skills]);

if (!exit.value.isValid()) {
    exit.value = moment();
}

// const experience = useTemplateRef('experience');
// const isEven = props.index % 2 === 0;

// const { $gsap } = useNuxtApp();

// useGsapContext(() => {
//     $gsap.from(experience.value, {
//         scrollTrigger: {
//             trigger: experience.value,
//             toggleActions: 'play none none reverse',
//             start: '-10% 120%',
//             end: '+=10%',
//             scrub: 1,
//         },
//         duration: 0.5,
//         ease: 'linear',
//         translateZ: -300,
//         xPercent: isEven ? -25 : 25,
//         yPercent: 100,
//         rotateY: isEven ? 25 : -25,
//         rotateX: 50,
//         opacity: 0,
//     });
// });
</script>

<template>
    <div class="perspective-distant perspective-origin-center">

        <div ref="experience" class="grid grid-cols-4 gap-[clamp(1.5rem,3dvw,2rem)] transform-3d">

            <div class="col-span-1 flex flex-col justify-between items-end gap-4">
                <div class="font-sans text-[clamp(1.5rem,4dvw,3rem)] flex items-center gap-1" v-if="props.experience.exit">
                    <span class="font-light">{{ exit.format('MM') }}</span>
                    <span class="font-extralight">/</span>
                    <span class="font-bold">{{ exit.format('YYYY') }}</span>
                </div>

                <div v-else class="text-[clamp(1.5rem,4dvw,3rem)]">
                    heute
                </div>

                <div class="grow relative border-r border-dashed border-secondary flex flex-col justify-center me-[clamp(1.5rem,3dvw,2rem)] py-4">
                    <Icon name="ph:caret-up-fill" class="absolute -top-3 -right-[0.5px] translate-x-1/2" />

                    <div class="text-xs [writing-mode:vertical-rl] rotate-180 text-right">
                        {{ props.experience.duration }}
                    </div>
                </div>

                <div class="font-sans text-[clamp(1.5rem,4dvw,3rem)] flex items-center gap-1">
                    <span class="font-light">{{ entry.format('MM') }}</span>
                    <span class="font-extralight">/</span>
                    <span class="font-bold">{{ entry.format('YYYY') }}</span>
                </div>
            </div>

            <div class="col-span-3">
                <div class="min-h-full border border-secondary shadow-[0_0.5rem_0_0_var(--color-secondary)] mb-2 rounded-2xl">

                    <header class="col-span-2 space-y-2 bg-secondary/10 border-b border-secondary px-[clamp(1.5rem,3dvw,2rem)] py-4 rounded-t-2xl">
                        <AppHeading tag="h3" v-if="props.experience.institution" class="text-[clamp(1.5rem,3dvw,2.25rem)] font-medium" :title="props.experience.institution">
                            {{ props.experience.institution }}
                        </AppHeading>

                        <div class="text-xs font-medium flex max-md:flex-col md:items-center gap-1 md:gap-6">
                            <span v-if="props.experience.location" class="flex items-center gap-1.5">
                                <Icon name="ph-map-trifold-duotone" /> {{ props.experience.location }}
                            </span>
                            <span v-if="props.experience.office" class="flex items-center gap-1.5">
                                <Icon name="ph-monitor-duotone" /> {{ props.experience.office }}
                            </span>
                        </div>
                    </header>

                    <div class="grid lg:grid-cols-2 gap-[clamp(1.5rem,3dvw,2rem)] p-[clamp(1.5rem,3dvw,2rem)]">

                        <div class="text-sm leading-relaxed">
                            <p>{{ props.experience.description }}</p>
                        </div>

                        <div class="col-span-1 space-y-[clamp(1.5rem,3dvw,2rem)]">
                            <div v-if="skills.length > 0" class="space-y-3">
                                <h4 class="flex items-center gap-2">
                                    <Icon name="ph:brackets-curly-duotone" /> Technologien
                                </h4>
                                <div class="flex flex-wrap gap-2">
                                    <button v-for="(skill, index) in skills" v-bind:key="index" type="button" class="text-xs bg-secondary/10 border-secondary text-secondary rounded-sm leading-none py-1 px-1.5">
                                        {{ skill.name }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>