import type { Profile } from "~/types";

export const useProfile = () => {
    const config = useAppConfig();

    const profile = useState<Profile>('profile', () => config.profile);
    const mapLink = useState<string | null>('mapLink', () => null);
    const github = useState<string>('github', () => config.github);

    let fullAddress: string[] = [];

    const setProfile = (value: Profile) => {
        profile.value = value;
        config.profile = value;

        //  if (typeof value.address === 'string' && value.address !== '') {
        //     fullAddress.push(value.address);
        // }

        // if (typeof value.post_code === 'string' && value.post_code !== '') {
        //     fullAddress.push(value.post_code);
        // }

        if (typeof value.location === 'string' && value.post_code !== '') {
            fullAddress.push(value.location);
        }

        if (fullAddress.length > 0) {
            mapLink.value = 'https://www.google.de/maps/search/' + encodeURI(fullAddress.join(','));
        }
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
        mapLink,
        email,
        phone,
        github,
    };
};
