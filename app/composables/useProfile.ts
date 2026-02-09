import type { Profile } from "~/types";

export const useProfile = () => {
    const config = useAppConfig();

    const profile = useState<Profile>('profile', () => config.profile);

    const setProfile = (value: Profile) => {
        profile.value = value;
        config.profile = value;
    };

    const getProfile = () => {
        return profile.value;
    };

    return {
        setProfile,
        getProfile,
        profile,
    };
};
