import moment from "moment";
import type { Profile } from "~/types";

export const useProfile = () => {
    const config = useAppConfig();

    const profile = useState<Profile>('profile', () => config.profile);
    const birthdate = useState<string | null>('birthdate', () => null);
    const emailLabel = useState<string | null>('emailLabel', () => null);
    const phoneLabel = useState<string | null>('phoneLabel', () => null);
    const mapLink = useState<string | null>('mapLink', () => null);
    const github = useState<string>('github', () => config.github);

    const setProfile = (value: Profile) => {
        profile.value = value;
        config.profile = value;

        const fullAddress: string[] = [];

        // if (typeof value.address === 'string' && value.address !== '') {
        //     fullAddress.push(value.address);
        // }

        // if (typeof value.post_code === 'string' && value.post_code !== '') {
        //     fullAddress.push(value.post_code);
        // }

        if (typeof value.birthdate === 'string' && value.birthdate !== '') {
            birthdate.value = moment(value.birthdate).format('DD.MM.YYYY');
        }

        if (typeof value.location === 'string' && value.location !== '') {
            fullAddress.push(value.location);
        }

        if (fullAddress.length > 0) {
            mapLink.value = 'https://www.google.de/maps/search/' + encodeURI(fullAddress.join(','));
        }

        if (typeof profile.value.email === 'string' && profile.value.email !== '') {
            emailLabel.value = window.atob(profile.value.email).replace('mailto:', '');
        }

        if (typeof profile.value.phone === 'string' && profile.value.phone !== '') {
            phoneLabel.value = window.atob(profile.value.phone).replace('tel:', '').replace('+49', '0');
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
        birthdate,
        mapLink,
        email,
        emailLabel,
        phone,
        phoneLabel,
        github,
    };
};
