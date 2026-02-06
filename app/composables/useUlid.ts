import { type ULID, isValid } from "ulid";

export const useUlid = () => {
    const ulid = useState<ULID | null>('ulid', () => null);

    const isUlid = (value: ULID | null = null) => {
        const v: ULID | null = value ?? ulid.value;

        return typeof v === 'string' && isValid(v);
    };

    const setUlid = (value: ULID) => {
        if (isUlid(value)) {
            ulid.value = value;
        }
    };

    const saveUlid = (value: ULID) => {
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
