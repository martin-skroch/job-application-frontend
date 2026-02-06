<script lang="ts" setup>
import { gsap } from 'gsap';

const mouseTracker = useTemplateRef<HTMLDivElement>('mouse-tracker');

const hidden = ref<Boolean>(false);
const dark = ref<Boolean>(false);

let context: gsap.Context;

onMounted(() => {
    gsap.set(mouseTracker.value, {
        xPercent: -50,
        yPercent: -50,
    });

    context = gsap.context(() => {
        const options = {
            duration: 0.4,
            ease: 'power4',
        };

        let xTo = gsap.quickTo(mouseTracker.value, 'x', options);
        let yTo = gsap.quickTo(mouseTracker.value, 'y', options);

        document.body.addEventListener('mousemove', (event: MouseEvent) => {
            if (mouseTracker.value === null || !(event.target instanceof HTMLElement)) {
                return;
            }

            if (event.target.closest('.hidden-mouse-tracker') !== null) {
                hidden.value = true;
            } else {
                hidden.value = false;
            }

            if (event.target.closest('.dark-mouse-tracker') !== null && event.target.closest('.light-mouse-tracker') === null) {
                dark.value = true;
            } else {
                dark.value = false;
            }

            if (event.target.closest('a')?.nodeName.toLowerCase() === 'a') {
                mouseTracker.value.setAttribute('data-hover', 'a');
            } else {
                mouseTracker.value.removeAttribute('data-hover');
            }

            xTo(event.clientX);
            yTo(event.clientY);
        });
    });
});

onUnmounted(() => {
    context.revert();
});
</script>

<template>
    <Teleport to="body">
        <div ref="mouse-tracker" class="fixed z-10 size-4 rounded-full pointer-events-none transition-[width,height,border-color,background-color] data-hover:size-12" :class="{
            'bg-zinc-400/20 data-hover:mix-blend-color-dodge data-hover:bg-primary': !dark,
            'bg-zinc-900/20 data-hover:mix-blend-difference data-hover:bg-zinc-900 ': dark,
            'size-0!': hidden,
        }"></div>
    </Teleport>
</template>