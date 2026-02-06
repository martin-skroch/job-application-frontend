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
        <div ref="experience" class="grid grid-cols-4 transform-3d">

            <div class="col-span-1 px-4 flex flex-col justify-between items-end gap-4">
                <div class="font-serif text-5xl flex items-center gap-1" v-if="props.experience.exit">
                    <span class="font-light">{{ exit.format('MM') }}</span>
                    <span class="font-extralight">/</span>
                    <span class="font-bold">{{ exit.format('YYYY') }}</span>
                </div>

                <div class="font-serif text-3xl" v-else>
                    heute
                </div>

                <div class="grow relative border-r border-dashed border-secondary flex flex-col justify-center me-7 py-4">
                    <Icon name="ph:caret-up-fill" class="absolute -top-3 -right-[0.5px] translate-x-1/2" />

                    <div class="text-xs font-light [writing-mode:vertical-rl] rotate-180 text-right">
                        {{ props.experience.duration }}
                    </div>
                </div>

                <div class="font-serif text-5xl flex items-center gap-1">
                    <span class="font-light">{{ entry.format('MM') }}</span>
                    <span class="font-extralight">/</span>
                    <span class="font-bold">{{ entry.format('YYYY') }}</span>
                </div>
            </div>

            <div class="col-span-3 px-4">
                <div class="min-h-full border border-secondary shadow-[0_0.5rem_0_0_var(--color-secondary)] rounded-2xl">

                    <header class="col-span-2 space-y-2 bg-secondary/10 border-b border-secondary px-8 py-4 rounded-t-2xl">
                        <h2 v-if="props.experience.institution" class="font-serif text-4xl font-bold" :title="props.experience.institution">
                            {{ props.experience.institution }}
                        </h2>

                        <div class="text-xs font-light flex items-center gap-6">
                            <span v-if="props.experience.location" class="flex items-center gap-1.5">
                                <Icon name="ph-map-trifold-duotone" /> {{ props.experience.location }}
                            </span>
                            <span v-if="props.experience.type" class="flex items-center gap-1.5">
                                <Icon name="ph-monitor-duotone" /> {{ props.experience.type }}
                            </span>
                        </div>
                    </header>

                    <div class="grid grid-cols-2 gap-8 p-8">

                        <div class="leading-relaxed">
                            <p>{{ props.experience.description }}</p>
                        </div>

                        <div class="col-span-1 space-y-8">
                            <div v-if="skills.length > 0" class="space-y-2">
                                <h3 class="font-serif font-bold flex items-center gap-2">
                                    <Icon name="ph:brackets-curly-duotone" /> Technologien
                                </h3>
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

    <!-- <div class="perspective-distant perspective-origin-center">
        <div ref="experience" class="p-8 bg-secondary text-white rounded-xl shadow-2xl transform-3d space-y-6">

            <div class="grow flex items-center justify-end gap-4">
                <span v-if="props.experience.exit">{{ props.experience.entry }}</span>
                <span v-else>seit {{ props.experience.entry }}</span>

                <template v-if="props.experience.exit">
                    <span class="border-b border-dotted border-current grow h-0"></span>
                    <span>{{ props.experience.exit }}</span>
                </template>
            </div>

            <div v-if="props.experience.company">
                <h4>Firma</h4>
                <div>{{ props.experience.company }}</div>
            </div>

            <div v-if="props.experience.location">
                <h4>Standort</h4>
                <div>{{ props.experience.location }}</div>
            </div>

            <div v-if="props.experience.skills" class="grid gap-3">
                <h4>Technologien</h4>
                <div class="flex flex-wrap gap-2">
                    <div v-for="(skill, index) in props.experience.skills ?? []" v-bind:key="index" class="text-[0.6rem] bg-zinc-700 text-zinc-200 rounded-sm leading-none px-2 py-1.5">
                        {{ skill }}
                    </div>
                </div>
            </div>

        </div>
    </div> -->
</template>