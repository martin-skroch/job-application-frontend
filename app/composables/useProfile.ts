import type { Profile } from "~/types";

export const useProfile = () => {
    const config = useAppConfig();

    const profile = useState<Profile>('profile', () => config.profile);
    const github = useState<string>('github', () => config.github);

    const setProfile = (value: Profile) => {
        profile.value = value;
        config.profile = value;
    };

    const getProfile = () => {
        return profile.value;
    };

    const email = (event: PointerEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (typeof profile.value.email !== 'string') {
            return;
        }

        try {
            window.location.href = window.atob(profile.value.email);
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }
        }
    }

    const phone = (event: PointerEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (typeof profile.value.phone !== 'string') {
            return;
        }

        try {
            window.location.href = window.atob(profile.value.phone);
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }
        }
    }

    return {
        setProfile,
        getProfile,
        profile,
        email,
        phone,
        github,
    };
};
