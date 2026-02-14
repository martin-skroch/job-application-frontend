export interface Application {
    id: string,
    title: string,
    greeting?: string,
    text?: string,
    company?: string,
    contact?: string,
    profile: Profile,
    experiences: Experience[],
    educations: Experience[],
    training: Experience[],
    school: Experience[],
    skills: Skill[],
    impressions: Impression[],
}

export interface Profile {
    id?: string,
    name: string,
    image?: string,
    address?: string,
    post_code?: string,
    location?: string,
    birthdate?: string,
    birthplace?: string,
    age?: number,
    phone?: string,
    email?: string,
    website?: string,
}

export interface Experience {
    id: string,
    entry: string,
    exit: string | null,
    institution: string | undefined,
    position: string | null,
    location: string | null,
    office?: string,
    duration: string,
    description: string | null,
    skills: readonly Skill[],
    files: readonly File[],
}

export interface Skill {
    id: string,
    name: string,
    info?: string,
    rating: number,
}

export interface Impression {
    id: string,
    image: string,
    title?: string,
    description?: string,
}

export interface File {
    id: string,
    title: string,
    url: string,
    mime: string,
    size: string,
}