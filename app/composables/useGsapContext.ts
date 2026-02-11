export function useGsapContext(callback: () => void) {
    const { $gsap } = useNuxtApp();

    let context: gsap.Context | null = null;

    onMounted(() => {
        context = $gsap.context(callback);
    });

    onUnmounted(() => {
        context?.revert();
        context = null;
    });

    return { context };
}
