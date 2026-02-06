export const useLoader = () => {
    const indicator = useLoadingIndicator();

    const start = () => indicator.start();
    const finish = () => indicator.finish();

    return {
        isLoading: computed(() => indicator.isLoading.value),
        progress: indicator.progress,
        start,
        finish
    }
}