import type { ULID } from "ulid"

export interface Application {
    id: ULID,
    title: string,
    profile: Profile,
    experiences: Experience[],
    skills: Skill[],
}

export interface Profile {
    id: ULID,
    name: string,
    image: string | null,
    address?: string | null,
    post_code?: string | null,
    location?: string | null,
    birthdate: string | null,
    birthplace?: string | null,
    age?: number | null,
    phone: string | null,
    email: string | null,
    website?: string | null,
}

export interface Experience {
    id: ULID,
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
    id: ULID,
    name: string,
    info: string | null,
    rating: number,
}

export interface Personal {
    id: number,
    image: string,
    title: string | null,
    description: string,
}