import moment from "moment";
import type { Profile } from "./types"

const profile: Profile = {
    image: '/images/avatar.webp',
    name: 'Martin Skroch',
    location: 'Mecklenburg-Vorpommern',
    birthdate: '1985-09-18',
    email: 'bWFpbHRvOm1hcnRpbkBza3JvY2guZGU=',
}

const today = moment();
const birth = moment(profile.birthdate);
profile.age = moment.duration(today.diff(birth)).years();

export default defineAppConfig({
    profile: profile,
    github: 'https://github.com/martin-skroch',
})