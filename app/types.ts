export interface Application {
    id: string,
    title: string,
    profile: Profile,
    experiences: Experience[],
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
    position: string | null,
    institution: string | undefined,
    location: string | null,
    type: string | null,
    entry: string,
    exit: string | null,
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