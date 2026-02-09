import { isValid } from "ulid";

export const useUlid = () => {
    const ulid = useState<string | null>('ulid', () => null);

    const isUlid = (value: string | null = null) => {
        const v: string | null = value ?? ulid.value;

        return typeof v === 'string' && isValid(v);
    };

    const setUlid = (value: string) => {
        if (isUlid(value)) {
            ulid.value = value;
        }
    };

    const saveUlid = (value: string) => {
        if (isUlid(value)) {
            localStorage.setItem('ulid', value);
        }
    };

    const deleteUlid = () => {
        localStorage.removeItem('ulid');
    };

    return {
        isUlid,
        setUlid,
        saveUlid,
        deleteUlid,
        ulid: readonly(ulid),
    };
};
