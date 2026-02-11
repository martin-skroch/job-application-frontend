export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) {
        return;
    }

    const { isId, setId, saveId } = useApplication();

    const routeId: string = (to.params.id as string);
    const storedId: string = localStorage.getItem('id') as string;

    let finalUlid: string | null = null;

    if (isId(routeId)) {
        finalUlid = routeId;
        saveId(finalUlid);
    } else if (isId(storedId)) {
        finalUlid = storedId;
    }

    if (typeof finalUlid === 'string') {
        setId(finalUlid);

        if (to.matched.some(r => r.name !== 'id' && r.name === 'index')) {
            return navigateTo({
                name: 'id',
                params: { ulid: finalUlid.toLowerCase() }
            });
        }

        return;
    }

    if (to.path !== '/') {
        return navigateTo('/');
    }

    return;
});


