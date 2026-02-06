import { isValid } from 'ulid';

export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) {
        return;
    }

    const { setUlid, saveUlid } = useUlid();

    const routeUlid: string = (to.params.ulid as string)?.toUpperCase();
    const storedUlid: string = localStorage.getItem('ulid') as string;

    let finalUlid: string | null = null;

    if (isValid(routeUlid)) {
        finalUlid = routeUlid.toLowerCase();
        saveUlid(finalUlid);
    } else if (isValid(storedUlid)) {
        finalUlid = storedUlid.toLowerCase();
    }

    if (typeof finalUlid === 'string') {
        setUlid(finalUlid);

        if (to.matched.some(r => r.name !== 'ulid' && r.name === 'index')) {
            return navigateTo({
                name: 'ulid',
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


