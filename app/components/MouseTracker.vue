<script setup>
import { gsap } from 'gsap';

const mouseTracker = useTemplateRef('mouse-tracker');

const hidden = ref(false);
const dark = ref(false);

let context;

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

        document.body.addEventListener('mousemove', (e) => {
            if (mouseTracker.value === null) {
                return;
            }

            if (e.target.closest('.hidden-mouse-tracker') !== null) {
                hidden.value = true;
            } else {
                hidden.value = false;
            }

            if (e.target.closest('.dark-mouse-tracker') !== null && e.target.closest('.light-mouse-tracker') === null) {
                dark.value = true;
            } else {
                dark.value = false;
            }

            if (e.target.closest('a')?.nodeName.toLowerCase() === 'a') {
                mouseTracker.value.setAttribute('data-hover', 'a');
            } else {
                mouseTracker.value.removeAttribute('data-hover');
            }

            xTo(e.clientX);
            yTo(e.clientY);
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