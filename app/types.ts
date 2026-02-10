export interface Application {
    id: string,
    title: string,
    profile: Profile,
    experiences: Experience[],
    educations: Experience[],
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
}

export interface Skill {
    id: string,
    name: string,
    info: string | null,
    rating: number,
}

export interface Impression {
    id: string,
    image: string,
    title?: string,
    description?: string,
}