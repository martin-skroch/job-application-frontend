<script lang="ts" setup>
const mouseTracker = useTemplateRef<HTMLElement>('mouse-tracker');
const hidden = ref<Boolean>(false);
const dark = ref<Boolean>(false);
const { $gsap } = useNuxtApp();
const interactiveTags = ['a', 'button'];

useGsapContext(() => {
    $gsap.set(mouseTracker.value, {
        xPercent: -50,
        yPercent: -50,
    });

    const options: gsap.TweenVars = {
        duration: 0.4,
        ease: 'power4',
    };

    let xTo = $gsap.quickTo(mouseTracker.value, 'x', options);
    let yTo = $gsap.quickTo(mouseTracker.value, 'y', options);

    document.body.addEventListener('mousemove', (event: MouseEvent) => {
        if (mouseTracker.value === null || !(event.target instanceof HTMLElement)) {
            return;
        }

        if (event.target.closest('.hidden-mouse-tracker') !== null) {
            hidden.value = true;
        } else {
            hidden.value = false;
        }

        const target = event.target as HTMLElement;

        if (target.closest('.dark-mouse-tracker') !== null && target.closest('.light-mouse-tracker') === null) {
            dark.value = true;
        } else {
            dark.value = false;
        }

        const targetTag = interactiveTags.find(tag => target.closest(tag)?.nodeName.toLowerCase() === tag);

        if (targetTag) {
            mouseTracker.value.setAttribute('data-hover', targetTag);
        } else {
            mouseTracker.value.removeAttribute('data-hover');
        }

        xTo(event.clientX);
        yTo(event.clientY);
    });
});
</script>

<template>
    <Teleport to="body > div">
        <div ref="mouse-tracker" class="fixed z-999 size-4 rounded-full pointer-events-none transition-[width,height,border-color,background-color] data-hover:size-12" :class="{
            'bg-zinc-400/20 data-hover:mix-blend-color-dodge data-hover:bg-primary': !dark,
            'bg-zinc-900/20 data-hover:mix-blend-difference data-hover:bg-zinc-900 ': dark,
            'size-0!': hidden,
        }"></div>
    </Teleport>
</template>