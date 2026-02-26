<script lang="ts" setup>
import type { Experience, Skill, File } from '~/types';
import moment from 'moment';
import type { VueElement } from 'vue';

const props = defineProps<{ index: number, experience: Experience }>();
const entry = ref<moment.Moment>(moment(props.experience.entry));
const exit = ref<moment.Moment>(moment(props.experience.exit).add(1, 'day'));
const skills = ref<Skill[]>([...props.experience.skills]);
const files = ref<File[]>([...props.experience.files]);

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

const open = ref(false);

const enter = (element: Element) => {
    if (!(element instanceof HTMLElement)) {
        return;
    }

    const height = getComputedStyle(element).height;

    element.style.height = '0';

    getComputedStyle(element).height;

    requestAnimationFrame(() => element.style.height = height);

}

const afterEnter = (element: Element) => {
    if (!(element instanceof HTMLElement)) {
        return;
    }

    element.style.removeProperty('height');
}

const leave = (element: Element) => {
    if (!(element instanceof HTMLElement)) {
        return;
    }

    const height = getComputedStyle(element).height;

    element.style.height = height;

    getComputedStyle(element).height;

    requestAnimationFrame(() => element.style.height = '0');
}
</script>

<style scoped>
@reference '../assets/css/main.css';

.expand-enter-active,
.expand-leave-active {
    @apply overflow-hidden transition-[height,opacity];
}

.expand-enter-from,
.expand-leave-to {
    @apply opacity-0;
}
</style>

<template>
    <div class="flex [--distance-x:clamp(calc(var(--spacing)*6),3vw,calc(var(--spacing)*8))] [--distance-y:clamp(calc(var(--spacing)*6),3vw,calc(var(--spacing)*8))]">

        <div class="border-r border-solid border-current w-0"></div>

        <div class="w-full border-t border-b border-transparent border-dotted py-(--distance-y) space-y-2" :class="{'bg-current/5': open}">

            <button @click="open = !open" class="px-(--distance-x) space-y-1 cursor-pointer w-full text-start">
                <div class="flex items-center gap-4 relative">
                    <span class="transition-transform scale-3d bg-(--icon-bg-color,var(--color-secondary)) text-(--icon-text-color,var(--color-primary)) text-[0.7rem] rounded-full flex p-1.5 absolute -translate-x-[calc(var(--distance-x)+50%)]" :class="{'scale-130': open}">
                        <slot name="icon"><Icon name="ph:calendar-dots" /></slot>
                    </span>

                    <div class="text-lg md:text-xl flex items-center gap-0.5">
                        <span class="font-medium">{{ entry.format('MM/YYYY') }}</span>
                        <Icon name="ph:dot-duotone" />
                        <span class="font-medium">{{ props.experience.exit ? exit.format('MM/YYYY') : 'heute' }}</span>
                    </div>

                    <span class="grow border-t border-dashed border-current/50 "></span>

                    <Icon :name="open ? 'ph:x-duotone' : 'ph:caret-down-duotone'" class="shrink-0 text-xl" />
                </div>

                <h3 v-if="props.experience.institution" class="font-medium text-xs leading-normal! flex items-center gap-1">
                    <Icon name="ph:building-office-duotone" class="shrink-0" />
                    <span class="truncate">{{ props.experience.institution }}</span>
                </h3>

            </button>

            <Transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
                <div v-if="open" class="px-(--distance-x) space-y-8">

                    <div class="text-xs font-medium flex flex-col md:flex-row gap-2 md:gap-6">
                        <span v-if="props.experience.location" class="flex items-center gap-1.5 whitespace-nowrap">
                            <Icon name="ph-map-trifold-duotone" /> {{ props.experience.location }}
                        </span>
                        <span v-if="props.experience.office" class="flex items-center gap-1.5 whitespace-nowrap">
                            <Icon name="ph-monitor-duotone" /> {{ props.experience.office }}
                        </span>
                        <!-- <span v-if="props.experience.duration" class="flex items-center gap-1.5 whitespace-nowrap">
                            <Icon name="ph-calendar-dots-duotone" /> {{ props.experience.duration }}
                        </span> -->
                    </div>

                    <div class="h-0 border-b border-secondary/10 -mt-2 mb-5"></div>

                    <div v-if="props.experience.description" class="space-y-2">
                        <h4 class="flex items-center gap-1 text-xs font-medium">
                            <Icon name="ph:text-align-left-duotone" /> Beschreibung
                        </h4>
                        <div class="max-w-xl text-sm/relaxed" v-if="props.experience.description">
                            <p>{{ props.experience.description }}</p>
                        </div>
                    </div>

                    <div v-if="skills.length > 0" class="space-y-2">
                        <h4 class="flex items-center gap-1 text-xs font-medium">
                            <Icon name="ph:brackets-curly-duotone" /> Technologien
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="(skill, index) in skills" v-bind:key="index" type="button" class="inline-flex items-center gap-1.5 text-xs bg-current/10 border-current text-current rounded-sm leading-none whitespace-nowrap py-1 px-1.5">
                                {{ skill.name }} <span v-if="skill.info" class="text-[0.6rem] opacity-75">({{ skill.info
                                    }})</span>
                            </button>
                        </div>
                    </div>

                    <div v-if="files.length > 0" class="space-y-2">
                        <h4 class="flex items-center gap-1 text-xs font-medium">
                            <Icon name="ph:paperclip-duotone" /> Anhänge
                        </h4>
                        <div class="flex flex-col items-start gap-1">
                            <a :href="file.url" v-for="(file, index) in files" v-bind:key="index" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-xs bg-current/10 hover:bg-current/20 border-current text-current rounded-sm leading-none whitespace-nowrap py-1 px-1.5 no-hover">
                                <Icon :name="'ph:file-' + file.mime.split('/').at(-1) + '-duotone'" />
                                <span>{{ file.title }}</span>
                                <span v-if="file.size" class="text-[0.6rem] opacity-75">({{ file.size }})</span>
                            </a>
                        </div>
                    </div>

                </div>
            </Transition>

        </div>

    </div>
</template>