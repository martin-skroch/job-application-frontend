<script setup>
const props = defineProps({
    experience: Object
})
</script>

<template>
    <div class="grid grid-cols-5 gap-16 group">

        <h3 class="col-span-2 pt-16 group-last:pb-16 flex items-start gap-4 text-3xl">
            <div class="grow flex items-center justify-end gap-4">
                <span v-if="props.experience.exit">{{ props.experience.entry }}</span>
                <span v-else>seit {{ props.experience.entry }}</span>

                <template v-if="props.experience.exit">
                    <span class="border-b border-dotted border-current grow h-0"></span>
                    <span>{{ props.experience.exit }}</span>
                </template>
            </div>
        </h3>

        <div class="col-span-3 pt-16 group-last:pb-16 relative">

            <div class="bg-secondary text-zinc-200 rounded-2xl p-12 light-mouse-tracker grid gap-y-8 relative hidden-mouse-tracker">
                <div v-if="props.experience.company">
                    <h4 class="font-serif text-2xl text-primary">Firma</h4>
                    <div>{{ props.experience.company }}</div>
                </div>

                <div v-if="props.experience.employees">
                    <h4 class="font-serif text-2xl text-primary">Mitarbeiter</h4>
                    <div>{{ props.experience.employees }}</div>
                </div>

                <div v-if="props.experience.location">
                    <h4 class="font-serif text-2xl text-primary">Standort</h4>
                    <div>{{ props.experience.location }}</div>
                </div>

                <div v-if="props.experience.skills" class="grid gap-3">
                    <h4 class="font-serif text-2xl text-primary">Technologien</h4>
                    <div class="flex flex-wrap gap-2">
                        <div v-for="skill in props.experience.skills ?? []" v-bind:key="skill" class="text-xs bg-zinc-800 text-zinc-400 rounded-sm leading-none px-1.5 py-1">
                            {{ skill }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="absolute top-0 bottom-0 -left-8 w-0 border-r border-dashed border-secondary">
                <div class="absolute top-19 -translate-x-1/2 left-0 size-3 bg-secondary rounded-full"></div>
            </div>

        </div>

    </div>
</template>