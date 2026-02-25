export const useApplication = () => {
    const id = useState<string | undefined>('id');

    const isId = (value: string | undefined = undefined) => {
        const v: string | undefined = value ?? id.value;
        return typeof v === 'string' && v.length === 10;
    };

    const setId = (value: string) => {
        if (isId(value)) {
            id.value = value;
        }
    };

    const saveId = (value: string) => {
        if (isId(value)) {
            localStorage.setItem('id', value);
        }
    };

    const deleteId = () => {
        localStorage.removeItem('id');
    };

    return {
        isId,
        setId,
        saveId,
        deleteId,
        id: readonly(id),
    };
};
