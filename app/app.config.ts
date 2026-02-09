import moment from "moment";
import type { Profile } from "./types"

const profile: Profile = {
    image: '/images/avatar.webp',
    name: 'Martin Skroch',
    email: 'martin@skroch.de',
    birthdate: '1985-09-18',
}

const today = moment();
const birth = moment(profile.birthdate);
profile.age = moment.duration(today.diff(birth)).years();

export default defineAppConfig({
    profile: profile
})