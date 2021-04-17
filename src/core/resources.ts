import { writable } from 'svelte/store';

export type ResourceDefinition = {
    name: string;
    hasList: boolean;
    hasCreate: boolean;
    hasEdit: boolean;
    hasShow: boolean;
}

export interface ResourceStore {
    byName: {
        [key: string]: ResourceDefinition;
    }
    byIndex: ResourceDefinition[];
}

const { subscribe, set, update } = writable<ResourceStore>({
    byName: {},
    byIndex: [],
});

export const resourceStore = {
    subscribe,
    add: (definition: ResourceDefinition) =>
        update(store => {
            store.byName[definition.name] = definition;
            const currentResourceIndex = store.byIndex.findIndex(r => r.name === definition.name);

            if (currentResourceIndex) {
                store.byIndex = [
                    ...store.byIndex.slice(0, currentResourceIndex),
                    definition,
                    ...store.byIndex.slice(currentResourceIndex + 1),
                ]
            }

            return store;
        }),
    remove: (definition: ResourceDefinition) =>
        update(store => {
            delete store.byName[definition.name];
            const currentResourceIndex = store.byIndex.findIndex(r => r.name === definition.name);

            if (currentResourceIndex) {
                store.byIndex = [
                    ...store.byIndex.slice(0, currentResourceIndex),
                    ...store.byIndex.slice(currentResourceIndex + 1),
                ]
            }

            return store;
        }),
}
